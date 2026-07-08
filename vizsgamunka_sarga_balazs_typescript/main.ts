import { createAppointment, getHairdressers } from "./api.js";
import { Hairdresser } from "./interfaces.js";
import { getAppointments } from "./api.js"; 

async function startApp() {
    const listContainer = document.querySelector('#hairdresser-list');
    if (listContainer) {
        listContainer.innerHTML = `
            <div class="container center-align" style="margin-top: 50px;">
                <p>Fodrászok betöltése...</p>
                <div class="progress"><div class="indeterminate"></div></div>
            </div>`;
    }

    const hairdressers = await getHairdressers();
    renderHairdresserList(hairdressers);
}

function renderHairdresserList(list: Hairdresser[]) {
    const listContainer = document.querySelector('#hairdresser-list');
    
    if (!listContainer) {
        console.error("Can not find #hairdresser-list container!");
        return;
    }

    //Generate HTML from list
    const HTMLcards = list.map(hairdresser => `
        <div class="col s12 m6 l4">
            <div class="card hairdresser-card hoverable">
                <div class="card-content">
                    <span class="card-title">${hairdresser.name}</span>
                    <p>Profi fodrász, aki segít neked a stílusod megtalálásában.</p>
                </div>
                <div class="card-action">
                    <button class="btn waves-effect waves-light blue darken-3 booking-btn" data-id="${hairdresser.id}">
                        <i class="material-icons left">event</i> Időpontfoglalás
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    //Admin button and HTML cards
    listContainer.innerHTML = `
        <div class="row">
            <div class="col s12">
                <button id="admin-login-btn" class="btn-flat waves-effect right">
                    <i class="material-icons left">settings</i>Admin
                </button>
            </div>
            ${HTMLcards}
        </div>
    `;
    //Eventlistener for Admin button
    document.getElementById('admin-login-btn')?.addEventListener('click', showAdminView);
    
    //Eventlistener forr booking button
    listContainer.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const bookingBtn = target.closest('button[data-id]');

    if (bookingBtn) {
        const hairdresserId = (bookingBtn as HTMLElement).dataset.id;
        if (hairdresserId) {
            showBookingForm(hairdresserId);
        }
    }
});
}

function showBookingForm(hairdresserId: string){
     const listContainer = document.querySelector('#hairdresser-list');
     if(!listContainer){
        return;
     }

     const today = new Date().toISOString().split('T')[0];

    listContainer.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Időpontfoglalás (Fodrász ID: ${hairdresserId})</span>
                    
                    <div class="row">
                        <div class="input-field col s12 m6">
                            <i class="material-icons prefix">account_circle</i>
                            <input type="text" id="customer_name">
                            <label for="customer_name">Neved</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <i class="material-icons prefix">phone</i>
                            <input type="text" id="customer_phone">
                            <label for="customer_phone">Telefonszámod</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12 m6">
                            <i class="material-icons prefix">today</i>
                            <input type="date" id="appointment_date" min="${today}">
                            <label class="active" for="appointment_date">Válassz dátumot</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <select id="service" class="browser-default">
                                <option value="" disabled selected>Válassz szolgáltatást</option>
                                <option value="Hajvágás">Hajvágás</option>
                                <option value="Festés">Festés</option>
                            </select>
                        </div>
                    </div>

                    <h6>Szabad időpontok:</h6>
                    <div id="time-slots" style="margin-bottom: 20px;"></div>

                    <div class="card-action">
                        <button id="save-btn" class="btn waves-effect waves-light green darken-2">
                            <i class="material-icons left">check</i>Lefoglalom
                        </button>
                        <button id="back-btn" class="btn-flat waves-effect">Vissza</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
            //Input field handling

            const saveBtn = document.getElementById("save-btn");
            const nameElement = document.getElementById("customer_name") as HTMLInputElement;
            const phoneElement = document.getElementById("customer_phone") as HTMLInputElement;
            const dateElement = document.getElementById("appointment_date") as HTMLInputElement;
            const serviceElement = document.getElementById("service") as HTMLInputElement;
            const timeSlotsContainer = document.getElementById("time-slots");

            let selectedTime = "";

dateElement.addEventListener('change', async () => {
    const chosenDate = dateElement.value;
    if (!chosenDate || !timeSlotsContainer) return;

    timeSlotsContainer.innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';

    try {
        const allAppointments = await getAppointments("balazs2026");
        
        // Checking the Array
        if (!Array.isArray(allAppointments)) {
            console.error("The API did not get back an Array!", allAppointments);
            return;
        }

        const bookedTimes = allAppointments
            .filter(app => {
                // Checking for date
                if (!app.appointment_date) return false;

                const isSameHairdresser = Number(app.hairdresser_id) === Number(hairdresserId);
                const isSameDay = app.appointment_date.startsWith(chosenDate);
                return isSameHairdresser && isSameDay;
            })
            .map(app => {
                return app.appointment_date.substring(11, 16);
            });

        /* console.log("Foglalt időpontok ezen a napon:", bookedTimes); */

        let slots: string[] = [];
        for (let h = 8; h < 18; h++) {
            const hour = h.toString().padStart(2, "0");
            slots.push(`${hour}:00`, `${hour}:30`);
        }

        timeSlotsContainer.innerHTML = slots.map(s => {
            const isBooked = bookedTimes.includes(s);
            return `
            <button type="button" 
                    class="btn-small waves-effect waves-light white blue-text text-darken-3 slot-btn ${isBooked ? 'disabled grey lighten-2' : ''}" 
                    data-time="${s}" 
                    ${isBooked ? 'disabled' : ''}
                    style="border: 1px solid #1565c0; margin: 5px;">
                ${s}
            </button>`;
        }).join('');

        // Eventlisteners for buttons
        timeSlotsContainer.querySelectorAll('.slot-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                
                const btnElement = e.target as HTMLButtonElement;
                selectedTime = btnElement.dataset.time || "";
                
                /* console.log("Választott időpont:", selectedTime); */
                
                timeSlotsContainer.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
                btnElement.classList.add('selected');
            });
        });

    } catch (err) {
        console.error("Error when uploading dates:", err);
    }
});
    


            //Handling submit event
            saveBtn?.addEventListener('click', async () =>{

                if (!selectedTime) {
                alert("Kérlek válassz egy időpontot is!");
                return;
        }

                //Data pull from input elements
                const name = nameElement.value.trim();
                const phone = phoneElement.value.trim();
                const date = dateElement.value.trim();
                const service = serviceElement.value.trim();

                //Data validation
                if (name == ""){
                    alert("Az azonosító mezőt kötelező kitölteni.");
                    return;
                }

                if (phone == ""){
                    alert("A telefonszám mezőt kötelező kitölteni.");
                    return;
                }

                if (date == ""){
                    alert("A dátum mezőt kötelező kitölteni.");
                    return;
                }

                if (service == ""){
                    alert("A szolgáltatás mezőt kötelező kitölteni.");
                    return;
                }

                //Summing up data
                const appointmentData = {
                hairdresser_id: parseInt(hairdresserId),
                customer_name: name,
                customer_phone: phone,
                appointment_date: `${date} ${selectedTime}:00`,
                service: service,
                api_key: "balazs2026"
                };

                console.log("DATA ready for sending:", JSON.stringify(appointmentData, null, 2));


                const success = await createAppointment(appointmentData);
                    if (success) {
                        
                    showSuccessPage();
                    } else {
                        alert("Hiba történt a mentés során.");
                    }
            });
            document.getElementById("back-btn")?.addEventListener('click', () => {
            startApp();
            });
                        }


async function showAdminView() {
    const listContainer = document.querySelector('#hairdresser-list');
    if (!listContainer) return;

    //Progress bar
    listContainer.innerHTML = `
        <div class="container">
            <h4>Admin adatok lekérése...</h4>
            <div class="progress"><div class="indeterminate"></div></div>
        </div>`;

    //Getting data
        const [appointments, hairdressers] = await Promise.all([
        getAppointments("balazs2026"),
        getHairdressers()
    ]);

    //Table management
    appointments.sort((a, b) => a.appointment_date.localeCompare(b.appointment_date));

let tableHTML = `
    <div class="container">
        <h3>Admin felület</h3>
        <button id="back-to-app" class="btn waves-effect waves-light grey">Vissza</button>
        <table class="striped highlight responsive-table card" style="margin-top: 20px;">
            <thead>
                <tr>
                    <th>Név</th>
                    <th>Telefon</th>
                    <th>Dátum</th>
                    <th>Szolgáltatás</th>
                    <th>Fodrász</th>
                </tr>
            </thead>
            <tbody>
                    ${appointments.map(app => {
                        const hairdresser = hairdressers.find(h => h.id == app.hairdresser_id);

                        const hairdresserName = hairdresser ? hairdresser.name : `Ismeretlen (ID: ${app.hairdresser_id})`;
                        return`
                        <tr>
                            <td>${app.customer_name}</td>
                            <td>${app.customer_phone}</td>
                            <td>${app.appointment_date}</td>
                            <td>${app.service}</td>
                            <td>${hairdresserName}</td>
                        </tr>
                    `;
                    }).join('')}
            </tbody>
        </table>
    </div>
`;

    listContainer.innerHTML = tableHTML;

    //Handling return button
    document.getElementById('back-to-app')?.addEventListener('click', startApp);
}

function showSuccessPage() {
    const listContainer = document.querySelector('#hairdresser-list');
    if (!listContainer) return;

    listContainer.innerHTML = `
        <div class="success-view" style="text-align: center; padding: 50px;">
            <h2 style="color: green;">✔ Sikeres foglalás!</h2>
            <p>Várunk szeretettel a választott időpontban.</p>
            <button id="back-to-home">Vissza a fodrászokhoz</button>
        </div>
    `;

    document.getElementById('back-to-home')?.addEventListener('click', startApp);
}

startApp();

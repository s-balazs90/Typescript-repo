import { createAppointment, getHairdressers } from "./api.js";
import { Hairdresser } from "./interfaces.js";
import { getAppointments } from "./api.js";
declare const M: any; 

async function startApp() {
    const listContainer = document.querySelector('#hairdresser-list') as HTMLElement;
    if (listContainer) {
        listContainer.style.display = 'flex';
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
            <div class="card hairdresser-card hoverable center-align">
                <div class="card-image grey lighten-4" style="padding: 20px 0;">
                    <img src="${getProfilePic(hairdresser.id)}" 
                         class="circle responsive-img" 
                         style="width: 100px; height: 100px; margin: 0 auto; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                </div>
                <div class="card-content">
                    <span class="card-title" style="font-size: 1.2rem; font-weight: 500;">${hairdresser.name}</span>
                    <p class="blue-text text-darken-2" style="font-size: 0.8rem; margin-bottom: 10px;">MASTER STYLIST</p>
                    
                <div class="services-container">
                    ${(hairdresser.services && hairdresser.services.length > 0) 
                        ? hairdresser.services.map(s => `<span class="chip">${s}</span>`).join('') 
                        : '<span class="chip">Általános fodrászat</span>'}
                </div>
                </div>
                <div class="card-action" style="border-top: none;">
                    <button class="btn waves-effect waves-light blue darken-3 booking-btn" 
                            data-id="${hairdresser.id}" 
                            data-name="${hairdresser.name}" 
                            style="width: 100%; border-radius: 20px;">
                        <i class="material-icons">event</i>
                        <span>Időpontfoglalás</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    //Admin button and HTML cards
    listContainer.className = "row";
    listContainer.innerHTML = HTMLcards;
    listContainer.innerHTML = `
        <div class="row">
            <div class="col s12">

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
    const btn = bookingBtn as HTMLElement;
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    if (id && name) {
        showBookingForm(id, name);
    }
}
});
}

function showBookingForm(hairdresserId: string, hairdresserName: string){
     const listContainer = document.querySelector('#hairdresser-list') as HTMLElement;
     if(!listContainer){
        return;
     }

     listContainer.style.display = 'block'
     const today = new Date().toISOString().split('T')[0];

    listContainer.innerHTML = `
    <div class="booking-form container">
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2">
                <div class="card">
                    <div class="card-content">
                        <h4 class="center-align" style="margin-bottom: 30px;">Foglalás: ${hairdresserName}</h4>
                        <span class="card-title grey-text text-darken-1" style="font-size: 1rem;">Időpontfoglalás (Azonosító: ${hairdresserId})</span>
                        
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <i class="material-icons prefix">account_circle</i>
                                <input type="text" id="customer_name">
                                <label for="customer_name" class="active">Neved</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <i class="material-icons prefix">phone</i>
                                <input type="text" id="customer_phone">
                                <label for="customer_phone" class="active">Telefonszámod</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12 m6">
                                <i class="material-icons prefix">today</i>
                                <input type="date" id="appointment_date" min="${today}">
                                <label class="active" for="appointment_date">Válassz dátumot</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <label class="active">Szolgáltatás</label>
                                <select id="service" class="browser-default" style="margin-top: 10px;">
                                    <option value="" disabled selected>Válassz szolgáltatást</option>
                                    <option value="Hajvágás">Hajvágás</option>
                                    <option value="Festés">Festés</option>
                                </select>
                            </div>
                        </div>

                        <h6 style="margin-top: 30px;">Szabad időpontok:</h6>
                        <div id="time-slots" style="margin-bottom: 20px; min-height: 50px;"></div>

                        <div class="card-action right-align">
                            <button id="back-btn" class="btn-flat waves-effect" style="margin-right: 10px;">Vissza</button>
                            <button id="save-btn" class="btn waves-effect waves-light green darken-2">
                                <i class="material-icons left">check</i>Lefoglalom
                            </button>
                        </div>
                    </div>
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
            setTimeout(() => {
                if (typeof M !== 'undefined') {
                    M.updateTextFields();
                }
            }, 100);
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

function getProfilePic(id: number): string {
    // Adding pictures by API ID
    const photoMap: { [key: number]: string } = {
        6: "https://randomuser.me/api/portraits/women/44.jpg", // Kiss Anna
        7: "https://randomuser.me/api/portraits/men/32.jpg",   // Nagy Lajos
        8: "https://randomuser.me/api/portraits/men/46.jpg",   // Szabó Tamás
        9: "https://randomuser.me/api/portraits/women/68.jpg", // Molnár Judit
        10: "https://randomuser.me/api/portraits/women/17.jpg",// Tóth Éva
        11: "https://randomuser.me/api/portraits/men/67.jpg",   // Farkas Péter
        12: "https://randomuser.me/api/portraits/women/1.jpg",// Varga Zsófia
        13: "https://randomuser.me/api/portraits/men/62.jpg"   // Horváth Dániel
    };

    // If the ID is not in the list, get basic avatar
    return photoMap[id] || `https://i.pravatar.cc/150?u=${id}`;
}

startApp();

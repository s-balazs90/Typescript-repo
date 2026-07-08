import { Hairdresser, Appointment } from './interfaces.js';

const BASE_URL = "http://salonsapi.prooktatas.hu/api";

// Getting hairdressers
export async function getHairdressers(): Promise<Hairdresser[]> {
    try {
        const response = await fetch(`${BASE_URL}/hairdressers`);
        
        if (!response.ok) {
            throw new Error(`Failed to GET hairdressers: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Create appointment (POST)
export async function createAppointment(appointmentData: Appointment): Promise<boolean> {
    try {
        const urlWithKey = `${BASE_URL}/appointments?api_key=${appointmentData.api_key}`;
        const response = await fetch(urlWithKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Server error:", errorData);
            return false;
        }

        const data = await response.json();
        console.log(data);
        return true;
    } catch (err) {
        console.error("Network error:", err);
        return false;
    }
}

// Admin page, get appointment by api key
export async function getAppointments(apiKey: string): Promise<Appointment[]> {
    try {
        
        const urlWithKey = `${BASE_URL}/appointments/${apiKey}?api_key=${apiKey}`;
        const response = await fetch(urlWithKey);


        if (response.status === 401 || response.status === 404) {
            console.warn("No booking yet, for this key, or wrong key.");
            return [];
        }


        if (!response.ok) {
            console.log(await response.text());
            throw new Error(response.status.toString());
        }

        const data = await response.json() as Appointment[];

            return data.map(app => ({
                ...app,
                id: Number(app.id),
                hairdresser_id: Number(app.hairdresser_id)
            }));
    } catch (err) {
        console.error("GET Error:", err);
        return [];
    }
}
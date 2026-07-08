export interface Hairdresser {
    id: number;
    name: string;
    description?: string;
}

export interface Appointment {
    id?: number;
    hairdresser_id: number;
    customer_name: string;
    customer_phone: string;
    appointment_date: string;
    service: string;
    api_key: string;
}

export interface TimeSlot {
    time: string;
    isAvailable: boolean;
}
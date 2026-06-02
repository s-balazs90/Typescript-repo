import { Event } from "../src/classes/event";
import { Guest } from "../src/classes/guest";

describe("Event Class test", () => {
    
    test("addGuest method must add a Guest to the Event", () => {

        const guest1 = new Guest("G#1", "John Doe", "jd@email.com");
        const bday = new Event("E#1", "John's birthday", "Restaurant", 20260603, "Family gathering");

        bday.addGuest(guest1);

        expect(bday.guestList.length).toBe(1);
    });

    test("removeGuest method must remove a Guest from the Event", () => {
        const guest1 = new Guest("G#1", "John Doe", "jd@email.com");
        const bday = new Event("E#1", "John's birthday", "Restaurant", 20260603, "Family gathering");
        
        bday.addGuest(guest1);
        bday.removeGuest("G01");

        expect(bday.guestList.length).toBe(1);
    });
});
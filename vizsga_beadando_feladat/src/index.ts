import { Event } from "./classes/event";
import { Guest } from "./classes/guest";
import { EventService } from "./services/event-service";

const service = new EventService();

const guest1 = new Guest("G#1", "John Doe", "jd@email.com");
const guest2 = new Guest("G#2", "Jane Doe", "janed@email.com");
const guest3 = new Guest("G#3", "Mr Anderson", "neo@email.com");

const bday = new Event("E#1", "John's birthday", "Restaurant", 20260603, "Family gathering");
const concert = new Event("E#2", "Linkin Park concert", "Florence", 20260626, "music");

bday.addGuest(guest1);
concert.addGuest(guest2);

service.addEvent({ event: bday });

//updateEvent test
service.updateEvent("E#1", { place: "home", time: 20260606 });
service.listEvent();

//delete test
service.deleteEvent("E#1");
service.listEvent();
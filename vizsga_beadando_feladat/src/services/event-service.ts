import { Event } from "../classes/event";
import { Guest } from "../classes/guest";
import { LogAddition } from "../decorators/logAddition";

export class EventService {
  private _event: Map<string, Event> = new Map();

  @LogAddition
  addEvent({ event }: { event: Event; }): void {
    this._event.set(event.ID, event);
    console.log(`Item added: ${event.ID}`);
  }

  deleteEvent(id: string): void {
    this._event.delete(id);
    console.log(`Item deleted: ${id}`);
  }

  updateEvent(id: string, updatedDate: Partial<Event>){
    const event = this._event.get(id);
    if(!event){
      console.error(`Event with ID:${id} not found.`);
      return;
    }

    if(updatedDate.name !== undefined){
      event.name = updatedDate.name;
      console.log(`Event ${id} updated.`);
    }
    
    if(updatedDate.place !== undefined){
      event.place = updatedDate.place;
      console.log(`Event ${id} updated.`);
    }

    if(updatedDate.time !== undefined){
      event.time = updatedDate.time;
      console.log(`Event ${id} updated.`);
    }

    if(updatedDate.eventCategory !== undefined){
      event.eventCategory = updatedDate.eventCategory;
      console.log(`Event ${id} updated.`);
    }

    console.log(`Event ${id} successfully updated.`);
  }

  getEventByCategory(category: string): Event[] {
    return Array.from(this._event.values()).filter(event => event.eventCategory === category);
}

  listEvent(): void {
    this._event.forEach((event) => {
      console.log(`Event name: ${event.name}, Event place: ${event.place}, Event time: ${event.time}, Event guestlist: ${event.guestList.map(guests => guests.name).join(", ")}`);
    });
  }
}

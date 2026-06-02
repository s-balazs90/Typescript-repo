import { Guest } from "./guest";

export class Event {
    private _ID: string;
    protected _name: string;
    protected _place: string;
    protected _time: number;
    protected _guestList: Guest[];
    protected _eventCategory: string;

    constructor(ID: string, name: string, place: string, time: number, eventCategory: string) {
        this._ID = ID;
        this._name = name;
        this._place = place;
        this._time = time;
        this._guestList = [];
        this._eventCategory = eventCategory;
    }

    get ID(): string {
        return this._ID;
    }

    set ID(newID: string) {
        if (newID && newID.length > 0) {
            this._ID = newID;
        } else {
            console.error("Invalid ID");
        }
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        if (newName && newName.length > 0) {
            this._name = newName;
        } else {
            console.error("Invalid name");
        }
    }

    get place(): string {
        return this._place;
    }

    set place(newPlace: string) {
        if (newPlace.length > 0) {
            this._place = newPlace;
        } else {
            console.error("Invalid place");
        }
    }

    get time(): number {
        return this._time;
    }

    set time(newTime: number) {
        if (newTime && newTime > 0) {
            this._time = newTime;
        } else {
            console.error("Invalid time");
        }
    }

    get guestList(): Array<Guest> {
        return this._guestList;
    }

    set guestList(newguestList: Array<Guest>) {
        if (newguestList && newguestList.length > 0) {
            this._guestList = newguestList;
        } else { 
            console.error("Invalid guestList");
        }
    }

    get eventCategory(): string {
        return this._eventCategory;
    }

    set eventCategory(neweventCategory: string) {
        if (neweventCategory && neweventCategory.length > 0) {
            this._eventCategory = neweventCategory;
        } else {
            console.error("Invalid eventCategory");
        }
    }

    addGuest(guest: Guest){
        return this._guestList.push(guest);
    }

    removeGuest(ID: string){
        this._guestList = this._guestList.filter(guest => guest.ID !== ID);
    }
 
    findGuest(id: string){
        return this._guestList.find(guest => guest.ID === id);
    }

    listAllGuest(){
        return this._guestList;
    }
}
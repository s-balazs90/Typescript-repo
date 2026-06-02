import { Event } from "./event";

export class Guest{
    private _id: string;
    private _name: string;
    private _email: string;

    constructor(ID: string, name: string, email: string) {
        this._id = ID;
        this._name = name;
        this._email = email;
    }

    get ID() {
        return this._id;
    }

    set ID(newID: string) {
        if (newID && newID.length > 0) {
            this._id = newID;
        } else { 
            console.error("Invalid ID");
        }
    }

    get name() {
        return this._name;
    }

    set name(newName: string) {
        if (newName && newName.length > 0) {
            this._name = newName;
        } else { 
            console.error("Invalid name");
        }
    }

    get email() {
        return this._email;
    }

    set email(newEmail: string) {
        if (newEmail && newEmail.length > 0) {
            this._email = newEmail;
        } else { 
            console.error("Invalid email");
        }
    }

}
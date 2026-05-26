import { Product } from "./product";

export class User {
    private _userID: string;
    private _name: string;
    protected _price: number;
    protected _description: string;

    constructor(userID: string, name: string, price: number, description:string) {
        this._userID = userID;
        this._name = name;
        this._price = price;
        this._description = description;
    }

    get userID(): string {
        return this._userID;
    }

    set userID(newuserID: string) {
        if (newuserID && newuserID.length > 0) {
            this._userID = newuserID;
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

    get price(): number {
        return this._price;
    }

    set price(newPrice: number) {
        if (newPrice && newPrice > 0) {
            this._price = newPrice;
        } else {
            console.error("Invalid price");
        }
    }

    get description(): string {
        return this._description;
    }

    set description(newDescription: string) {
        if (newDescription.length > 0) {
            this._description = newDescription;
        } else {
            console.error("Invalid description");
        }
    }
}
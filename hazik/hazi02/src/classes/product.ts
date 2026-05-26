export class Product {
    private _ID: string;
    private _name: string;
    protected _price: number;
    protected _description: string;

    constructor(ID: string, name: string, price: number, description:string) {
        this._ID = ID;
        this._name = name;
        this._price = price;
        this._description = description;
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
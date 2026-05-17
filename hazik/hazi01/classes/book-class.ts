export class Book {
    protected _ID: string;
    protected _title: string;
    protected _author: string;
    private _price: number;

    constructor(ID: string, title: string, author: string, price: number) {
        this._ID = ID;
        this._title = title;
        this._author = author;
        this._price = price;
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

    get title(): string {
        return this._title;
    }

    set title(newTitle: string) {
        if (newTitle && newTitle.length > 0) {
            this._title = newTitle;
        } else {
            console.error("Invalid title");
        }
    }

    get author(): string {
        return this._author;
    }

    set author(newAuthor: string) {
        if (newAuthor.length > 0) {
            this._author = newAuthor;
        } else {
            console.error("Invalid author");
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
}
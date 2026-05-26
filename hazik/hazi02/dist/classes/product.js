"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(ID, name, price, description) {
        this._ID = ID;
        this._name = name;
        this._price = price;
        this._description = description;
    }
    get ID() {
        return this._ID;
    }
    set ID(newID) {
        if (newID && newID.length > 0) {
            this._ID = newID;
        }
        else {
            console.error("Invalid ID");
        }
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        if (newName && newName.length > 0) {
            this._name = newName;
        }
        else {
            console.error("Invalid name");
        }
    }
    get price() {
        return this._price;
    }
    set price(newPrice) {
        if (newPrice && newPrice > 0) {
            this._price = newPrice;
        }
        else {
            console.error("Invalid price");
        }
    }
    get description() {
        return this._description;
    }
    set description(newDescription) {
        if (newDescription.length > 0) {
            this._description = newDescription;
        }
        else {
            console.error("Invalid description");
        }
    }
}
exports.Product = Product;

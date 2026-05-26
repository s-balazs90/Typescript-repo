"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
class Inventory {
    constructor(product) {
        this._product = [];
    }
    get product() {
        return this._product;
    }
    set product(newProduct) {
        if (newProduct && newProduct.length > 0) {
            this._product = newProduct;
        }
        else {
            console.error("Invalid product");
        }
    }
    addProduct(product) {
        return this._product.push(product);
    }
    removeProduct(ID) {
        this.product = this._product.filter(product => product.ID !== ID);
    }
    findProductById(ID) {
        return this._product.find(product => product.ID === ID);
    }
    findProductByName(name) {
        return this._product.find(product => product.name === name);
    }
    listAllProduct() {
        return this.product;
    }
}
exports.Inventory = Inventory;

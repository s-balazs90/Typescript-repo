"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var StatusOfOrder;
(function (StatusOfOrder) {
    StatusOfOrder["New"] = "New order";
    StatusOfOrder["Processing"] = "Under process";
    StatusOfOrder["Delivered"] = "Delivered";
})(StatusOfOrder || (StatusOfOrder = {}));
class Order {
    constructor(orderID, product) {
        this._orderID = orderID;
        this._product = product;
    }
    get orderID() {
        return this._orderID;
    }
    set orderID(neworderID) {
        if (neworderID && neworderID.length > 0) {
            this._orderID = neworderID;
        }
        else {
            console.error("Invalid orderID");
        }
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
}
exports.Order = Order;

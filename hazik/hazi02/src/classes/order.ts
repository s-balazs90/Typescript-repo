import { Product } from "./product";
import { User } from "./user";

enum StatusOfOrder {
    New = "New order",
    Processing = "Under process",
    Delivered = "Delivered",
}

export class Order {
    private _orderID: string;
    private _product: string;


    constructor(orderID: string, product: string) {
        this._orderID = orderID;
        this._product = product;
    }

    get orderID(): string {
        return this._orderID;
    }

    set orderID(neworderID: string) {
        if (neworderID && neworderID.length > 0) {
            this._orderID = neworderID;
        } else {
            console.error("Invalid orderID");
        }
    }

    get product(): string {
        return this._product;
    }

    set product(newProduct: string) {
        if (newProduct && newProduct.length > 0) {
            this._product = newProduct;
        } else {
            console.error("Invalid product");
        }
    }
}
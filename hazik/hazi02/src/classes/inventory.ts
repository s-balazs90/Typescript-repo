import { Product } from "./product";

export class Inventory{
    private _product: Product[];

    constructor(product:Product) {
        this._product = [];
    }

    get product(): Array<Product> {
        return this._product;
    }

    set product(newProduct: Array<Product>) {
        if (newProduct && newProduct.length > 0) {
            this._product = newProduct;
        } else {
            console.error("Invalid product");
        }
    }

    addProduct(product: Product){
        return this._product.push(product);
    }

    removeProduct(ID: string){
        this.product = this._product.filter(product => product.ID !== ID);
    }
 
    findProductById(ID: string){
        return this._product.find(product => product.ID === ID);
    }

    findProductByName(name: string){
        return this._product.find(product => product.name === name);
    }

    listAllProduct(){
        return this.product;
    }
}
import { Book } from "./book-class";
import { ILibrary } from "./ILibrary";

export class Library implements ILibrary{
    private _books: Book[];

    constructor() {
        this.books = [];
    }

    get books(): Array<Book> {
        return this._books;
    }

    set books(newBook: Array<Book>) {
        if (newBook && newBook.length > 0) {
            this._books = newBook;
        } else { 
            console.error("Invalid ID");
        }
    }

    addBook(books: Book){
        return this._books.push(books);
    }

    removeBook(id: string){
        this.books = this._books.filter(id);
    }
 
    findBookById(id: string){
        return this._books.find(book => book.ID === id);
    }

    listAllBooks(){
        return this.books;
    }

}
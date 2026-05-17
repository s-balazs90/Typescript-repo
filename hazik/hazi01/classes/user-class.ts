import { Library } from "./library-class";

export class User {
    private _userID: string;
    private _userName: string;
    private _email: string;
    
    constructor(userID: string, userName: string, email: string) {
        this._userID = userID;
        this._userName = userName;
        this._email = email;
    }

    borrowBook(library: Library, bookId: string){
        if(bookId){
            console.log("User already borrowd this book");
        } else{
            console.error("Invalid bookId");
            
        }
        return library.findBookById(bookId);
    }
}
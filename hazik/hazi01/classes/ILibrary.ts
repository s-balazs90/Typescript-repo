import { Book } from "./book-class";
import { Library } from "./library-class";

export interface ILibrary {
  addBook(book: Book): void;
  removeBook(id: string): void;
  findBookById(id: string): Book | undefined;
  listAllBooks(): Book[];

}
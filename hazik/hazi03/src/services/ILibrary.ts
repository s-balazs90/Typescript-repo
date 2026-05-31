import { Book } from "../models/book.js";
import { Library } from "../services/library.js";

export interface ILibrary {
  addBook(book: Book): void;
  removeBook(id: string): void;
  findBookById(id: string): Book | undefined;
  listAllBooks(): Book[];

}
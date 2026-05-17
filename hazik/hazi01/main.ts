import { Book } from "./classes/book-class";
import { Library } from "./classes/library-class";
import { User } from "./classes/user-class";

const book1 = new Book("1", "The Lord Of The Rings", "J.R.R. Tolkien", 4990);
const library1 = new Library();
library1.addBook(book1);
const user1 = new User("1", "Frodo Baggins", "bagend@shire.nz");
user1.borrowBook(library1, "1");
import { Book } from "../src/models/book.js";
import { Library } from "../src/services/library.js";
import { User } from "../src/models/user.js";

const book1 = new Book("1", "The Lord Of The Rings", "J.R.R. Tolkien", 4990);
const library1 = new Library();
library1.addBook(book1);
const user1 = new User("1", "Frodo Baggins", "bagend@shire.nz");
user1.borrowBook(library1, "1");
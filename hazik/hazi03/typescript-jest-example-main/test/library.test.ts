import { Library } from "../src/library";
import { Book } from "../src/book";

describe("Library Class test", () => {
    
    test("addBook metódusnak hozzá kell adnia egy könyvet a listához", () => {

        const library = new Library();
        const book = new Book("1", "Test Book", "Test Author", 1000);

        library.addBook(book);

        expect(library.listAllBooks().length).toBe(1);
        expect(library.listAllBooks()[0].title).toBe("Test Book");
    });
});
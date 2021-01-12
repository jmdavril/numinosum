import {BOOK_ADDED, BOOK_EDITED, BOOKS_INIT, BooksActionTypes} from "./types";
import {Book} from "../data/books";

export function initBooks(books: Book[]): BooksActionTypes {
    return {
        type: BOOKS_INIT,
        books: books
    }
}

export function addBook(newBookTitle: string, newBookAuthors: string): BooksActionTypes {
    return {
        type: BOOK_ADDED,
        newBookTitle: newBookTitle,
        newBookAuthors: newBookAuthors
    }
}

export function editBook(newBook: Book): BooksActionTypes {
    return {
        type: BOOK_EDITED,
        newBook: newBook
    }
}

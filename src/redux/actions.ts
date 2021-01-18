import {BOOK_ADDED, BOOK_EDITED, BOOKS_INIT, BooksActionTypes, EXCERPT_ADDED} from "./types";
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

export function editBook(bookId: number, bookTitle: string, bookAuthors: string): BooksActionTypes {
    return {
        type: BOOK_EDITED,
        bookId: bookId,
        newBookTitle: bookTitle,
        newBookAuthors: bookAuthors
    }
}

export function addExcerpt(bookId: number, pageNumber: number, excerptText: string ): BooksActionTypes {
    return {
        type: EXCERPT_ADDED,
        bookId: bookId,
        pageNumber: pageNumber,
        excerptText: excerptText
    }
}

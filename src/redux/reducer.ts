import {Book} from "../data/books";
import {BOOK_ADDED, BOOK_EDITED, BOOKS_INIT, BooksActionTypes, EXCERPT_ADDED} from "./types";

export interface BooksState {
    books: Book[]
}

const initialState = (): BooksState => {
    const storedBooks = localStorage.getItem("books");

    if (storedBooks === null) {
        return {books: []};
    } else {
        return {books: JSON.parse(storedBooks)};
    }
}

export function booksReducer(
    state = initialState(),
    action: BooksActionTypes
): BooksState {
    let books = [];

    switch (action.type) {
        case BOOKS_INIT:
            return {
                books: action.books
            }
        case BOOK_ADDED:
            const maxId: number = (state.books.length > 0) ? state.books.reduce(function (prev: Book, current: Book) {
                return (prev.id > current.id) ? prev : current
            }).id : 0;

            const newBook = {
                id: maxId + 1,
                title: action.newBookTitle,
                authors: action.newBookAuthors,
                excerpts: []
            } as Book;

            books = [newBook].concat(state.books);

            localStorage.setItem("books", JSON.stringify(books));

            return {
                books: books
            }
        case BOOK_EDITED:
            books = state.books.map(b => b.id === action.bookId ? {
                id: action.bookId,
                title: action.newBookTitle,
                authors: action.newBookAuthors,
                excerpts: b.excerpts
            } : b)

            localStorage.setItem("books", JSON.stringify(books));

            return {
                books: books
            }
        case EXCERPT_ADDED:
            books = state.books.map(b => b.id === action.bookId ? {
                ...b,
                excerpts: [{pageNumber: action.pageNumber, text: action.excerptText}].concat(b.excerpts)
            } : b)

            localStorage.setItem("books", JSON.stringify(books));

            return {
                books: books
            }
        default:
            return state
    }
}

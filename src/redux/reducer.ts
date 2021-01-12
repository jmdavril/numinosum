import {Book} from "../data/books";
import {BOOK_ADDED, BOOK_EDITED, BOOKS_INIT, BooksActionTypes} from "./types";

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
    switch (action.type) {
        case BOOKS_INIT:
            return {
                books: action.books
            }
        case BOOK_ADDED:
            const maxId: number = (state.books.length > 0) ? state.books.reduce(function(prev: Book, current: Book) {
                return (prev.id > current.id) ? prev : current
            }).id : 0;

            const newBook = {id: maxId + 1, title: action.newBookTitle, authors: action.newBookAuthors} as Book;

            const books = [newBook].concat(state.books);
            localStorage.setItem("books", JSON.stringify(books));

            return {
                books: books
            }
        case BOOK_EDITED:
            return {
                books: state.books.map(b => b.id === action.newBook.id ? action.newBook : b)
            }
        default:
            return state
    }
}

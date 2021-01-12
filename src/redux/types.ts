import {Book} from "../data/books";

export const BOOKS_INIT = 'BOOKS_INIT'
export const BOOK_ADDED = 'BOOK_ADDED'
export const BOOK_EDITED = 'BOOK_EDITED'

interface InitBooksAction {
    type: typeof BOOKS_INIT
    books: Book[]
}

interface AddBookAction {
    type: typeof BOOK_ADDED
    newBookTitle: string
    newBookAuthors: string
}

interface EditBookAction {
    type: typeof BOOK_EDITED
    newBook: Book
}

export type BooksActionTypes = InitBooksAction | AddBookAction | EditBookAction

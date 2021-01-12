import {BooksState} from "./reducer";
import {Book} from "../data/books";

export const getBook = (state: BooksState, id: number): Book | undefined => state.books.find(b => b.id === id);

export const getLastId = (state: BooksState): number => {
    if (state.books.length > 0) {
        return state.books.reduce(function(prev: Book, current: Book) {
            return (prev.id > current.id) ? prev : current
        }).id;
    } else {
        return 0;
    }
}

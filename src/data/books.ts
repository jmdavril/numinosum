export interface Book {
  id: number;
  title: string;
  authors: string;
}

const books: Book[] = [
  {
    id: 1,
    title: 'Book title 1',
    authors: 'Authors 1'
  },
  {
    id: 2,
    title: 'Book title 2',
    authors: 'Authors 2'
  }
];

export const getBooks = () => books;

export const getBook = (id: number) => books.find(b => b.id === id);

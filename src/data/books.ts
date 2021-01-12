export interface Book {
  title: string;
  authors: string;
}

const books: Book[] = [
  {
    title: 'Book title 1',
    authors: 'Authors 1'
  },
  {
    title: 'Book title 2',
    authors: 'Authors 2'
  }
];

export const getBooks = () => books;

export const getBook = (title: string) => books.find(b => b.title === title);

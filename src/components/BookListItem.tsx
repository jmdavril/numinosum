import React from 'react';
import {
    IonItem,
    IonLabel, IonNote,
} from '@ionic/react';
import {Book} from '../data/books';
import './BookListItem.css';
import {useHistory} from "react-router";

interface BookListItemProps {
    book: Book;
}

const BookListItem: React.FC<BookListItemProps> = ({book}) => {
    const history = useHistory();
    return (
        <IonItem detail={false} onClick={() => history.push({
            pathname: `books/${book.id}`,
            state: {book: book}
        })}>
            <IonLabel className="ion-text-wrap">
                <h2>
                    {book.title}
                </h2>
                <h3><IonNote>{book.authors}</IonNote></h3>
            </IonLabel>
        </IonItem>
    );
};

export default BookListItem;

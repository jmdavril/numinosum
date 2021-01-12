import React, { useState } from 'react';
import {Book, getBook} from '../data/books';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './Book.css';

interface ViewBookProps extends RouteComponentProps<{ id: string; }> { }

const Book: React.FC<ViewBookProps> = ({ match }) => {

  const [book, setBook] = useState<Book>();

  useIonViewWillEnter(() => {
    const book = getBook(parseInt(match.params.id, 10));
    setBook(book);
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Books" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {book ? (
          <>
            <IonItem class="ion-padding">
              <IonLabel className="ion-text-wrap">
                <h2>
                  {book.title}
                </h2>
                <h3><IonNote>{book.authors}</IonNote></h3>
              </IonLabel>
            </IonItem>
          </>
        ) : <div>Book not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default Book;

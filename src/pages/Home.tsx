import BookListItem from '../components/BookListItem';
import React from 'react';
import {
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import {Book} from "../data/books";
import { add } from 'ionicons/icons';
import {BooksState} from "../redux/reducer";
import {connect} from "react-redux";

interface BooksProps {
  books: Book[];
}

const Home: React.FC<BooksProps> = ({books}: BooksProps) => {

  // useIonViewWillEnter(() => {
  //   const books = getBooks();
  //   setBooks(books);
  // TODO init books here ?
  // });


  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Books</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/books/add-book">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Books
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList class="ion-padding">
          {books.map(b => <BookListItem key={b.id} book={b} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: BooksState) => {
  const books = state.books
  return {books};
};

export default connect(mapStateToProps)(Home);

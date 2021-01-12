import React, {useState} from 'react';
import {
    IonBackButton, IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonInput,
    IonItem,
    IonLabel,
    IonPage, IonTitle, IonToast,
    IonToolbar,
} from '@ionic/react';
import './CreateBook.css';
import {connect, useSelector} from "react-redux";
import {addBook} from "../redux/actions";
import {BooksActionTypes} from "../redux/types";
import {useHistory} from "react-router";
import {getBook, getLastId} from "../redux/selectors";
import {BooksState} from "../redux/reducer";

interface CreateBookProps {
    addBook: (newBookTitle: string, newBookAuthors: string) => BooksActionTypes;
}

const CreateBook: React.FC<CreateBookProps> = ({addBook}) => {
    const [bookTitle, setBookTitle] = useState<string | undefined | null>('');
    const [bookAuthors, setBookAuthors] = useState<string | undefined | null>('');

    const history = useHistory();

    const lastId: number = useSelector(getLastId);

    const onAddButtonClicked = () => {
        if (bookTitle && bookAuthors) {
            const bookAdded: BooksActionTypes = addBook(bookTitle, bookAuthors);
            const id = lastId + 1;
            history.push({pathname: `/books/${id}`, state: {book: {id: id, title: bookTitle, authors: bookAuthors}}})
        }
    }

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Books" defaultHref="/"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        Add new book
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onAddButtonClicked}>
                            Add
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <>
                    <IonItem>
                        <IonLabel position="stacked" color="primary">Title</IonLabel>
                        <IonInput value={bookTitle}
                                  onIonChange={(event) => setBookTitle(event.detail.value)}/>
                    </IonItem>
                    <IonItem className="ion-margin-top">
                        <IonLabel position="stacked" color="primary">Author(s)</IonLabel>
                        <IonInput value={bookAuthors}
                                  onIonChange={(event) => setBookAuthors(event.detail.value)}/>
                    </IonItem>
                </>
            </IonContent>
        </IonPage>
    );
};

export default connect(
    getBook,
    { addBook }
)(CreateBook);

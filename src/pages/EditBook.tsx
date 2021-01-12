import React, {useState} from 'react';
import {
    IonBackButton, IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonInput,
    IonItem,
    IonLabel,
    IonPage, IonTitle,
    IonToolbar,
} from '@ionic/react';
import './CreateBook.css';
import {connect, useSelector} from "react-redux";
import {editBook} from "../redux/actions";
import {BooksActionTypes} from "../redux/types";
import {useHistory} from "react-router";
import {getBook, getLastId} from "../redux/selectors";
import {Book} from "../data/books";

interface EditBookProps {
    bookId: number;
    oldBookTitle: string;
    oldBookAuthors: string;
    editBook: (newBook: Book) => BooksActionTypes;
}

const EditBook: React.FC<EditBookProps> = ({bookId, oldBookTitle, oldBookAuthors, editBook}) => {
    const [bookTitle, setBookTitle] = useState<string | null | undefined>(oldBookTitle);
    const [bookAuthors, setBookAuthors] = useState<string | null | undefined>(oldBookAuthors);

    const history = useHistory();
    const lastId: number = useSelector(getLastId);

    const onSaveButtonClicked = () => {
        if (bookTitle && bookAuthors) {
            const bookEdited: BooksActionTypes = editBook({id: bookId, title: bookTitle, authors: bookAuthors});
            history.push(`/books/${bookId}`)
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
                        Edit book
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onSaveButtonClicked}>
                            Save
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
    {editBook}
)(EditBook);

import React, {useState} from 'react';
import {Book} from '../data/books';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonNote,
    IonPage,
    IonToolbar,
} from '@ionic/react';
import {RouteComponentProps, useHistory, useLocation} from 'react-router';
import './ViewBook.css';
import {chevronBackOutline} from "ionicons/icons";


interface ViewBookProps extends RouteComponentProps<{ id: string }> {
}

const ViewBook: React.FC<ViewBookProps> = ({match}) => {
    // useIonViewWillEnter(() => {
    //   const book = getBook(parseInt(match.params.id, 10));
    //   setBook(book);
    // });

    const location = useLocation();

    // @ts-ignore
    const book: Book = location.state ? location.state.book : {id: 0, title: "", authors:""};

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons>
                        <IonButton routerLink="/" routerDirection="back">
                            <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                            Books
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <>
                    <h1>
                        {book.title}
                    </h1>
                    <h2>
                        <IonNote>
                            {book.authors}
                        </IonNote>
                    </h2>
                </>
            </IonContent>
        </IonPage>
    );
};

export default ViewBook;

import React from 'react';
import {Book} from '../data/books';
import {
    IonButton,
    IonButtons,
    IonContent, IonFab, IonFabButton,
    IonHeader, IonIcon,
    IonNote,
    IonPage,
    IonToolbar,
    IonList,
} from '@ionic/react';
import {RouteComponentProps, useHistory, useLocation} from 'react-router';
import './ViewBook.css';
import {add, chevronBackOutline} from "ionicons/icons";
import ExcerptListItem from "../components/ExcerptListItem";


interface ViewBookProps extends RouteComponentProps<{ id: string }> {
}

const ViewBook: React.FC<ViewBookProps> = ({match}) => {
    // useIonViewWillEnter(() => {
    //   const book = getBook(parseInt(match.params.id, 10));
    //   setBook(book);
    // });

    const location = useLocation();
    const history = useHistory();

    // @ts-ignore
    const book: Book = location.state ? location.state.book : {id: 0, title: "", authors: ""};

    const addExcerpt = () => {
        history.push({pathname: `/books/${book.id}/add-excerpt`, state: {book: book}})
    }

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

            {book && book.excerpts &&
            <IonContent fullscreen className="ion-padding">
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => addExcerpt()}>
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </IonFab>

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
                <IonList>
                    {book.excerpts.map((e, idx) => <ExcerptListItem key={idx} excerpt={e}/>)}
                </IonList>
            </IonContent>
            }
        </IonPage>
    );
};

export default ViewBook;

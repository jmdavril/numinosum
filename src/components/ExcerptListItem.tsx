import React from 'react';
import {
    IonItem, IonLabel, IonText,
} from '@ionic/react';
import {BookExcerpt} from '../data/books';
import './ExcerptListItem.css';

interface ExcerptListItemProps {
    excerpt: BookExcerpt;
}

const ExcerptListItem: React.FC<ExcerptListItemProps> = ({excerpt}) => {
    return (
        <IonItem class="excerpt-list-item">
            <IonLabel className="ion-text-wrap">
                <IonText><span className="page-number">Page {excerpt.pageNumber}</span>  {excerpt.text}</IonText>
            </IonLabel>
        </IonItem>
    );
};

export default ExcerptListItem;

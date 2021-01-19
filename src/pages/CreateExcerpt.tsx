import React, {useCallback, useRef, useState} from 'react';

import {useCamera} from '@ionic/react-hooks/camera';
import {CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory} from "@capacitor/core";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonList, IonLoading, IonModal, IonNote,
    IonPage,
    IonTextarea, IonTitle,
    IonToolbar
} from "@ionic/react";
import {chevronBackOutline} from "ionicons/icons";
import {useHistory, useLocation} from "react-router";
import {Book, BookExcerpt} from "../data/books";
import './CreateExcerpt.css'
import {BooksActionTypes} from "../redux/types";
import {addExcerpt} from "../redux/actions";
import {connect} from "react-redux";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {createWorker, PSM} from 'tesseract.js';


interface CreateExcerptProps {
    addExcerpt: (bookId: number, pageNumber: number, excerptText: string) => BooksActionTypes;
}

interface ExcerptPhoto {
    path: string;
}

const getCroppedImg = async (image: HTMLImageElement, crop: any, fileName: string) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.ceil(crop.width * scaleX);
    canvas.height = Math.ceil(crop.height * scaleY);
    const ctx = canvas.getContext('2d');

    ctx!.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');
    // return base64Image;

    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob: any) => {
            blob.name = fileName;
            resolve(blob);
        }, 'image/jpeg', 1);
    });
}


const CreateExcerpt: React.FC<CreateExcerptProps> = ({addExcerpt}) => {
    const {getPhoto} = useCamera();
    const [excerptText, setExcerptText] = useState<string | undefined | null>();
    const [excerptPageNumber, setExcerptPageNumber] = useState<number>(0);
    const [excerptPhoto, setExcerptPhoto] = useState<CameraPhoto | undefined>(undefined);
    const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
    const location = useLocation();
    const history = useHistory();
    const [crop, setCrop] = useState<any>({});
    const [croppedImage, setCroppedImage] = useState<any | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onLoad = (img: HTMLImageElement) => {
        setImage(img);
    };

    // @ts-ignore
    const book: Book = location.state ? location.state.book : {id: 0, title: "", authors: ""};

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
        setExcerptPhoto(cameraPhoto);
        setShowModal(true);
    };

    const worker = createWorker({
        logger: m => console.log(m)
    });

    const getOCROutput = async (blob: any): Promise<string> => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {data: {text}} = await worker.recognize(URL.createObjectURL(blob));

        return text.split("\n").filter(s => s.trim() !== "").join()
    }

    const getCroppedPhoto = async () => {
        setIsLoading(true);
        const blob = await getCroppedImg(image!, crop, "test");
        setCroppedImage(blob);
        const outputText: string = await getOCROutput(blob);
        if (excerptText) {
            setExcerptText(excerptText.concat(outputText));
        } else {
            setExcerptText(outputText);
        }
        setIsLoading(false);
        setShowModal(false);
    }

    const onExcerptAddClick = () => {
        if (excerptText) {
            addExcerpt(book.id, excerptPageNumber, excerptText);
            history.push("/");
        }
    }

    return (
        <IonPage id="create-excerpt-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons>
                        <IonButton routerLink={`/`} routerDirection="back">
                            <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                            Books
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        Add excerpt
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onExcerptAddClick}>
                            Add
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonLoading
                    isOpen={isLoading}
                    message={'Extracting text...'}
                />
                <IonModal isOpen={(showModal)}>
                    {excerptPhoto &&
                    <div>
                        <ReactCrop src={excerptPhoto.webPath!} crop={crop} onChange={newCrop => setCrop(newCrop)}
                                   onImageLoaded={(onLoad)}/>
                    </div>
                    }
                    <IonButton onClick={() => getCroppedPhoto()}>Confirm</IonButton>
                </IonModal>
                <h1>{book.title}</h1>
                <h2><IonNote>{book.authors}</IonNote></h2>

                <IonList>
                    <IonItemDivider>Page number</IonItemDivider>
                    <IonItem>
                        <IonInput type="number" value={excerptPageNumber} placeholder="Enter page number"
                                  onIonChange={e => setExcerptPageNumber(parseInt(e.detail.value!, 10))}></IonInput>
                    </IonItem>

                    <IonItemDivider>Excerpt text</IonItemDivider>
                    <IonItem>
                        <IonTextarea
                            className="excerpt-input"
                            rows={12} autoGrow
                            placeholder="Enter excerpt here" value={excerptText}
                            onIonChange={e => setExcerptText(e.detail.value!)}>
                        </IonTextarea>
                    </IonItem>
                </IonList>
                <IonButton expand="block" onClick={() => takePhoto()}>
                    Take photo
                </IonButton>
                {croppedImage && <img alt="dummy" src={URL.createObjectURL(croppedImage)}/>}
            </IonContent>
        </IonPage>
    );
}

export default connect(
    null,
    {addExcerpt}
)(CreateExcerpt);

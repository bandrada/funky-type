import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCbr92Ofgh2zhmCRrkLYZj0wDCMtwrSKRk",
    authDomain: "funky-type.firebaseapp.com",
    projectId: "funky-type",
    storageBucket: "funky-type.appspot.com",
    messagingSenderId: "892316239170",
    appId: "1:892316239170:web:55e284d47cdaa730bbb4db"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addScript(script) {
    try {
        const docRef = await addDoc(collection(db, 'scripts'), {
            title: script.title,
            text: script.text
        });
        console.log('script was added with id: ' + docRef.id);
    } catch(error) {
        console.error(error);
    }
}

export async function getScripts() {
    const scripts = await getDocs(collection(db, 'scripts'));
    console.log(scripts);
    return scripts;
} 
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
        return docRef.id;
    } catch(error) {
        console.error(error);
    }
}

export async function getScripts() {
    console.log('firebase get all');
    const snapshot = await getDocs(collection(db, 'scripts'));
    let scripts = [];
    snapshot.forEach((doc) => {
        scripts.push(doc.data());
    });
    console.log({'scripts': scripts});
    return scripts;
} 

export async function getRandomScript() {
    const scripts = await getScripts();
    console.log('firebase get random');
    const randi = Math.floor(Math.random() * (scripts.length - 1));
    console.log(randi);
    return scripts[randi];
}
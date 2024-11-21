import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyBKnXI3zOUFw40L9p7BMYAGBD9bX1oShbM",
	authDomain: "tournamentcs-43634.firebaseapp.com",
	projectId: "tournamentcs-43634",
	storageBucket: "tournamentcs-43634.firebasestorage.app",
	messagingSenderId: "770650716025",
	appId: "1:770650716025:web:7d963e15f2ba2eeb96a1a8",
}

const firebaseApp = initializeApp(firebaseConfig)
const firestore = getFirestore(firebaseApp)

export const db = firestore

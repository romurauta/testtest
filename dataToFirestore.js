import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKnXI3zOUFw40L9p7BMYAGBD9bX1oShbM",
  authDomain: "tournamentcs-43634.firebaseapp.com",
  projectId: "tournamentcs-43634",
  storageBucket: "tournamentcs-43634.firebasestorage.app",
  messagingSenderId: "770650716025",
  appId: "1:770650716025:web:7d963e15f2ba2eeb96a1a8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadData() {
  try {
    // Ottelut data
    const ottelut = [
      {
        aika: "1. 18:00-18:45",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "JATS",
      },
      {
        aika: "1. 18:00-18:45",
        kentta: "kentta2",
        joukkue1: "FomFom",
        joukkue2: "NVS",
      },
      {
        aika: "1. 18:00-18:45",
        kentta: "kentta3",
        joukkue1: "GN",
        joukkue2: "SB",
      },
      {
        aika: "2. 18:45-19:30",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "FomFom",
      },
      {
        aika: "2. 18:45-19:30",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "GN",
      },
      {
        aika: "2. 18:45-19:30",
        kentta: "kentta3",
        joukkue1: "NVS",
        joukkue2: "SB",
      },
      {
        aika: "3. 19:30-20:15",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "NVS",
      },
      {
        aika: "3. 19:30-20:15",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "SB",
      },
      {
        aika: "3. 19:30-20:15",
        kentta: "kentta3",
        joukkue1: "FomFom",
        joukkue2: "GN",
      },
      {
        aika: "4. 20:15-21:00",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "GN",
      },
      {
        aika: "4. 20:15-21:00",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "NVS",
      },
      {
        aika: "4. 20:15-21:00",
        kentta: "kentta3",
        joukkue1: "FomFom",
        joukkue2: "SB",
      },
      {
        aika: "5. 21:00-21:45",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "SB",
      },
      {
        aika: "5. 21:00-21:45",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "FomFom",
      },
      {
        aika: "5. 21:00-21:45",
        kentta: "kentta3",
        joukkue1: "NVS",
        joukkue2: "GN",
      },
      {
        aika: "6. 21:45-22:30",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "JATS",
      },
      {
        aika: "6. 21:45-22:30",
        kentta: "kentta2",
        joukkue1: "FomFom",
        joukkue2: "NVS",
      },
      {
        aika: "6. 21:45-22:30",
        kentta: "kentta3",
        joukkue1: "GN",
        joukkue2: "SB",
      },
      {
        aika: "7. 22:30-23:15",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "FomFom",
      },
      {
        aika: "7. 22:30-23:15",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "GN",
      },
      {
        aika: "7. 22:30-23:15",
        kentta: "kentta3",
        joukkue1: "NVS",
        joukkue2: "SB",
      },
      {
        aika: "8. 23:15-00:00",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "NVS",
      },
      {
        aika: "8. 23:15-00:00",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "SB",
      },
      {
        aika: "8. 23:15-00:00",
        kentta: "kentta3",
        joukkue1: "FomFom",
        joukkue2: "GN",
      },
      {
        aika: "9. 00:00-00:45",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "GN",
      },
      {
        aika: "9. 00:00-00:45",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "NVS",
      },
      {
        aika: "9. 00:00-00:45",
        kentta: "kentta3",
        joukkue1: "FomFom",
        joukkue2: "SB",
      },
      {
        aika: "10. 00:45-01:30",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "SB",
      },
      {
        aika: "10. 00:45-01:30",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "FomFom",
      },
      {
        aika: "10. 00:45-01:30",
        kentta: "kentta3",
        joukkue1: "NVS",
        joukkue2: "GN",
      },
      {
        aika: "11. 11:00-11:45",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "JATS",
      },
      {
        aika: "11. 11:00-11:45",
        kentta: "kentta2",
        joukkue1: "FomFom",
        joukkue2: "NVS",
      },
      {
        aika: "11. 11:00-11:45",
        kentta: "kentta3",
        joukkue1: "NVS",
        joukkue2: "GN",
      },
      {
        aika: "12. 11:45-12:30",
        kentta: "kentta1",
        joukkue1: "TT",
        joukkue2: "FomFom",
      },
      {
        aika: "12. 11:45-12:30",
        kentta: "kentta2",
        joukkue1: "JATS",
        joukkue2: "GN",
      },
      {
        aika: "12. 11:45-12:30",
        kentta: "kentta3",
        joukkue1: "NVS",
        joukkue2: "SB",
      },
    ];

    for (const match of ottelut) {
      const docRef = `${match.aika.replace(/\s+/g, "_")}_${match.kentta}`;
      await setDoc(doc(db, "ottelut", docRef), match);
    }

    console.log("Data siirretty onnistuneesti Firestoreen!");
  } catch (error) {
    console.error("Virhe datan siirrossa:", error);
  }
}

uploadData();

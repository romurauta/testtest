import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../lib/firestore"

export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        try {
            const docRef = doc(db, "kokoonpanot", "nykyiset")
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) return { joukkueet: {} }
            return { joukkueet: docSnap.data().joukkueet }
        } catch (err) {
            console.error(err)
            return { error: "Virhe joukkueiden haussa" }
        }
    }

    if (event.method === "POST") {
        const { joukkueet } = await readBody(event)
        if (!joukkueet) return { error: "Ei joukkueita annettu" }
        try {
            const docRef = doc(db, "kokoonpanot", "nykyiset")
            await setDoc(docRef, { joukkueet })
            return { success: true }
        } catch (err) {
            console.error(err)
            return { error: "Tallennus epäonnistui" }
        }
    }

    return { error: "Method not allowed" }
})

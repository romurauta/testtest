import { collection, getDocs, doc, updateDoc, addDoc, getDoc } from "firebase/firestore"
import { db } from "../lib/firestore"

export default defineEventHandler(async (event) => {
    const method = getMethod(event)

    if (method === "GET") {
        try {
            const querySnapshot = await getDocs(collection(db, "playoffs"))
            const matches = []
            querySnapshot.forEach((docSnap) => {
                matches.push({ id: docSnap.id, ...docSnap.data() })
            })
            return matches
        } catch (error) {
            console.error("Virhe playoffien haussa:", error)
            return { error: "Virhe playoffien haussa" }
        }
    }

    if (method === "POST") {
        const body = await readBody(event)
        const { id, round, matchNumber, team1, team2, score1, score2 } = body

        if (!round || typeof matchNumber !== "number") {
            return { error: "Virheelliset tiedot" }
        }

        try {
            if (id) {
                const docRef = doc(db, "playoffs", id)
                await updateDoc(docRef, { team1, team2, score1, score2 })
                const updated = await getDoc(docRef)
                return { id, ...updated.data() }
            }

            const docRef = await addDoc(collection(db, "playoffs"), {
                round,
                matchNumber,
                team1,
                team2,
                score1,
                score2,
            })

            const saved = await getDoc(docRef)
            return { id: docRef.id, ...saved.data() }
        } catch (error) {
            console.error("Virhe tallennuksessa:", error)
            return { error: "Virhe tallennuksessa" }
        }
    }

    return { error: "Method not allowed" }
})

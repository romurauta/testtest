import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
import { db } from "../lib/firestore"

export default defineEventHandler(async (event) => {
	const method = getMethod(event)

	if (method === "GET") {
		try {
			// Hae kaikki tiedot Firestoresta
			const querySnapshot = await getDocs(collection(db, "tiedot"))
			const results = []
			querySnapshot.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() })
			})
			return results
		} catch (error) {
			console.error("Virhe tietojen haussa:", error)
			return { error: "Virhe tietojen haussa" }
		}
	}

	if (method === "POST") {
		const { teksti } = await readBody(event)

		if (!teksti || typeof teksti !== "string") {
			return { error: "Invalid data provided" }
		}

		try {
			// Lisää uusi tieto Firestoreen
			await addDoc(collection(db, "tiedot"), { teksti })
			return { success: true }
		} catch (error) {
			console.error("Virhe tietokantapäivityksessä:", error)
			return { error: "Tietokantapäivitys epäonnistui" }
		}
	}

	if (method === "DELETE") {
		const { id } = await readBody(event)

		if (!id || typeof id !== "string") {
			return { error: "Invalid ID provided" }
		}

		try {
			// Poista tieto Firestoresta
			const docRef = doc(db, "tiedot", id)
			await deleteDoc(docRef)
			return { success: true }
		} catch (error) {
			console.error("Virhe tietokannan päivityksessä:", error)
			return { error: "Tietokantapäivitys epäonnistui" }
		}
	}

	return { error: "Method not allowed" }
})

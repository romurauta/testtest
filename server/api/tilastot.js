import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "../lib/firestore"

export default defineEventHandler(async (event) => {
	const method = getMethod(event)

	if (method === "GET") {
		try {
			// Palauta kaikki pelaajat
			const querySnapshot = await getDocs(collection(db, "pelaajat"))
			const players = []
			querySnapshot.forEach((doc) => {
				players.push({ id: doc.id, ...doc.data() })
			})
			return players
		} catch (error) {
			console.error("Virhe pelaajien haussa:", error)
			return { error: "Virhe pelaajien haussa" }
		}
	}

	if (method === "POST") {
		const { nimi, kill = 0, death = 0, assist = 0 } = await readBody(event)

		if (!nimi) {
			return { error: "Pelaajan nimi vaaditaan" }
		}

		try {
			// Hae pelaajan dokumentti Firestoresta
			const playersRef = collection(db, "pelaajat")
			const q = query(playersRef, where("nimi", "==", nimi))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				return { error: "Pelaajaa ei löydy" }
			}

			const playerDoc = querySnapshot.docs[0]
			const playerData = playerDoc.data()

			const uusiKill = (playerData.kill || 0) + kill
			const uusiDeath = (playerData.death || 0) + death
			const uusiAssist = (playerData.assist || 0) + assist

			// Lasketaan uusi ratio
			const uusiRatio = uusiDeath > 0 ? uusiKill / uusiDeath : uusiKill

			// Päivitä pelaajan tiedot Firestoressa
			const docRef = doc(db, "pelaajat", playerDoc.id)
			await updateDoc(docRef, {
				kill: uusiKill,
				death: uusiDeath < 0 ? 0 : uusiDeath,
				assist: uusiAssist,
				ratio: uusiRatio,
			})

			return { success: true, nimi, uusiKill, uusiDeath, uusiAssist, uusiRatio }
		} catch (error) {
			console.error("Päivitys epäonnistui:", error)
			return { error: "Päivitys epäonnistui" }
		}
	}

	return { error: "Method not allowed" }
})

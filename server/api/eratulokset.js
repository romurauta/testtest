import db from "../db"
export default defineEventHandler(async (event) => {
	if (event.method === "GET") {
		try {
			const results = db.prepare("SELECT * FROM ottelut").all()
			return results
		} catch (error) {
			console.error("Virhe otteluiden haussa:", error)
			return { error: "Virhe otteluiden haussa" }
		}
	}

	if (event.method === "POST") {
		const { kentta, aika, joukkue1Voitetut, joukkue2Voitetut } = await readBody(event)

		// Tarkistetaan, että kaikki tiedot ovat olemassa
		if (!kentta || !aika || typeof joukkue1Voitetut !== "number" || typeof joukkue2Voitetut !== "number") {
			return { error: "Invalid data provided" }
		}

		try {
			// Päivitetään ottelutulokset tietokantaan
			const result = db
				.prepare(
					`
                UPDATE ottelut
                SET joukkue1_voitetut = ?, joukkue2_voitetut = ?
                WHERE kentta = ? AND aika = ?
            `
				)
				.run(joukkue1Voitetut, joukkue2Voitetut, kentta, aika)

			if (result.changes === 0) {
				return { error: "Ottelua ei löytynyt" }
			}

			return { success: true }
		} catch (error) {
			console.error("Virhe tietokantapäivityksessä:", error)
			return { error: "Tietokantapäivitys epäonnistui" }
		}
	}

	return { error: "Method not allowed" }
})

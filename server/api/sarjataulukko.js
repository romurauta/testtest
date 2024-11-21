import db from "../db"

export default defineEventHandler(async (event) => {
	const method = getMethod(event)

	if (method === "GET") {
		try {
			// Palauta sarjataulukko
			const results = db.prepare("SELECT * FROM sarjataulukko").all()
			return results
		} catch (error) {
			console.error("Virhe sarjataulukon haussa:", error)
			return { error: "Virhe sarjataulukon haussa" }
		}
	}

	if (method === "POST") {
		const { nimi, tulos, maara } = await readBody(event)

		// Tarkista syötteet
		if (!nimi || !tulos || typeof maara !== "number") {
			console.error("Virheelliset tiedot:", { nimi, tulos, maara })
			return { error: "Invalid data provided" }
		}

		// Päivitä tiedot
		try {
			if (tulos === "voitto") {
				// Voitosta lisätään tai vähennetään 2 pistettä
				db.prepare(
					`
					UPDATE sarjataulukko
					SET voitot = MAX(0, voitot + ?),
						pisteet = MAX(0, pisteet + ? * 2)
					WHERE nimi = ?
					`
				).run(maara, maara, nimi)
			} else if (tulos === "tasapeli") {
				// Tasapelistä lisätään tai vähennetään 1 piste
				db.prepare(
					`
					UPDATE sarjataulukko
					SET tasapelit = MAX(0, tasapelit + ?),
						pisteet = MAX(0, pisteet + ? * 1)
					WHERE nimi = ?
					`
				).run(maara, maara, nimi)
			} else if (tulos === "havio") {
				// Häviöstä ei lisätä tai vähennetä pisteitä
				db.prepare(
					`
					UPDATE sarjataulukko
					SET havio = MAX(0, havio + ?)
					WHERE nimi = ?
					`
				).run(maara, nimi)
			} else {
				console.error("Virheellinen tulos:", tulos)
				return { error: "Invalid tulos value" }
			}

			return { success: true }
		} catch (error) {
			console.error("Päivitys epäonnistui:", error)
			return { error: "Päivitys epäonnistui" }
		}
	}

	return { error: "Method not allowed" }
})

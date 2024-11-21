import db from "../db"

export default defineEventHandler(async (event) => {
	const method = getMethod(event)

	if (method === "GET") {
		// Palauta kaikki pelaajat
		return db.prepare("SELECT * FROM pelaajat").all()
	}

	if (method === "POST") {
		// Päivitä pelaajan tiedot
		const { nimi, kill = 0, death = 0, assist = 0 } = await readBody(event)

		if (!nimi) {
			return { error: "Pelaajan nimi vaaditaan" }
		}

		try {
			// Päivitä pelaajan tilastot tietokantaan
			const pelaaja = db.prepare("SELECT * FROM pelaajat WHERE nimi = ?").get(nimi)

			if (!pelaaja) {
				return { error: "Pelaajaa ei löydy" }
			}

			const uusiKill = pelaaja.kill + kill
			const uusiDeath = pelaaja.death + death
			const uusiAssist = pelaaja.assist + assist

			// Lasketaan uusi ratio
			const uusiRatio = uusiDeath > 0 ? uusiKill / uusiDeath : uusiKill

			db.prepare(
				`
				UPDATE pelaajat
				SET kill = ?, death = ?, assist = ?, ratio = ?
				WHERE nimi = ?
			`
			).run(uusiKill, uusiDeath < 0 ? 0 : uusiDeath, uusiAssist, uusiRatio, nimi)

			return { success: true, nimi, uusiKill, uusiDeath, uusiAssist, uusiRatio }
		} catch (error) {
			console.error("Päivitys epäonnistui:", error)
			return { error: "Päivitys epäonnistui" }
		}
	}

	return { error: "Method not allowed" }
})

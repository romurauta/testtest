import db from "../db"

export default defineEventHandler(async (event) => {
    if (event.method === "GET") {
        try {
            const results = db.prepare("SELECT * FROM tiedot").all()
            return results
        } catch (error) {
            console.error("Virhe tietojen haussa:", error)
            return { error: "Virhe tietojen haussa" }
        }
    }

    if (event.method === "POST") {
        const { teksti } = await readBody(event)

        if (!teksti || typeof teksti !== "string") {
            return { error: "Invalid data provided" }
        }

        try {
            db.prepare("INSERT INTO tiedot (teksti) VALUES (?)").run(teksti)
            return { success: true }
        } catch (error) {
            console.error("Virhe tietokantapäivityksessä:", error)
            return { error: "Tietokantapäivitys epäonnistui" }
        }
    }

    if (event.method === "DELETE") {
        const { id } = await readBody(event)

        if (!id || typeof id !== "number") {
            return { error: "Invalid ID provided" }
        }

        try {
            db.prepare("DELETE FROM tiedot WHERE id = ?").run(id)
            return { success: true }
        } catch (error) {
            console.error("Virhe tietokannan päivityksessä:", error)
            return { error: "Tietokantapäivitys epäonnistui" }
        }
    }

    return { error: "Method not allowed" }
})

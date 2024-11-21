import Database from "better-sqlite3"
const db = new Database("database.db")

db.exec(`
  CREATE TABLE IF NOT EXISTS tiedot (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teksti TEXT NOT NULL
  )
`)
// Luodaan sarjataulukko, jos sitä ei ole olemassa
db.exec(`
  CREATE TABLE IF NOT EXISTS sarjataulukko (
    nimi TEXT PRIMARY KEY,
    voitot INTEGER DEFAULT 0,
    tasapelit INTEGER DEFAULT 0,
    havio INTEGER DEFAULT 0,
    pisteet INTEGER DEFAULT 0
  )
`)

// Alustetaan sarjataulukon data
const stmtSarjataulukko = db.prepare("SELECT COUNT(*) as count FROM sarjataulukko")
if (stmtSarjataulukko.get().count === 0) {
	db.exec(`
    INSERT INTO sarjataulukko (nimi) VALUES 
    ('HH'), ('HNJHN'), ('AAK'), ('100KL'), ('KN'), ('VFC')
  `)
}

// Luodaan pelaajat-taulukko, jos sitä ei ole olemassa
db.exec(`
  CREATE TABLE IF NOT EXISTS pelaajat (
    nimi TEXT PRIMARY KEY,
    kill INTEGER DEFAULT 0,
    death INTEGER DEFAULT 0,
    assist INTEGER DEFAULT 0,
    ratio REAL DEFAULT 0
  )
`)

// Alustetaan pelaajat-taulukon data
const stmtPelaajat = db.prepare("SELECT COUNT(*) as count FROM pelaajat")
if (stmtPelaajat.get().count === 0) {
	db.exec(`
    INSERT INTO pelaajat (nimi) VALUES 
    ('Mussu'), ('Joge'), ('VerdiH'), ('Radu'), ('nico_ilari'), ('tenho'), ('heGe'), 
    ('wiilis'), ('pantsi'), ('ZzeiT'), ('Perä_carry'), ('-Pule'), ('JerDAD'), ('vedivaan'), 
    ('Are'), ('Löyläri'), ('lärvi'), ('s1mple'), ('Candle'), ('HASSE'), ('Jerbanderus'), 
    ('Pedro'), ('elmeri:D'), ('Plasen'), ('venyniilo'), ('Jakender'), ('J0nesy'), ('Peksi'), 
    ('romurauta'), ('Omppu6')
  `)
}

db.exec(`
  CREATE TABLE IF NOT EXISTS ottelut (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aika TEXT NOT NULL,
    kentta TEXT NOT NULL,
    joukkue1 TEXT NOT NULL,
    joukkue2 TEXT NOT NULL,
    joukkue1_voitetut INTEGER DEFAULT 0,
    joukkue2_voitetut INTEGER DEFAULT 0
  )
`)

const stmtOttelut = db.prepare("SELECT COUNT(*) as count FROM ottelut")
if (stmtOttelut.get().count === 0) {
	db.exec(`
        INSERT INTO ottelut (aika, kentta, joukkue1, joukkue2) VALUES
        -- Perjantai ottelut
        ('1. 18:00-18:45', 'kentta1', 'HH', 'KN'),
        ('1. 18:00-18:45', 'kentta2', 'HNJHN', '100KL'),
        ('1. 18:00-18:45', 'kentta3', 'AAK', 'VFC'),
        ('2. 18:45-19:30', 'kentta1', 'HH', 'HNJHN'),
        ('2. 18:45-19:30', 'kentta2', 'KN', 'AAK'),
        ('2. 18:45-19:30', 'kentta3', '100KL', 'VFC'),
        ('3. 19:30-20:15', 'kentta1', 'HH', '100KL'),
        ('3. 19:30-20:15', 'kentta2', 'KN', 'VFC'),
        ('3. 19:30-20:15', 'kentta3', 'HNJHN', 'AAK'),
        ('4. 20:15-21:00', 'kentta1', 'HH', 'AAK'),
        ('4. 20:15-21:00', 'kentta2', 'KN', '100KL'),
        ('4. 20:15-21:00', 'kentta3', 'HNJHN', 'VFC'),
        ('5. 21:00-21:45', 'kentta1', 'HH', 'VFC'),
        ('5. 21:00-21:45', 'kentta2', 'KN', 'HNJHN'),
        ('5. 21:00-21:45', 'kentta3', '100KL', 'AAK'),
        ('6. 21:45-22:30', 'kentta1', 'HH', 'KN'),
        ('6. 21:45-22:30', 'kentta2', 'HNJHN', '100KL'),
        ('6. 21:45-22:30', 'kentta3', 'AAK', 'VFC'),
        ('7. 22:30-23:15', 'kentta1', 'HH', 'HNJHN'),
        ('7. 22:30-23:15', 'kentta2', 'KN', 'AAK'),
        ('7. 22:30-23:15', 'kentta3', '100KL', 'VFC'),
        ('8. 23:15-00:00', 'kentta1', 'HH', '100KL'),
        ('8. 23:15-00:00', 'kentta2', 'KN', 'VFC'),
        ('8. 23:15-00:00', 'kentta3', 'HNJHN', 'AAK'),
        ('9. 00:00-00:45', 'kentta1', 'HH', 'AAK'),
        ('9. 00:00-00:45', 'kentta2', 'KN', '100KL'),
        ('9. 00:00-00:45', 'kentta3', 'HNJHN', 'VFC'),
        ('10. 00:45-01:30', 'kentta1', 'HH', 'VFC'),
        ('10. 00:45-01:30', 'kentta2', 'KN', 'HNJHN'),
        ('10. 00:45-01:30', 'kentta3', '100KL', 'AAK'),
        -- Lauantai ottelut
        ('11. 11:00-11:45', 'kentta1', 'HH', 'KN'),
        ('11. 11:00-11:45', 'kentta2', 'HNJHN', '100KL'),
        ('11. 11:00-11:45', 'kentta3', 'AAK', 'VFC'),
        ('12. 11:45-12:30', 'kentta1', 'HH', 'HNJHN'),
        ('12. 11:45-12:30', 'kentta2', 'KN', 'AAK'),
        ('12. 11:45-12:30', 'kentta3', '100KL', 'VFC'),
        ('13. 12:30-13:15', 'kentta1', 'HH', '100KL'),
        ('13. 12:30-13:15', 'kentta2', 'KN', 'VFC'),
        ('13. 12:30-13:15', 'kentta3', 'HNJHN', 'AAK'),
        ('14. 13:15-14:00', 'kentta1', 'HH', 'AAK'),
        ('14. 13:15-14:00', 'kentta2', 'KN', '100KL'),
        ('14. 13:15-14:00', 'kentta3', 'HNJHN', 'VFC'),
        ('15. 14:00-14:45', 'kentta1', 'HH', 'VFC'),
        ('15. 14:00-14:45', 'kentta2', 'KN', 'HNJHN'),
        ('15. 14:00-14:45', 'kentta3', '100KL', 'AAK');
    `)
}

export default db

# ✅ Railway Setup Checklist

Je code staat nu op GitHub! Volg deze stappen om je website live te krijgen.

---

## 📍 Stap 1: Railway Project Aanmaken

1. **Ga naar:** [railway.app](https://railway.app)
2. **Log in** met je account
3. **Klik op:** "New Project"
4. **Selecteer:** "Deploy from GitHub repo"
5. **Kies:** `mpjjanssen/hartspraak-huiswerkboek`
6. **Klik op:** "Deploy Now"

✅ Railway begint nu met deployen (dit duurt 2-3 minuten)

---

## 📍 Stap 2: MySQL Database Toevoegen

1. **In je Railway project**, klik op **"+ New"** (rechtsboven)
2. **Selecteer:** "Database"
3. **Klik op:** "Add MySQL"
4. **Wacht** 1-2 minuten tot de database is aangemaakt

✅ Je hebt nu een MySQL database!

---

## 📍 Stap 3: Database URL Kopiëren

1. **Klik op** de **MySQL** service (in je Railway project)
2. **Ga naar** het **"Variables"** tabblad
3. **Zoek** de variabele: `DATABASE_URL`
4. **Klik op** het kopieer icoontje naast de waarde
5. **Bewaar** deze URL tijdelijk (bijv. in Kladblok)

De URL ziet er zo uit:
```
mysql://root:xxxxxxxxx@containers-us-west-123.railway.app:6789/railway
```

✅ Database URL gekopieerd!

---

## 📍 Stap 4: Environment Variables Instellen

1. **Klik op** je **web service** (niet de database!)
   - Dit is de service met de naam `hartspraak-huiswerkboek`
2. **Ga naar** het **"Variables"** tabblad
3. **Klik op** "Raw Editor" (rechtsboven)
4. **Verwijder** alles wat er staat
5. **Plak** onderstaande tekst:

```bash
DATABASE_URL=PLAK_HIER_DE_DATABASE_URL_VAN_STAP_3
JWT_SECRET=hartspraak-secret-2024-change-this-in-production-min-32-chars
OPENAI_API_KEY=PLAK_HIER_JE_OPENAI_KEY
VITE_APP_ID=hartspraak-huiswerkboek
NODE_ENV=production
PORT=3000
RESEND_API_KEY=
OAUTH_SERVER_URL=
OWNER_OPEN_ID=
```

6. **Vervang** de volgende waarden:
   - `DATABASE_URL=` → Plak de URL van stap 3
   - `OPENAI_API_KEY=` → Plak je OpenAI key (begint met `sk-...`)
   - Laat de rest zoals het is

7. **Klik op:** "Update Variables"

✅ Environment variables ingesteld!

---

## 📍 Stap 5: Database Schema Importeren

Nu moeten we de database tabellen aanmaken.

1. **Klik op** de **MySQL** service
2. **Ga naar** het **"Data"** tabblad
3. **Klik op** "Query" (of "Connect")
4. **Kopieer** de inhoud van het bestand hieronder
5. **Plak** in het query venster
6. **Klik op** "Run" of "Execute"

**Database Schema (kopieer dit):**

```sql
-- Voer dit uit in Railway MySQL Query venster

CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);

CREATE TABLE IF NOT EXISTS `auth_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`name` text,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auth_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `auth_users_email_unique` UNIQUE(`email`)
);

CREATE TABLE IF NOT EXISTS `verified_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` text,
	`addedBy` varchar(320),
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	`notes` text,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	CONSTRAINT `verified_members_id` PRIMARY KEY(`id`),
	CONSTRAINT `verified_members_email_unique` UNIQUE(`email`)
);

CREATE TABLE IF NOT EXISTS `admins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` text,
	`role` enum('super_admin','admin') NOT NULL DEFAULT 'admin',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` varchar(320),
	`lastLogin` timestamp,
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_email_unique` UNIQUE(`email`)
);

CREATE TABLE IF NOT EXISTS `user_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`workshopId` varchar(50) NOT NULL,
	`questionId` varchar(50) NOT NULL,
	`answerEncrypted` text NOT NULL,
	`encryptionIv` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_answers_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `ai_conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`workshopId` varchar(50) NOT NULL,
	`questionId` varchar(50) NOT NULL,
	`messagesEncrypted` text NOT NULL,
	`encryptionIv` varchar(255) NOT NULL,
	`messageCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_conversations_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `ai_usage_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userEmail` varchar(320),
	`workshopId` varchar(50) NOT NULL,
	`questionId` varchar(50) NOT NULL,
	`model` varchar(100) NOT NULL,
	`promptTokens` int NOT NULL DEFAULT 0,
	`completionTokens` int NOT NULL DEFAULT 0,
	`totalTokens` int NOT NULL DEFAULT 0,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_usage_logs_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`used` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `password_reset_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `password_reset_tokens_token_unique` UNIQUE(`token`)
);
```

✅ Database tabellen aangemaakt!

---

## 📍 Stap 6: Deployment Controleren

1. **Ga terug** naar je web service
2. **Klik op** het **"Deployments"** tabblad
3. **Wacht** tot de status **"SUCCESS"** is (2-3 minuten)
4. Als er een error is, klik op de deployment en bekijk de logs

✅ Deployment succesvol!

---

## 📍 Stap 7: Website URL Krijgen

1. **Klik op** je web service
2. **Ga naar** het **"Settings"** tabblad
3. **Scroll naar** "Domains"
4. **Klik op** "Generate Domain"
5. **Kopieer** de URL (bijvoorbeeld: `hartspraak-huiswerkboek-production.up.railway.app`)

✅ Je hebt nu een publieke URL!

---

## 📍 Stap 8: Website Testen

1. **Open** de URL in je browser
2. **Test:**
   - ✅ Homepage laadt
   - ✅ Kan registreren (maak een test account)
   - ✅ Kan inloggen
   - ✅ Workshop pagina's laden
   - ✅ AI coach werkt (stel een vraag)

🎉 **Je website is live!**

---

## 🎯 Volgende Stappen (Optioneel)

### Custom Domain Toevoegen
1. Railway → Settings → Domains → "Custom Domain"
2. Voeg je eigen domain toe (bijv. `werkboek.hartspraak.nl`)
3. Configureer DNS bij je domain provider

### Admin Account Aanmaken
1. Registreer via je website
2. Railway → MySQL → Data → Query
3. Voer uit:
```sql
INSERT INTO admins (email, name, role) VALUES ('mpjjanssen@gmail.com', 'Margreet', 'super_admin');
```

### Backups Instellen
1. Railway → MySQL → Settings
2. Schakel "Automated Backups" in

---

## ❓ Problemen?

### Website laadt niet
- Check Railway logs: Deployments → klik op laatste → View Logs
- Check of alle environment variables correct zijn

### Database errors
- Check of DATABASE_URL correct is
- Check of database schema is geïmporteerd

### AI werkt niet
- Check of OPENAI_API_KEY correct is (begint met `sk-...`)
- Check of je OpenAI account credit heeft

---

## 💰 Kosten Herinnering

- **Railway:** $5 gratis credit/maand, daarna ~$3-5/maand
- **OpenAI:** $5 gratis credit, daarna ~$0.30-1/maand
- **Totaal:** ~$3-6/maand

---

🎉 **Gefeliciteerd! Je Hartspraak Huiswerkboek is nu permanent online!**

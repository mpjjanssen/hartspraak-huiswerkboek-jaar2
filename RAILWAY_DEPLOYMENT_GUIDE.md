# Railway Deployment Handleiding - Hartspraak Huiswerkboek

## 📋 Wat Je Nodig Hebt

- ✅ Railway account (heb je al!)
- ⏳ OpenAI API key (ben je nu aan het maken)
- ✅ Dit project (al voorbereid!)

---

## 🚀 Deployment Stappen

### Stap 1: GitHub Repository Maken

**Waarom?** Railway deploy vanaf GitHub, dus we moeten je code daar uploaden.

**Wat moet je doen:**

1. **Ga naar** [github.com](https://github.com) en log in
2. **Klik op** het **+** icoon rechtsboven → "New repository"
3. **Vul in:**
   - Repository name: `hartspraak-huiswerkboek`
   - Description: `Hartspraak Huiswerkboek - Therapie werkboek met AI coach`
   - **Selecteer:** Private (zodat alleen jij het ziet)
4. **Klik op** "Create repository"
5. **Laat de pagina open** - we hebben straks de URL nodig

---

### Stap 2: Code Uploaden naar GitHub

**Ik ga dit voor je doen!** Zodra je de repository hebt aangemaakt, geef me:
- De repository URL (bijvoorbeeld: `https://github.com/jouwgebruikersnaam/hartspraak-huiswerkboek`)
- Of je GitHub gebruikersnaam

Dan upload ik alle code voor je!

---

### Stap 3: Railway Project Aanmaken

**Wat moet je doen:**

1. **Ga naar** [railway.app](https://railway.app) en log in
2. **Klik op** "New Project"
3. **Selecteer** "Deploy from GitHub repo"
4. **Kies** je `hartspraak-huiswerkboek` repository
5. **Klik op** "Deploy Now"

Railway begint nu automatisch met deployen!

---

### Stap 4: MySQL Database Toevoegen

**Wat moet je doen:**

1. **In je Railway project**, klik op **"+ New"**
2. **Selecteer** "Database" → "Add MySQL"
3. **Wacht** tot de database is aangemaakt (1-2 minuten)
4. **Klik op** de MySQL service
5. **Ga naar** het "Variables" tabblad
6. **Kopieer** de `DATABASE_URL` waarde (begint met `mysql://...`)

---

### Stap 5: Environment Variables Configureren

**Wat moet je doen:**

1. **Klik op** je web service (niet de database)
2. **Ga naar** het "Variables" tabblad
3. **Klik op** "Raw Editor"
4. **Plak** de volgende variabelen:

```bash
# Database (gebruik de DATABASE_URL van stap 4)
DATABASE_URL=mysql://root:jouwwachtwoord@containers-us-west-xxx.railway.app:xxxx/railway

# JWT Secret (voor beveiliging - genereer een willekeurige string)
JWT_SECRET=verander-dit-naar-een-lange-willekeurige-string-van-minimaal-32-karakters

# OpenAI API Key (die je net hebt aangemaakt)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxx

# App Configuration
VITE_APP_ID=hartspraak-huiswerkboek
NODE_ENV=production
PORT=3000

# Email (optioneel - voor wachtwoord reset)
RESEND_API_KEY=

# OAuth (optioneel - laat leeg)
OAUTH_SERVER_URL=
OWNER_OPEN_ID=
```

5. **Vervang** de waarden:
   - `DATABASE_URL`: Plak de URL van stap 4
   - `JWT_SECRET`: Gebruik een willekeurige string (bijv. `klik-op-generate-random-string-knop`)
   - `OPENAI_API_KEY`: Plak je OpenAI key (begint met `sk-...`)

6. **Klik op** "Update Variables"

---

### Stap 6: Database Schema Importeren

**Wat moet je doen:**

1. **In Railway**, klik op je **MySQL database**
2. **Ga naar** het "Data" tabblad
3. **Klik op** "Query"
4. **Kopieer** de inhoud van het bestand `railway-db-schema.sql` (ik geef je dit zo)
5. **Plak** in het query venster
6. **Klik op** "Run Query"

✅ Je database tabellen zijn nu aangemaakt!

---

### Stap 7: Deployment Voltooien

**Wat gebeurt er:**

1. Railway detecteert de nieuwe environment variables
2. De applicatie wordt automatisch opnieuw gedeployed
3. Na 2-3 minuten is je site live!

**Hoe check je of het werkt:**

1. **In Railway**, klik op je web service
2. **Ga naar** het "Settings" tabblad
3. **Scroll naar** "Domains"
4. **Klik op** "Generate Domain"
5. **Kopieer** de URL (bijvoorbeeld: `hartspraak-huiswerkboek-production.up.railway.app`)
6. **Open** deze URL in je browser

🎉 **Je website is nu live!**

---

## 🔧 Troubleshooting

### "Application failed to respond"

**Oplossing:**
1. Check of alle environment variables correct zijn ingevuld
2. Check de logs: Railway → je service → "Deployments" → klik op laatste deployment → "View Logs"
3. Zoek naar error messages

### "Database connection failed"

**Oplossing:**
1. Check of `DATABASE_URL` correct is
2. Check of de MySQL service draait (groen bolletje)
3. Probeer de database schema opnieuw te importeren

### "OpenAI API error"

**Oplossing:**
1. Check of `OPENAI_API_KEY` correct is (begint met `sk-...`)
2. Check of je OpenAI account credit heeft
3. Test je API key op [platform.openai.com](https://platform.openai.com)

---

## 💰 Kosten Overzicht

### Railway
- **Gratis tier:** $5 credit per maand
- **Geschatte kosten:** $3-5/maand voor dit project
- **Wat is inbegrepen:** Hosting + MySQL database

### OpenAI
- **Gratis credit:** $5 bij nieuwe accounts
- **Geschatte kosten:** $0.30-1/maand (afhankelijk van gebruik)
- **Model:** gpt-4o-mini ($0.15 per 1M input tokens)

**Totaal:** ~$3-6/maand voor een volledig werkende therapie werkboek site!

---

## 🎯 Volgende Stappen

Na deployment kun je:

1. **Custom Domain Toevoegen**
   - Railway → Settings → Domains → "Custom Domain"
   - Voeg je eigen domain toe (bijv. `hartspraak-werkboek.nl`)

2. **Email Configuratie** (optioneel)
   - Maak een Resend account aan
   - Voeg `RESEND_API_KEY` toe voor wachtwoord reset emails

3. **Admin Account Aanmaken**
   - Registreer via de website
   - Voeg jezelf toe als admin in de database

4. **Backups Instellen**
   - Railway → MySQL → Settings → "Backups"
   - Schakel automatische backups in

---

## 📞 Hulp Nodig?

Als je ergens vastloopt:
1. Check de Railway logs voor error messages
2. Vraag me om hulp - ik kan meekijken!
3. Railway support: [help.railway.app](https://help.railway.app)

---

## ✅ Checklist

Gebruik deze checklist om te controleren of alles werkt:

- [ ] Railway account aangemaakt
- [ ] OpenAI API key verkregen
- [ ] GitHub repository aangemaakt
- [ ] Code geüpload naar GitHub
- [ ] Railway project aangemaakt
- [ ] MySQL database toegevoegd
- [ ] Environment variables geconfigureerd
- [ ] Database schema geïmporteerd
- [ ] Website is toegankelijk via Railway URL
- [ ] Kan inloggen/registreren
- [ ] AI coach werkt (test een vraag)
- [ ] Database slaat data op

🎉 **Gefeliciteerd! Je Hartspraak Huiswerkboek is nu live!**

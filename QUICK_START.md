# ⚡ Snelle Start - Railway Deployment

## 🎯 Wat Heb Je Nodig?

1. ✅ Railway account (heb je al!)
2. ⏳ OpenAI API key (ben je nu aan het maken op platform.openai.com)
3. ⏳ GitHub account (maak aan op github.com als je die nog niet hebt)

---

## 🚀 5 Stappen naar Live Website

### Stap 1: GitHub Repository
1. Ga naar [github.com/new](https://github.com/new)
2. Repository name: `hartspraak-huiswerkboek`
3. Selecteer: **Private**
4. Klik: **Create repository**
5. **Geef mij de repository URL!**

### Stap 2: Ik Upload de Code
Zodra je me de GitHub URL geeft, upload ik alle code voor je!

### Stap 3: Railway Deployment
1. Ga naar [railway.app](https://railway.app)
2. Klik: **New Project** → **Deploy from GitHub repo**
3. Kies: `hartspraak-huiswerkboek`
4. Klik: **Deploy Now**

### Stap 4: Database Toevoegen
1. In Railway, klik: **+ New** → **Database** → **Add MySQL**
2. Kopieer de `DATABASE_URL` (Variables tabblad)

### Stap 5: Environment Variables
1. Klik op je web service → **Variables** → **Raw Editor**
2. Plak dit (vervang de waarden!):

```bash
DATABASE_URL=<plak-hier-de-database-url-van-stap-4>
JWT_SECRET=<genereer-een-willekeurige-string-van-32-karakters>
OPENAI_API_KEY=<plak-hier-je-openai-key>
VITE_APP_ID=hartspraak-huiswerkboek
NODE_ENV=production
PORT=3000
```

3. Klik: **Update Variables**

---

## ✅ Klaar!

Railway deploy nu automatisch je website. Na 2-3 minuten:

1. Ga naar: Settings → Domains → **Generate Domain**
2. Open de URL in je browser
3. 🎉 **Je website is live!**

---

## 📞 Hulp Nodig?

- Zie `RAILWAY_DEPLOYMENT_GUIDE.md` voor gedetailleerde instructies
- Vraag me om hulp als je ergens vastloopt!
- Check Railway logs als er errors zijn

---

## 💡 Tips

- **Database Schema:** Importeer `railway-db-schema.sql` via Railway → MySQL → Data → Query
- **Custom Domain:** Voeg toe via Railway → Settings → Domains
- **Kosten:** ~$3-6/maand (Railway $3-5 + OpenAI $0.30-1)

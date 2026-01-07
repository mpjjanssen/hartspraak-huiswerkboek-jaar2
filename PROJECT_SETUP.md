# Hartspraak Huiswerkboek - Project Setup

## Overzicht

Dit is een full-stack webapplicatie voor het Hartspraak Huiswerkboek project, gebouwd met moderne web technologieën.

## Tech Stack

### Frontend
- **React 19** - Moderne UI library
- **Vite** - Snelle build tool en development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **tRPC** - End-to-end typesafe APIs
- **Radix UI** - Accessible component primitives
- **Wouter** - Lightweight routing

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **tRPC Server** - Type-safe API endpoints
- **Drizzle ORM** - TypeScript ORM

### Database
- **MySQL** - Relationele database
- **Drizzle Kit** - Database migrations

### Features
- User authentication met bcrypt
- Encrypted data storage met crypto-js
- AI integration (OpenAI compatible)
- Admin dashboard
- Email notifications (Resend)
- Password reset functionality
- File uploads en downloads

## Database Schema

Het project gebruikt de volgende tabellen:

1. **users** - Gebruikers met OAuth authenticatie
2. **auth_users** - Lokale authenticatie gebruikers
3. **admins** - Beheerders
4. **verified_members** - Geverifieerde leden
5. **user_answers** - Gebruikersantwoorden (encrypted)
6. **ai_conversations** - AI chat geschiedenis
7. **ai_usage_logs** - AI gebruik tracking
8. **password_reset_tokens** - Wachtwoord reset tokens

## Environment Variables

Het project gebruikt de volgende environment variabelen (zie `.env`):

```bash
# Database
DATABASE_URL=mysql://root:password@localhost:3306/hartspraak_huiswerkboek

# Authentication
JWT_SECRET=your-secret-key-change-this-in-production

# OAuth (optioneel)
OAUTH_SERVER_URL=http://localhost:3000
OWNER_OPEN_ID=

# Manus API (optioneel)
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=

# App Configuration
VITE_APP_ID=hartspraak-huiswerkboek
NODE_ENV=development

# Email Service (optioneel voor local development)
RESEND_API_KEY=re_dummy_key_for_local_dev
```

## Installatie & Setup

### 1. Dependencies installeren

```bash
pnpm install
```

### 2. Database opzetten

Zorg ervoor dat MySQL draait:

```bash
sudo service mysql start
```

Database aanmaken en migraties uitvoeren:

```bash
pnpm db:push
```

### 3. Development server starten

```bash
pnpm dev
```

De applicatie draait nu op `http://localhost:3000/`

## Beschikbare Scripts

- `pnpm dev` - Start development server met hot reload
- `pnpm build` - Build productie versie
- `pnpm start` - Start productie server
- `pnpm check` - TypeScript type checking
- `pnpm format` - Code formatting met Prettier
- `pnpm test` - Run tests met Vitest
- `pnpm db:push` - Database migraties uitvoeren

## Project Structuur

```
hartspraak-huiswerkboek/
├── client/                 # Frontend code
│   ├── public/            # Statische bestanden
│   └── src/               # React componenten en pages
│       ├── components/    # Herbruikbare UI componenten
│       ├── pages/         # Route pages
│       ├── contexts/      # React contexts
│       └── hooks/         # Custom React hooks
├── server/                # Backend code
│   ├── _core/            # Core server functionaliteit
│   ├── routes/           # API routes
│   │   ├── auth.ts       # Authenticatie endpoints
│   │   ├── admin.ts      # Admin endpoints
│   │   ├── ai-helper.ts  # AI integratie
│   │   ├── user-data.ts  # Gebruikersdata (encrypted)
│   │   └── testimonials.ts # Testimonials
│   ├── lib/              # Utility functies
│   └── db.ts             # Database connectie
├── drizzle/              # Database schema en migraties
│   ├── schema.ts         # Database schema definitie
│   └── migrations/       # SQL migratie bestanden
└── shared/               # Gedeelde types en utilities

```

## Productie Deployment

### Build maken

```bash
pnpm build
```

Dit genereert:
- Frontend build in `dist/client/`
- Backend build in `dist/`

### Productie server starten

```bash
NODE_ENV=production pnpm start
```

### Belangrijke productie overwegingen

1. **Environment Variables**: Update alle secrets en API keys
2. **JWT_SECRET**: Gebruik een sterke, unieke secret
3. **DATABASE_URL**: Configureer productie database
4. **RESEND_API_KEY**: Configureer echte email service
5. **OAUTH_SERVER_URL**: Configureer OAuth indien gebruikt

## Ontwikkeling

### Hot Reload

De development server ondersteunt hot reload voor zowel frontend als backend code.

### Database Wijzigingen

1. Wijzig schema in `drizzle/schema.ts`
2. Genereer migratie: `pnpm db:push`

### API Endpoints

- `/api/auth/*` - Authenticatie endpoints
- `/api/admin/*` - Admin endpoints
- `/api/ai-helper/*` - AI integratie
- `/api/user-data/*` - Gebruikersdata (encrypted)
- `/api/testimonials/*` - Testimonials
- `/api/trpc/*` - tRPC endpoints

## Troubleshooting

### Server start niet

- Check of MySQL draait: `sudo service mysql status`
- Check of poort 3000 beschikbaar is
- Controleer `.env` configuratie

### Database errors

- Verify DATABASE_URL in `.env`
- Run migrations: `pnpm db:push`
- Check MySQL credentials

### Build errors

- Clear node_modules: `rm -rf node_modules && pnpm install`
- Clear build cache: `rm -rf dist`

## Support

Voor vragen of problemen, raadpleeg de documentatie of neem contact op met het ontwikkelteam.

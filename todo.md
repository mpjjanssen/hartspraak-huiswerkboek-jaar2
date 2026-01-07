# Project TODO

## Fase 1: Basis structuur en design systeem
- [x] Design systeem implementeren (kleuren, typografie, spacing)
- [x] Navigatie component maken (sticky header met menu)
- [x] Footer component maken
- [ ] Layout wrapper maken

## Fase 2: Home en Aandachtspunten pagina
- [x] Home pagina met welkomst en workshop overzicht
- [x] Aandachtspunten pagina met alle 8 aandachtspunten
- [ ] Workshop cards component voor overzicht

## Fase 3: Workshop pagina's
- [x] Workshop 1 pagina (De kracht van de psychologische basisbehoeften)
- [x] Workshop 2 pagina (Ontdek je hechtingsfundament)
- [x] Uitklapbare secties voor optionele opdrachten
- [x] Navigatie tussen workshops (vorige/volgende)

## Fase 4: Extra features (optioneel)
- [ ] Print functionaliteit per workshop
- [ ] Smooth scroll animaties
- [ ] Responsive design testen
- [ ] Over pagina

## Design specificaties
- Kleurenpalet: Warme aardtinten (beige, zand, terracotta, salie)
- Typografie: Serif voor headings, Sans-serif voor body
- Veel witruimte voor rust en leesbaarheid
- Emoji's voor visuele aantrekkelijkheid
- Zachte schaduwen en afgeronde hoeken

## Fase 5: Tekstvelden voor antwoorden (NIEUWE FEATURE)
- [x] Textarea componenten toevoegen onder alle vragen
- [x] localStorage implementatie voor automatisch opslaan
- [x] Visuele feedback wanneer antwoord wordt opgeslagen
- [ ] Print/export functionaliteit voor antwoorden
- [x] Workshop 1: Tekstvelden toevoegen
- [x] Workshop 2: Tekstvelden toevoegen

## Fase 6: Nieuwe features (AI, Download, Voortgang)
- [x] Voortgangsbalk component maken
- [x] Voortgangsbalk integreren in Workshop 1 en 2
- [x] Download functionaliteit - per workshop (PDF)
- [x] Download functionaliteit - per workshop (Word)
- [ ] Download functionaliteit - alle workshops (PDF)
- [ ] Download functionaliteit - alle workshops (Word)
- [x] AI begeleider chat component maken
- [x] AI begeleider integreren bij elke vraag in Workshop 1
- [x] AI begeleider integreren bij elke vraag in Workshop 2
- [x] AI begeleider toegang geven tot antwoorden deelnemer

## Fase 7: Samenvattingen en resterende workshops
- [x] Samenvatting maken voor Workshop 1 (50% van werkboek)
- [x] Samenvatting maken voor Workshop 2 (50% van werkboek)
- [x] Samenvatting maken voor Workshop 3 (50% van werkboek)
- [x] Samenvatting maken voor Workshop 4 (50% van werkboek)
- [x] Samenvatting maken voor Workshop 5 (50% van werkboek)
- [x] Samenvatting maken voor Workshop 6 (50% van werkboek)
- [x] Samenvatting toevoegen aan Workshop 1 pagina
- [x] Samenvatting toevoegen aan Workshop 2 pagina
- [x] Workshop 3 pagina maken met alle functionaliteit
- [x] Workshop 4 pagina maken met alle functionaliteit
- [x] Workshop 5 pagina maken met alle functionaliteit
- [x] Workshop 6 pagina maken met alle functionaliteit

## Fase 8: Routing problemen oplossen
- [x] Fix 404 errors bij navigatie naar workshops
- [x] Controleer alle routes in App.tsx
- [x] Test alle workshop links

## Fase 9: Workshops 3-6 beschikbaar maken
- [x] Update Home.tsx - zet available status naar true voor workshops 3-6
- [x] Test toegang tot alle workshops

## Fase 10: Fix React ref warning in AIHelper
- [x] Fix DialogTrigger in AIHelper component met asChild prop
- [x] Test AIHelper functionaliteit

## Fase 11: Fix Button component forwardRef
- [x] Update Button component om React.forwardRef te gebruiken
- [x] Test AIHelper zonder warnings

## Fase 12: AI Begeleider Feedback Mechanisme
- [x] Voeg duim-omhoog/omlaag iconen toe aan AI antwoorden
- [x] Implementeer feedback state tracking
- [x] Sla feedback op in localStorage
- [x] Visuele feedback wanneer gebruiker feedback geeft

## Fase 13: Fix Workshop 3 DownloadButtons fout
- [x] Controleer Workshop 3 props voor DownloadButtons
- [x] Fix undefined questions prop
- [x] Test Workshop 3 pagina

## Fase 14: Alle workshops zichtbaar maken op homepage
- [x] Controleer huidige weergave van workshops op homepage
- [x] Zorg dat alle 6 workshops prominent zichtbaar zijn
- [x] Test homepage layout

## Fase 15: Samenvattingen toevoegen aan werkboekopdrachten
- [x] Lees werkboek "Wie we zijn" om opdrachten te begrijpen
- [x] Voeg samenvattingen toe aan werkboekopdrachten in Workshop 1
- [x] Voeg samenvattingen toe aan werkboekopdrachten in Workshop 2
- [x] Voeg samenvattingen toe aan werkboekopdrachten in Workshop 3
- [x] Voeg samenvattingen toe aan werkboekopdrachten in Workshop 4
- [x] Voeg samenvattingen toe aan werkboekopdrachten in Workshop 5
- [x] Voeg samenvattingen toe aan werkboekopdrachten in Workshop 6
- [x] Test alle workshops

## Fase 16: Navigatiemenu uitbreiden
- [x] Voeg workshops 3-6 toe aan de navigatiebalk zodat alle workshops toegankelijk zijn via het hoofdmenu
- [x] Test navigatie naar alle workshops

## Fase 17: Hartspraak branding en contactinformatie
- [x] Kopieer Hartspraak logo's naar client/public folder
- [x] Voeg Hartspraak logo toe aan navigatiebalk
- [x] Maak footer component met logo, contactinformatie en link naar www.hartspraak.com
- [x] Test logo's en links op alle pagina's

## Fase 18: Google Maps integratie
- [x] Voeg interactieve Google Maps kaart toe aan footer met locatie Merkurstrasse 18, 44329 Dortmund
- [x] Test de kaart op verschillende schermformaten

## Fase 19: Rolbeschrijvingen in footer
- [x] Update footer om Martien Janssen als oprichter en Lonneke van Houten als co-therapeute te tonen
- [x] Test de nieuwe rolbeschrijvingen

## Fase 20: Workshop 5 volledige update met Jane's verhaal
- [x] Lees huidige Workshop 5 structuur
- [x] Vervang Workshop 5 inhoud met alle nieuwe content uit Workshop5jane.docx
- [x] Voeg Jane's verhaal toe met video link
- [x] Voeg alle huiswerkopdrachten toe (autonomie, drie waarnemingsposities, brief aan schaduwkind, taal van je lichaam)
- [x] Test Workshop 5 met alle nieuwe content

## Fase 21: Workshop 5 uitgebreide inleiding
- [x] Voeg uitgebreide inleiding toe aan Workshop 5 (ongeveer 50% van originele document)
- [x] Test de nieuwe inleiding in de browser

## Fase 22: Verwijder dag titels uit Workshop 5
- [x] Verwijder "DAG 1" en "DAG 2" titels uit Workshop 5 voor meer flexibiliteit
- [x] Test Workshop 5 zonder dag structuur

## Fase 23: Uitbreiden drie kaarten in Workshop 5
- [x] Breid kaart 1 (Begrijpen) uit met concrete beschrijvingen en voorbeelden
- [x] Breid kaart 2 (Voelen) uit met concrete beschrijvingen en voorbeelden
- [x] Breid kaart 3 (Transformeren) uit met concrete beschrijvingen en voorbeelden
- [x] Test de uitgebreide kaarten in de browser

## Fase 24: Uitbreiden drie kaarten in Workshop 1
- [x] Lees huidige kaarten in Workshop 1 (Leeswerk, Reflectie, Verdieping)
- [x] Breid kaart 1 (Leeswerk) uit met concrete beschrijvingen en voorbeelden
- [x] Breid kaart 2 (Reflectie) uit met concrete beschrijvingen en voorbeelden
- [x] Breid kaart 3 (Verdieping) uit met concrete beschrijvingen en voorbeelden
- [x] Test de uitgebreide kaarten in de browser

## Fase 25: Drie kaarten toevoegen aan workshops 2, 3, 4 en 6
- [x] Voeg drie kaarten toe aan Workshop 2 met hechtingsfundament thema
- [x] Voeg drie kaarten toe aan Workshop 3 met eigenwaarde thema
- [x] Voeg drie kaarten toe aan Workshop 4 met emoties en angst thema
- [x] Voeg drie kaarten toe aan Workshop 6 met integratie thema
- [x] Test alle workshops in de browser

## Fase 26: Homepage titel en modern lettertype
- [x] Wijzig homepage titel naar "Welkom bij de reis naar jezelf - Bereid je voor op de workshops van Hartspraak"
- [x] Voeg modern lettertype toe (Noto Sans als modern alternatief)
- [x] Test de nieuwe titel en lettertype in de browser

## Fase 27: Heading lettertype naar Noto Sans
- [x] Wijzig alle headings (h1-h6) van Lora naar Noto Sans voor consistent modern lettertype
- [x] Test de nieuwe heading stijl in de browser

## Fase 28: Verwijder font-serif class uit titel
- [x] Verwijder font-serif class uit h1 titel in Home.tsx zodat Noto Sans wordt gebruikt
- [x] Test de titel in de browser om Noto Sans te bevestigen

## Fase 29: Verbeter titel hiërarchie met kleinere ondertitel
- [x] Splits de titel in twee delen: hoofdtitel en kleinere ondertitel
- [x] Maak "Bereid je voor op de workshops van Hartspraak" kleiner en lichter
- [x] Test de nieuwe titel hiërarchie in de browser

## Fase 30: Call-to-action knop toevoegen
- [x] Voeg CTA knop toe onder de ondertitel die naar workshops sectie scrollt
- [x] Gebruik aantrekkelijke tekst zoals "Verken de workshops"
- [x] Test de knop functionaliteit in de browser

## Fase 31: Externe links naar Hartspraak website toevoegen aan workshops
- [x] Voeg "Meer info" knoppen toe aan elke workshop card
- [x] Link workshop 1 naar https://www.hartspraak.com/blank-5
- [x] Link workshop 2 naar https://www.hartspraak.com/blank-5-1
- [x] Link workshop 3 naar https://www.hartspraak.com/blank-5-2
- [x] Link workshop 4 naar https://www.hartspraak.com/blank-5-1-1
- [x] Link workshop 5 naar https://www.hartspraak.com/blank-5-2-1
- [x] Link workshop 6 naar https://www.hartspraak.com/workshop-6
- [x] Test alle externe links in de browser

## Fase 32: Verwijder alle resterende font-serif classes
- [x] Zoek naar alle font-serif classes in de website (31 gevonden)
- [x] Verwijder font-serif uit workshop titels en andere secties
- [x] Test alle pagina's om Noto Sans te bevestigen

## Fase 33: Zorg dat alle drie kaarten horizontaal naast elkaar staan
- [x] Controleer kaarten layout in alle workshops (alle correct met grid md:grid-cols-3)
- [x] Pas grid layout aan waar nodig (niet nodig, al correct)
- [x] Test alle workshops om horizontale layout te bevestigen (desktop: naast elkaar, mobiel: onder elkaar)

## Fase 34: Referenties sectie toevoegen aan homepage
- [x] Kopieer HoldingHeartStone.mp4 video naar client/public folder
- [x] Maak referenties sectie met video achtergrond
- [x] Voeg link toe naar https://www.hartspraak.com/blank-8
- [x] Test de referenties sectie en video

## Fase 35: Maak interne referenties pagina
- [x] Bezoek https://www.hartspraak.com/blank-8 om content te verzamelen
- [x] Maak Referenties.tsx pagina component met verzamelde content (2 testimonials)
- [x] Voeg /referenties route toe aan App.tsx
- [x] Update homepage link om naar interne /referenties pagina te linken
- [x] Test de nieuwe referenties pagina

## Fase 36: Voeg notitie toe voor meer referenties
- [x] Voeg notitie toe aan Referenties.tsx die verwijst naar volledige collectie op Hartspraak.com
- [x] Test de referenties pagina met notitie

## Fase 37: Voeg alle referenties toe uit referentieshartspraak.docx
- [x] Lees volledig referentieshartspraak.docx document (12 pagina's)
- [x] Extraheer alle testimonials met namen, datums en content
- [x] Update Referenties.tsx met alle testimonials (vervang huidige 2 testimonials)
- [x] Voeg 5-sterren rating toe aan elke testimonial
- [x] Test de bijgewerkte referenties pagina
- [x] Maak final checkpoint

## Fase 38: Visuele samenvatting van testimonial thema's
- [x] Analyseer alle 18 testimonials om kernthema's te identificeren
- [x] Ontwerp visueel aantrekkelijke infographic sectie met iconen
- [x] Implementeer thema samenvatting op Referenties pagina
- [x] Test de nieuwe sectie in de browser
- [x] Maak checkpoint met thema samenvatting

## Fase 39: Testimonial formulier toevoegen
- [x] Ontwerp "Deel uw ervaring" knop en formulier sectie
- [x] Implementeer formulier met velden (naam, email, titel, verhaal)
- [x] Voeg form validatie toe
- [x] Voeg success/error feedback toe
- [x] Test het formulier in de browser
- [x] Maak checkpoint met testimonial formulier

## Fase 40: Email integratie voor testimonial formulier
- [x] Upgrade project naar web-db-user template
- [x] Installeer Resend email package
- [x] Creëer API endpoint voor testimonial submission
- [x] Implementeer email verzending via Resend
- [x] Update frontend formulier om API endpoint aan te roepen
- [x] Configureer email template voor testimonial notifications
- [x] Test email verzending
- [x] Maak checkpoint met email integratie

## Fase 41: Interactieve kaart met testimonial locaties
- [x] Analyseer testimonials om locaties te extraheren
- [x] Installeer kaart library (react-simple-maps of leaflet)
- [x] Creëer kaart component met markers voor elke locatie
- [x] Voeg tooltips toe met aantal testimonials per locatie
- [x] Integreer kaart in Referenties pagina
- [x] Test interactiviteit en responsive design
- [x] Maak checkpoint met interactieve kaart

## Fase 42: Member Authentication System
- [x] Design database schema (verified_members, users, admins)
- [x] Create database migrations
- [x] Implement member registration (email verification against verified_members)
- [x] Implement member login/logout
- [x] Implement password reset via email (no-reply@hartspraak.com)
- [x] Add password validation (8 chars, upper, lower, number, special)
- [x] Create admin login (separate from member login)
- [x] Create admin dashboard for member management
- [x] Add ability to add/remove verified members
- [x] Add ability to enable/disable user accounts
- [x] Implement page protection middleware (all pages require login)
- [x] Add member account settings (delete own data)
- [x] Test complete authentication flow
- [x] Create checkpoint with authentication system

## Fase 43: Fix nested anchor tag errors
- [x] Fix nested <a> tags in Login.tsx (Link components already render <a>)
- [x] Fix nested <a> tags in Register.tsx
- [x] Test login and register pages
- [x] Create checkpoint

## Fase 44: Password Reset Functionality
- [x] Create ForgotPassword.tsx page
- [x] Create ResetPassword.tsx page
- [x] Update email template for password reset
- [x] Add routes for /forgot-password and /reset-password
- [x] Test complete password reset flow
- [x] Create checkpoint

## Fase 45: Fix password reset email delivery issue
- [x] Check server logs for email errors
- [x] Verify Resend API configuration
- [x] Test email sending with proper from address
- [x] Verify email delivery to user
- [x] Fix password validation regex mismatch between frontend and backend
- [x] Fix reset URL to use public URL instead of localhost
- [x] Remove Resend click tracking to avoid HTTPS errors
- [x] Add info@hartspraak.com to verified members
- [x] Test complete registration and password reset flow
- [x] Create checkpoint

## Fase 46: Password visibility toggle
- [x] Add eye icon toggle to Login.tsx password field
- [x] Add eye icon toggle to Register.tsx password fields
- [x] Add eye icon toggle to ResetPassword.tsx password fields
- [x] Add eye icon toggle to AdminLogin.tsx password field
- [x] Test password reveal on all pages
- [x] Create checkpoint

## Fase 47: Book Download Section
- [x] Create download section design on homepage
- [x] Add book cards for "Wie we zijn" and "Werkboek wie we zijn"
- [x] Show preview to user
- [x] Upload PDF files from user
- [x] Integrate PDF files into download section
- [x] Test download functionality
- [x] Create checkpoint

## Fase 48: Vertaal authenticatie pagina's naar Nederlands
- [ ] Vertaal Login.tsx naar Nederlands
- [ ] Vertaal Register.tsx naar Nederlands
- [ ] Vertaal ForgotPassword.tsx naar Nederlands
- [ ] Vertaal ResetPassword.tsx naar Nederlands
- [ ] Vertaal AdminLogin.tsx naar Nederlands
- [ ] Test alle pagina's
- [ ] Maak checkpoint


## Fase 60: Server-side Opslag met Client-side Encryptie

### Database Schema
- [ ] Maak user_answers tabel met encryption velden
- [ ] Maak ai_conversations tabel met encryption velden
- [ ] Maak ai_usage_logs tabel voor kosten tracking
- [ ] Run database migratie (pnpm db:push)

### Encryptie Library
- [ ] Installeer crypto-js package
- [ ] Maak encryption utility functies (encrypt/decrypt)
- [ ] Maak key management systeem (server-managed keys)
- [ ] Test encryptie/decryptie flow

### Backend API
- [ ] POST /api/answers/:workshopId/:questionId (save encrypted)
- [ ] GET /api/answers/:workshopId/:questionId (return encrypted)
- [ ] POST /api/ai-conversations/:workshopId/:questionId
- [ ] GET /api/ai-conversations/:workshopId/:questionId
- [ ] POST /api/ai-usage-logs (log AI calls)
- [ ] GET /api/admin/usage-stats (metadata only)

### Frontend Components
- [ ] Update AnswerField: encrypt before save, decrypt after load
- [ ] Update AIHelper: encrypt conversations, decrypt on load
- [ ] Add encryption key management in auth context
- [ ] Migrate existing localStorage data to server
- [ ] Add "Gesynchroniseerd ✓" feedback

### Admin Dashboard
- [ ] Create /admin/usage pagina
- [ ] Toon metadata per gebruiker (geen inhoud)
- [ ] Export CSV met statistieken
- [ ] Privacy statement toevoegen

### Testing & Deployment
- [ ] Test encryptie/decryptie flow
- [ ] Test multi-device sync
- [ ] Test migratie van localStorage
- [ ] Verify admin kan geen inhoud zien
- [ ] Save checkpoint


## Fase 61: Fix AI Helper API 500 Error
- [x] Check server logs for exact error
- [x] Verify Forge API credentials
- [x] Test Forge API call manually
- [x] Fix AI Helper route (added /v1/chat/completions endpoint)
- [x] Test AI Helper functionality (WERKT!)
- [ ] Add AIHelper component to all workshop pages (2-6)
- [ ] Test complete server-side storage functionality
- [ ] Save checkpoint

## Fase 51: Fix AIHelper visibility issue
- [x] Remove the `if (messages.length === 0) return null;` check from AIHelper component
- [x] Ensure AIHelper shows initial input section even when no conversation exists
- [x] Test that AIHelper appears at all questions in all workshops
- [x] Verify users can start conversations from any question

## Fase 52: Add sync confirmation to AIHelper
- [x] Add sync status state to AIHelper component
- [x] Show "Conversatie opgeslagen ✓" when successfully synced to server
- [x] Show error message if sync fails
- [x] Add visual feedback similar to AnswerField
- [x] Test sync confirmation in browser

## Fase 53: Build Admin Dashboard for Metadata Viewing
- [x] Create /admin/usage page component
- [x] Add route for /admin/usage in App.tsx
- [x] Create API endpoint GET /api/admin/usage-stats
- [x] Display user statistics (email, answer count, AI conversation count, last activity)
- [x] Add CSV export functionality
- [x] Show total AI usage costs
- [x] Add privacy statement explaining what admins can/cannot see
- [ ] Test admin dashboard in browser
- [ ] Verify admins cannot see encrypted content

## Fase 54: Fix Decryption Errors (Backwards Compatibility)
- [x] Add fallback in AIHelper to handle unencrypted localStorage data
- [x] Add fallback in AnswerField to handle unencrypted localStorage data
- [x] Test with existing localStorage data (should not throw errors)
- [x] Verify encrypted data still works correctly
- [x] Test migration path: unencrypted → encrypted

## Fase 55: Fix Remaining Decryption Console Errors
- [x] Move try-catch into decryptData function itself
- [x] Return null on decryption failure instead of throwing
- [x] Update AIHelper and AnswerField to handle null return value
- [x] Test that console errors are gone

## Fase 56: Data Migration (localStorage → Server)
- [x] Create migration utility to detect localStorage data
- [x] Implement automatic migration on first load after encryption feature
- [x] Migrate user answers from localStorage to server with encryption
- [x] Migrate AI conversations from localStorage to server with encryption
- [x] Add migration status indicator for users
- [x] Clear localStorage after successful migration
- [ ] Test migration with existing localStorage data

## Fase 57: Privacy Statement
- [x] Create privacy policy page explaining encryption
- [x] Add privacy link to footer
- [x] Document what admins can/cannot see
- [x] Add route for /privacy page
- [x] Create FAQ about data privacy

## Fase 58: Final Testing and Finalization
- [x] Test all workshops with answers and AI conversations
- [x] Test privacy page loads correctly
- [x] Verify encryption works end-to-end
- [x] Verify no console errors
- [x] Test login and navigation
- [ ] Test admin dashboard with real data
- [ ] Test data migration with localStorage
- [ ] Create final checkpoint

## Fase 59: Remove Migration Code and Cleanup
- [x] Remove DataMigration component from App.tsx
- [x] Delete DataMigration.tsx file
- [x] Add localStorage cleanup utility
- [x] Clear old localStorage keys (answer_*, ai_conversation_*)
- [x] Test that app still works without migration code
- [ ] Create final checkpoint

## Fase 60: Add Prominent Privacy Indicators
- [x] Add privacy notice to login page with link
- [x] Add privacy notice to register page with link
- [x] Add security badge to home page
- [ ] Add privacy indicator to workshop pages (near answer fields)
- [ ] Test all privacy indicators
- [ ] Create checkpoint

## Fase 61: Update Privacy Messages with Cross-Device Benefit
- [x] Update login page privacy notice to mention cross-device access
- [x] Update register page privacy notice to mention cross-device access
- [x] Update privacy page to explain cloud storage benefit
- [ ] Test updated messages

## Fase 62: Comprehensive Testing and Finalization
- [x] Test login flow with privacy notice
- [ ] Test register flow with privacy notice
- [x] Test home page security badge
- [x] Test workshop pages with answers and AI helper
- [x] Test privacy page content
- [ ] Test admin dashboard with real data
- [x] Verify no console errors
- [x] Test encryption/decryption works correctly
- [x] Test cross-device message visibility
- [ ] Create final checkpoint
- [ ] Create final backup zip

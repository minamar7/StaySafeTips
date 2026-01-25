# Stay Safe Premium

Stay Safe Premium είναι μια **πολυγλωσσική, PWA, interactive εφαρμογή ασφαλείας** που βοηθά τον χρήστη να βελτιώσει:

- την **ασφάλεια στο σπίτι**
- την **ψηφιακή / online ασφάλεια**
- την **ετοιμότητα σε κρίσιμες καταστάσεις**

Συνδυάζει **πρακτικά πρωτόκολλα**, **mini‑quizzes**, **σύστημα badges** και **premium εμπειρία** με offline λειτουργία και native‑app αίσθηση.

---

## ✨ Χαρακτηριστικά

- 🌍 **Πολυγλωσσική υποστήριξη**  
  Αγγλικά, Ελληνικά, Κινέζικα, Αραβικά, Ινδικά, Ιταλικά, Ισπανικά, Γαλλικά, Γερμανικά, Πορτογαλικά, Ολλανδικά, Σουηδικά, Νορβηγικά, Δανικά, Φινλανδικά, Πολωνικά, Ρουμανικά, Τουρκικά.

- 🧠 **Interactive περιεχόμενο ασφαλείας**  
  - Home Safety (ασφάλεια σπιτιού)  
  - Digital & Social Safety (ψηφιακή ασφάλεια)  
  - Real‑world scenarios & tips  

- 🧩 **Quiz Engine**  
  - 15 ερωτήσεις ανά γλώσσα  
  - Realistic σενάρια  
  - Correct/incorrect animations  
  - Αποθήκευση προόδου (localStorage)

- 🏅 **Badges System**  
  - Home Safety, Digital Safety, Scam Protection, Emergency Ready  
  - Night Guardian, Travel Guardian, Family Shield, Crisis Navigator  
  - Unlock animations & persistent state

- 📱 **PWA / App‑like εμπειρία**  
  - Installable σε Android / iOS / Desktop  
  - Offline λειτουργία  
  - Smart caching (static + dynamic, stale‑while‑revalidate)  
  - Custom Add‑to‑Home‑Screen banner

- 📊 **Analytics Layer (έτοιμο για σύνδεση)**  
  - Custom events (app_open, quiz_completed, paywall_open, κ.λπ.)  
  - Έτοιμο για σύνδεση με GA4 / Plausible / custom backend

- 💳 **Premium Paywall (Stripe‑ready)**  
  - Καθαρή, επαγγελματική paywall οθόνη  
  - CTA για Stripe Checkout  
  - Events για conversion tracking

- ☁️ **Cloud Sync Architecture (API layer)**  
  - Abstracted API (save/load progress)  
  - Έτοιμο για σύνδεση με Firebase / Supabase / custom backend

---

## 📁 Δομή Project

```text
stay-safe-premium/
  index.html
  styles.css
  app.js
  quiz.js
  i18n.js
  analytics.js
  api.js
  manifest.webmanifest
  service-worker.js
  .nojekyll
  /icons
    icon-192.png
    icon-512.png

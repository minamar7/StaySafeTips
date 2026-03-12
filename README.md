# Stay Safe Elite 🛡️
**Advanced Personal Security & Awareness Hybrid Application**

Stay Safe Elite is a comprehensive security tool designed to provide users with immediate emergency assistance, cybersecurity knowledge, and personal safety training. It combines a high-end web interface with native Android capabilities.

## 🚀 Live Demo
Access the web dashboard here: [https://minamar7.github.io/StaySafeTips/](https://minamar7.github.io/StaySafeTips/)

---

## ✨ Key Features

### 1. Dynamic Panic Button (SOS)
* **One-Tap SOS:** A pulsing high-visibility button for immediate activation.
* **Live Location Sharing:** Automatically fetches GPS coordinates and generates a Google Maps pin.
* **Smart SMS Integration:** Pre-fills emergency messages for trusted contacts or local authorities.

### 2. Global Emergency Hub (AI-Driven)
* **Country Detection:** Utilizes Android's Telephony Manager to detect the user's current country via SIM/Network.
* **Automatic Number Mapping:** Matches local emergency numbers (Police, Ambulance, Fire) using a local `emergency_data.json` database.
* **Native Calling:** Direct integration with the device dialer for zero-delay response.

### 3. Cyber Security & Safety Quizzes
* **Stay Safe Quiz:** Interactive assessments to test safety knowledge.
* **Elite Leveling System:** Users can progress from "Novice" to "Security Elite" status.
* **Instant Feedback:** Educational explanations for every answer to improve user awareness.

### 4. Safety Hub & Martial Arts Wisdom
* **Dojo Integration:** Practical safety tips inspired by martial arts (Tang Soo Do) principles.
* **Resource Library:** Guidelines for physical safety, cybersecurity best practices, and emergency protocols.

---

## 🛠️ Technical Stack

* **Frontend:** HTML5, CSS3 (Modern UI/UX with glassmorphism), JavaScript (ES6).
* **Backend/Native:** Kotlin (Android Studio Integration).
* **Data Structure:** JSON-based local database for offline emergency number access.
* **APIs:** Geolocation API, Android Telephony & Intent Systems.

---

## 📂 File Structure & Roles

| File | Role |
| :--- | :--- |
| `index.html` | The main dashboard and user interface. |
| `panic.html` | The interactive SOS activation screen. |
| `quiz.html` | The Cyber Security & Safety awareness engine. |
| `MainActivity.kt` | The Android "Brain" handling GPS, SIM detection, and native calls. |
| `emergency_data.json` | Local database containing global emergency numbers. |

---

## 📲 Installation for Developers

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/minamar7/StaySafeTips.git](https://github.com/minamar7/StaySafeTips.git)
    ```
2.  **Android Integration:**
    * Place `MainActivity.kt` in your `java/com/staysafe/elite/` folder.
    * Place `emergency_data.json` in the `app/src/main/assets/` folder.
    * Add `READ_PHONE_STATE` and `ACCESS_FINE_LOCATION` permissions to your `AndroidManifest.xml`.

---

## 🛡️ Mission
"Stay Safe Elite" aims to empower individuals with the tools and knowledge needed to stay safe in both the physical and digital worlds.

**Developed by [minamar7](https://github.com/minamar7)**

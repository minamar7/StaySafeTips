/**
 * Stay Safe Premium - Advanced Analytics Engine
 * Παρακολουθεί τη συμπεριφορά του χρήστη για τη βελτίωση της εφαρμογής.
 */

const Analytics = {
  // Ρυθμίσεις
  config: {
    enabled: true,
    debug: false, // Βάλτο true για να βλέπεις τα logs στην κονσόλα
    persistLocally: true // Αποθήκευση στο localStorage για offline ανάλυση
  },

  /**
   * Κύρια συνάρτηση καταγραφής event
   * @param {string} eventName - Το όνομα του event (π.χ. 'quiz_completed')
   * @param {Object} data - Επιπλέον πληροφορίες (π.χ. { score: 80 })
   */
  track(eventName, data = {}) {
    if (!this.config.enabled) return;

    const payload = {
      event: eventName,
      properties: {
        ...data,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        language: localStorage.getItem("ss_lang") || "en",
        isPremium: localStorage.getItem("ss_premium") === "true",
        screenResolution: `${window.screen.width}x${window.screen.height}`
      },
      timestamp: new Date().toISOString(),
      sessionId: this._getSessionId()
    };

    // 1. Debug Log (αν είναι ενεργό)
    if (this.config.debug) {
      console.log(`%c[Analytics] ${eventName}`, "color: #22c55e; font-weight: bold;", payload);
    }

    // 2. Local Persistence (Queue για offline λειτουργία)
    if (this.config.persistLocally) {
      this._pushToLocalQueue(payload);
    }

    // 3. Εδώ γίνεται η αποστολή σε εξωτερική υπηρεσία
    this._sendToProvider(payload);
  },

  /**
   * Αποστολή δεδομένων (Placeholder για GA4, Plausible, ή Custom Backend)
   */
  _sendToProvider(payload) {
    // Παράδειγμα για fetch σε δικό σου API:
    /*
    fetch('https://your-api.com/collect', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true // Σημαντικό για να ολοκληρώνεται το request ακόμα και αν κλείσει η σελίδα
    });
    */
  },

  /**
   * Διαχείριση Session ID για να ξέρουμε αν τα events ανήκουν στον ίδιο χρήστη
   */
  _getSessionId() {
    let sid = sessionStorage.getItem("ss_session_id");
    if (!sid) {
      sid = "sess_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("ss_session_id", sid);
    }
    return sid;
  },

  /**
   * Αποθήκευση των events στο localStorage (Queue)
   */
  _pushToLocalQueue(payload) {
    try {
      const queue = JSON.parse(localStorage.getItem("ss_analytics_queue") || "[]");
      queue.push(payload);
      // Κρατάμε μόνο τα τελευταία 50 events για να μην γεμίσει η μνήμη
      if (queue.length > 50) queue.shift();
      localStorage.setItem("ss_analytics_queue", JSON.stringify(queue));
    } catch (e) {
      console.error("Analytics Storage Error", e);
    }
  },

  /**
   * Μέθοδος για να καθαρίσει η ουρά (π.χ. μετά από επιτυχημένο sync)
   */
  clearQueue() {
    localStorage.removeItem("ss_analytics_queue");
  }
};

// Αυτόματη καταγραφή όταν ανοίγει η εφαρμογή
Analytics.track("app_session_start");

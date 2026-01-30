/**
 * Stay Safe Premium - Production API Bridge
 * Διαχειρίζεται το συγχρονισμό δεδομένων μεταξύ τοπικής μνήμης και Cloud.
 */

const API = {
  // CONFIGURATION
  config: {
    baseUrl: "https://your-backend-api.com/v1", // Αντικατάστησέ το με το κανονικό σου URL
    timeout: 8000, // 8 δευτερόλεπτα μέχρι να ακυρωθεί η κλήση
    headers: {
      "Content-Type": "application/json",
      "X-App-Version": "1.0.0"
    }
  },

  /**
   * Αποθήκευση προόδου (Score, Badges, Settings)
   */
  async saveProgress(userId, data) {
    if (!userId) return { success: false, error: "No User ID provided" };

    const payload = {
      userId,
      ...data,
      lastUpdated: new Date().toISOString()
    };

    // 1. Πάντα αποθηκεύουμε τοπικά ως backup
    localStorage.setItem(`ss_backup_${userId}`, JSON.stringify(payload));

    try {
      const response = await this._fetchWithTimeout(`${this.config.baseUrl}/progress`, {
        method: "POST",
        headers: this.config.headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      return { success: true, data: await response.json() };
    } catch (error) {
      console.warn("[API] Save failed, data cached locally:", error.message);
      return { success: false, error: error.message, cached: true };
    }
  },

  /**
   * Φόρτωση προόδου από το Cloud
   */
  async loadProgress(userId) {
    if (!userId) return null;

    try {
      const response = await this._fetchWithTimeout(`${this.config.baseUrl}/progress?userId=${userId}`, {
        method: "GET",
        headers: this.config.headers
      });

      if (response.status === 404) return null; // Νέος χρήστης
      if (!response.ok) throw new Error("Server error");

      return await response.json();
    } catch (error) {
      console.error("[API] Load failed, falling back to local storage:", error.message);
      
      // Fallback: Επιστροφή των δεδομένων από το τοπικό backup
      const localData = localStorage.getItem(`ss_backup_${userId}`);
      return localData ? JSON.parse(localData) : null;
    }
  },

  /**
   * Helper: Fetch με χρονικό όριο (Timeout)
   * Αποτρέπει το "πάγωμα" της εφαρμογής σε κακή σύνδεση.
   */
  async _fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }
};

/**
 * Παράδειγμα χρήσης στο app.js:
 * * const result = await API.saveProgress("user_123", { 
 * badges: ["badge-home"], 
 * score: 90 
 * });
 * * if (result.success) console.log("Cloud Synced!");
 */

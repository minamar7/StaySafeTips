/**
 * Stay Safe Elite – Production API Bridge
 * Offline-First | Cloud Sync | App Store Safe
 */

const API = (() => {

  /* ==============================
     CONFIG
  ============================== */
  const CONFIG = {
    baseUrl: "https://your-backend-api.com/v1", // ⬅️ άλλαξέ το
    timeout: 8000,
    retries: 1,
    headers: {
      "Content-Type": "application/json",
      "X-App-Name": "StaySafeElite",
      "X-App-Version": "1.0.0"
    }
  };

  /* ==============================
     INTERNAL HELPERS
  ============================== */

  const _withTimeout = async (url, options = {}) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONFIG.timeout);

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  const _safeJSON = async (response) => {
    try {
      return await response.json();
    } catch {
      return null;
    }
  };

  const _backupKey = (userId) => `ss_backup_v1_${userId}`;

  const _saveLocal = (userId, data) => {
    localStorage.setItem(_backupKey(userId), JSON.stringify({
      ...data,
      _schema: 1,
      _savedAt: Date.now()
    }));
  };

  const _loadLocal = (userId) => {
    const raw = localStorage.getItem(_backupKey(userId));
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  /* ==============================
     PUBLIC API
  ============================== */

  const saveProgress = async (userId, payload = {}) => {
    if (!userId) return { success: false, error: "Missing userId" };

    const data = {
      userId,
      ...payload,
      updatedAt: new Date().toISOString()
    };

    // Always local backup
    _saveLocal(userId, data);

    try {
      const res = await _withTimeout(`${CONFIG.baseUrl}/progress`, {
        method: "POST",
        headers: CONFIG.headers,
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return {
        success: true,
        remote: await _safeJSON(res)
      };

    } catch (err) {
      console.warn("[API] Cloud save failed – cached locally");
      return {
        success: false,
        cached: true,
        error: err.message
      };
    }
  };

  const loadProgress = async (userId) => {
    if (!userId) return null;

    try {
      const res = await _withTimeout(
        `${CONFIG.baseUrl}/progress?userId=${encodeURIComponent(userId)}`,
        { headers: CONFIG.headers }
      );

      if (res.status === 404) return _loadLocal(userId);
      if (!res.ok) throw new Error("Server error");

      const data = await _safeJSON(res);
      if (data) _saveLocal(userId, data);

      return data;

    } catch {
      console.warn("[API] Using offline backup");
      return _loadLocal(userId);
    }
  };

  return {
    saveProgress,
    loadProgress
  };

})();

/* ==================================
   APP BOOTSTRAP – ONBOARDING
================================== */

(() => {
  const startBtn = document.getElementById("onboarding-start");
  if (!startBtn) return;

  startBtn.addEventListener("click", () => {
    if (navigator.vibrate) navigator.vibrate(15);

    document.getElementById("onboarding")?.classList.add("hidden");
    document.querySelector(".app-shell")?.classList.remove("hidden");

    localStorage.setItem("ss_onboarding_done", "true");
    console.log("[APP] Onboarding completed");
  });
})();
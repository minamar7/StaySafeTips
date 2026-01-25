const API = {
  async saveProgress(userId, data) {
    // placeholder – όταν έχεις backend, βάζεις URL
    return fetch("https://your-backend/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...data })
    });
  },

  async loadProgress(userId) {
    const res = await fetch(`https://your-backend/progress?userId=${userId}`);
    if (!res.ok) return null;
    return res.json();
  }
};

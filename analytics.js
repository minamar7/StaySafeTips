const Analytics = {
  track(event, data = {}) {
    const payload = {
      event,
      data,
      ts: Date.now()
    };
    console.log("[Analytics]", payload);
    // εδώ μπορείς να στείλεις σε backend / GA / Plausible
  }
};

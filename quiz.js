window.launchQuiz = (badgeId) => {
  // Παίρνει τη γλώσσα από το dropdown του index.html
  const lang = document.getElementById("lang-select").value;
  
  // Αλλάζει την οθόνη σε quiz
  const quizTab = document.querySelector('[data-target="quiz"]');
  if (quizTab) quizTab.click();

  // Ξεκινάει τη μηχανή
  if (window.QuizEngine) {
    window.QuizEngine.start(lang, badgeId);
  }
};

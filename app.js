document.addEventListener("DOMContentLoaded", () => {
    console.log("App.js: Initializing Shield...");

    // 1. SELECTORS
    const tabs = document.querySelectorAll(".nav-tab");
    const screens = document.querySelectorAll(".app-screen");
    const onboarding = document.getElementById("onboarding");
    const appShell = document.querySelector(".app-shell");
    const startBtn = document.getElementById("onboarding-start");

    // 2. SAFE NAVIGATION (Το μενού σου)
    function switchTab(targetId) {
        console.log("Switching to:", targetId);
        
        // Ενημέρωση Tabs
        tabs.forEach(t => t.classList.remove("active"));
        const activeTab = document.querySelector(`[data-target="${targetId}"]`);
        if (activeTab) activeTab.classList.add("active");

        // Ενημέρωση Οθονών
        screens.forEach(s => {
            s.classList.remove("active");
            if (s.id === `screen-${targetId}`) {
                s.classList.add("active");
            }
        });
        
        window.scrollTo(0, 0);
    }

    // Προσθήκη Event Listeners στα Tabs
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-target");
            switchTab(target);
        });
    });

    // 3. ONBOARDING LOGIC
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            onboarding.style.display = "none";
            appShell.classList.remove("hidden");
            localStorage.setItem("ss_onboarding_done", "true");
        });
    }

    // Έλεγχος αν έχει ξαναμπει
    if (localStorage.getItem("ss_onboarding_done") === "true") {
        if (onboarding) onboarding.style.display = "none";
        if (appShell) appShell.classList.remove("hidden");
    }

    // 4. QUIZ BRIDGE (Εδώ είναι το "κλειδί" για το Quiz)
    window.launchQuiz = (badgeId) => {
        switchTab("quiz"); // Πρώτα άλλαξε οθόνη
        
        if (window.QuizEngine && typeof window.QuizEngine.start === 'function') {
            setTimeout(() => {
                window.QuizEngine.start('el', { badgeId: badgeId });
            }, 300);
        } else {
            console.error("QuizEngine missing! Check if quiz.js is loaded.");
            alert("Το Quiz δεν είναι έτοιμο ακόμα.");
        }
    };

    document.getElementById("home-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-home"));
    document.getElementById("digital-quiz-btn")?.addEventListener("click", () => window.launchQuiz("badge-digital"));

    console.log("App.js: Navigation Ready.");
});

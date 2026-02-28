const config = window.SeasonalsPluginConfig?.StarWars || {};
const starwars = config.EnableStarWars !== undefined ? config.EnableStarWars : true; // enable/disable starwars

let msgPrinted = false;

function toggleStarWars() {
    const container = document.querySelector('.starwars-container');
    if (!container) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        container.style.display = 'none';
        if (!msgPrinted) {
            console.log('StarWars hidden');
            msgPrinted = true;
        }
    } else {
        container.style.display = 'block';
        if (msgPrinted) {
            console.log('StarWars visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleStarWars);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createStarWars(container) {
    const center = document.createElement('div');
    center.className = 'starwars-center';
    container.appendChild(center);

    // Create hyperspace streaks
    for (let i = 0; i < 60; i++) {
        const streak = document.createElement('div');
        streak.className = 'starwars-streak';
        
        // Random angle to radiate outward from center
        const angle = Math.random() * 360;
        streak.style.transform = `rotate(${angle}deg)`;
        
        // Random delay
        const delay = Math.random() * 2;
        streak.style.animationDelay = `${delay}s`;
        
        // Random animation duration for variety
        const duration = 0.8 + Math.random() * 1.5;
        streak.style.animationDuration = `${duration}s`;
        
        center.appendChild(streak);
    }
}

function initializeStarWars() {
    if (!starwars) return;

    const container = document.querySelector('.starwars-container') || document.createElement("div");

    if (!document.querySelector('.starwars-container')) {
        container.className = "starwars-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    createStarWars(container);
    toggleStarWars();
}

initializeStarWars();

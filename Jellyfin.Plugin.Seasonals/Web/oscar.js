const config = window.SeasonalsPluginConfig?.Oscar || {};
const oscar = config.EnableOscar !== undefined ? config.EnableOscar : true; // enable/disable oscar

let msgPrinted = false;

function toggleOscar() {
    const container = document.querySelector('.oscar-container');
    if (!container) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        container.style.display = 'none';
        if (!msgPrinted) {
            console.log('Oscar hidden');
            msgPrinted = true;
        }
    } else {
        container.style.display = 'block';
        if (msgPrinted) {
            console.log('Oscar visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleOscar);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createOscar(container) {
    // Red carpet floor
    const carpet = document.createElement('div');
    carpet.className = 'oscar-carpet';

    // Spotlights
    const spotlights = document.createElement('div');
    spotlights.className = 'oscar-spotlights';
    
    for (let i = 0; i < 3; i++) {
        const spot = document.createElement('div');
        spot.className = 'oscar-spotlight';
        spot.style.animationDelay = `-${Math.random() * 8}s`;
        spot.style.left = `${20 + (i * 30)}%`;
        spot.style.top = `${-5 - Math.random() * 15}vh`; // randomize top origin
        spotlights.appendChild(spot);
    }

    container.appendChild(carpet);
    container.appendChild(spotlights);
    
    function flashLoop() {
        if (!document.body.contains(container)) return; // Kill the loop if container is removed
        if (container.style.display === 'none') {
            setTimeout(flashLoop, 1000); // Check again later if hidden
            return;
        }
        const flash = document.createElement('div');
        flash.className = 'oscar-flash';
        flash.style.left = `${Math.random() * 100}%`;
        flash.style.top = `${Math.random() * 100}%`;
        container.appendChild(flash);
        setTimeout(() => flash.remove(), 200);
        
        // Randomize next flash between 200ms and 1500ms
        const nextDelay = Math.random() * 1300 + 200;
        setTimeout(flashLoop, nextDelay);
    }
    flashLoop();
}

function initializeOscar() {
    if (!oscar) return;

    const container = document.querySelector('.oscar-container') || document.createElement("div");

    if (!document.querySelector('.oscar-container')) {
        container.className = "oscar-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    createOscar(container);
    toggleOscar();
}

initializeOscar();

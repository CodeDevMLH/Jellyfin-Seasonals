const config = window.SeasonalsPluginConfig?.NightSky || {};

const nightsky = config.EnableNightSky !== undefined ? config.EnableNightSky : true; // enable/disable nightsky

let nightskyMsgPrinted = false;

function toggleNightSky() {
  const container = document.querySelector('.nightsky-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer:not(.hide)');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer:not(.hide)');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const isPreferences = window.location.href.includes('mypreferences') || !!document.querySelector('#myPreferencesMenuPage');

  if (videoPlayer || trailerPlayer || isDashboard || isPreferences) {
    container.style.display = 'none';
    if (!nightskyMsgPrinted) {
      console.log('🎉 Seasonals: NightSky hidden');
      nightskyMsgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (nightskyMsgPrinted) {
      console.log('🎉 Seasonals: NightSky visible');
      nightskyMsgPrinted = false;
    }
  }
}

const nightskyObserver = new MutationObserver(toggleNightSky);
nightskyObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createNightSky() {
    const container = document.querySelector('.nightsky-container') || document.createElement('div');

    if (!document.querySelector('.nightsky-container')) {
        container.className = 'nightsky-container';
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

    // Add Nebula Glow
    const bgGlow = document.createElement('div');
    bgGlow.className = 'nightsky-bg-glow';
    container.appendChild(bgGlow);

    // Add CSS Starfield
    const starfield = document.createElement('div');
    starfield.className = 'nightsky-starfield';
    let boxShadows1 = [];
    let boxShadows2 = [];
    let boxShadows3 = [];
    
    // Generate random stars for parallax starfield using CSS % / vw sizes for responsiveness
    for (let i = 0; i < 150; i++) {
        let x = (Math.random() * 100).toFixed(2);
        let y = (Math.random() * 100).toFixed(2);
        boxShadows1.push(`${x}vw ${y}vh #FFF`);
        boxShadows1.push(`${x}vw ${(parseFloat(y) + 100).toFixed(2)}vh #FFF`);
    }
    for (let i = 0; i < 50; i++) {
        let x = (Math.random() * 100).toFixed(2);
        let y = (Math.random() * 100).toFixed(2);
        boxShadows2.push(`${x}vw ${y}vh #FFF`);
        boxShadows2.push(`${x}vw ${(parseFloat(y) + 100).toFixed(2)}vh #FFF`);
    }
    for (let i = 0; i < 20; i++) {
        let x = (Math.random() * 100).toFixed(2);
        let y = (Math.random() * 100).toFixed(2);
        boxShadows3.push(`${x}vw ${y}vh #FFF`);
        boxShadows3.push(`${x}vw ${(parseFloat(y) + 100).toFixed(2)}vh #FFF`);
    }

    const starLayer1 = document.createElement('div');
    starLayer1.style.width = '1px'; starLayer1.style.height = '1px';
    starLayer1.style.background = 'transparent';
    starLayer1.style.borderRadius = '50%';
    starLayer1.style.boxShadow = boxShadows1.join(", ");
    starLayer1.style.animation = 'nightsky-star-drift 200s linear infinite';
    starfield.appendChild(starLayer1);

    const starLayer2 = document.createElement('div');
    starLayer2.style.width = '2px'; starLayer2.style.height = '2px';
    starLayer2.style.background = 'transparent';
    starLayer2.style.borderRadius = '50%';
    starLayer2.style.boxShadow = boxShadows2.join(", ");
    starLayer2.style.animation = 'nightsky-star-drift 150s linear infinite';
    starfield.appendChild(starLayer2);

    const starLayer3 = document.createElement('div');
    starLayer3.style.width = '3px'; starLayer3.style.height = '3px';
    starLayer3.style.background = 'transparent';
    starLayer3.style.borderRadius = '50%';
    starLayer3.style.boxShadow = boxShadows3.join(", ");
    starLayer3.style.animation = 'nightsky-star-drift 100s linear infinite';
    starfield.appendChild(starLayer3);
    
    container.appendChild(starfield);

    // Shooting stars
    function spawnShootingStar(streak) {
        // Random falling direction (15deg to 165deg, downwards)
        const angle = Math.random() * 150 + 15;
        streak.style.setProperty('--shoot-angle', `${angle}deg`);
        
        // Start anywhere on screen
        streak.style.left = `${Math.random() * 100}vw`;
        streak.style.top = `${Math.random() * 100}vh`;
        
        // Travel shorter distance so they start and end visually on-screen
        const distance = Math.random() * 40 + 20; // 20vw to 60vw
        streak.style.setProperty('--shoot-distance', `${distance}vw`);
        
        // Mathematically tie the width to exactly 25% of the flight distance.
        const width = distance * 0.25; 
        streak.style.width = `${width}vw`;

        streak.style.animation = 'none';
        void streak.offsetWidth; // force reflow
        
        // Wait a random amount of time before launching this star
        const delayMs = Math.random() * 15000 + 2000; // 2 to 17 seconds
        setTimeout(() => {
            if (!document.body.contains(streak)) return; // cleanup safety
            const flightTime = Math.random() * 2.5 + 2.0; // 2.0 to 4.5 seconds
            streak.style.animation = `nightsky-shoot ${flightTime}s linear forwards`;
        }, delayMs);
    }

    const shootingStarCount = isMobile ? 3 : 6; 
    for (let i = 0; i < shootingStarCount; i++) {
        const streak = document.createElement('div');
        streak.className = 'nightsky-shooting-star';
        streak.addEventListener('animationend', () => spawnShootingStar(streak));
        spawnShootingStar(streak);
        container.appendChild(streak);
    }
}

function initializeNightSky() {
  if (!nightsky) return;
  createNightSky();
  toggleNightSky();
}

initializeNightSky();

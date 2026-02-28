const config = window.SeasonalsPluginConfig?.Sports || {};

const sports = config.EnableSports !== undefined ? config.EnableSports : true; // enable/disable sports
const symbolCount = config.SymbolCount !== undefined ? config.SymbolCount : 5; // count of balls per category
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const enableTrophy = config.EnableTrophy !== undefined ? config.EnableTrophy : false; // enable/disable trophy
const rawSportsBalls = config.SportsBalls !== undefined ? config.SportsBalls : 'football,basketball,tennis,volleyball'; // set sports categories to spawn
const turfColorHex = config.TurfColor !== undefined ? config.TurfColor : '#228b22'; // color of turf
const confettiColors = config.ConfettiColors ? config.ConfettiColors.split(',') : ['#000000', '#FF0000', '#FFCC00']; // Add Country Colored confetti

// Pre-declare and manage image assets
// Credits: https://flaticon.com
const SPORTS_ASSETS = {
    badminton: ['badminton_1', 'badminton_2'],
    baseball: ['baseball_1', 'baseball_2'],
    basketball: ['basketball_1', 'basketball_2'],
    billiard: Array.from({length: 14}, (_, i) => `billiard_ball_${i + 1}`),
    bowling: ['bowling_1', 'bowling_2'],
    football: Array.from({length: 5}, (_, i) => `football_${i + 1}`),
    golf: ['golf_ball_1', 'golf_ball_2'],
    rugby: ['rugby_ball_1', 'rugby_ball_2'],
    table_tennis: ['table_tennis_ball_1', 'table_tennis_ball_2'],
    tennis: ['tennis_ball_1', 'tennis_ball_2'],
    volleyball: ['volleyball_1', 'volleyball_2'],
    waterball: ['waterball_1', 'waterball_2']
};


let msgPrinted = false;

function toggleSports() {
  const container = document.querySelector('.sports-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Sports hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Sports visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleSports);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createSports() {
    const container = document.querySelector('.sports-container') || document.createElement('div');

    if (!document.querySelector('.sports-container')) {
        container.className = 'sports-container';
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    // Create a turf/grass overlay at the bottom using the provided hex
    const turf = document.createElement('div');
    turf.className = 'sports-turf';
    // Using hex with transparency
    turf.style.background = `linear-gradient(180deg, transparent 0%, ${turfColorHex}4D 30%, ${turfColorHex}CC 100%)`;
    container.appendChild(turf);

    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    let ballsPerCategory = symbolCount;

    if (isMobile && !enableRandomMobile) {
        ballsPerCategory = Math.min(symbolCount, 3);
    }

    const useRandomDuration = enableDifferentDuration !== false;

    // Map standard sports balls to spawn based on category configuration
    const chosenCategories = rawSportsBalls.split(',').map(s => s.trim()).filter(s => s !== '');

    const createBall = (randomItem) => {
        let symbol = document.createElement('div');
        
        symbol.className = `sports-symbol sports-${randomItem}`;

        // Create inner div for spinning rotation
        let innerDiv = document.createElement('div');
        innerDiv.className = 'sports-inner';

        // Try load image
        let img = document.createElement('img');
        img.src = `../Seasonals/Resources/sport_assets/${randomItem}.png`;
        img.onerror = function() {
            symbol.remove();
        };
        innerDiv.appendChild(img);
        
        // Balls should bounce infinitely
        symbol.style.animationName = 'sports-bounce';
        symbol.style.animationIterationCount = 'infinite';
        innerDiv.style.animationName = 'sports-spin';
        innerDiv.style.animationIterationCount = 'infinite';
        innerDiv.style.animationTimingFunction = 'linear';
        
        symbol.appendChild(innerDiv);

        const leftPos = Math.random() * 95;
        const delaySeconds = Math.random() * 10;
        
        let durationSeconds = 8;
        if (useRandomDuration) {
            durationSeconds = Math.random() * 4 + 6; // 6 to 10 seconds
        }

        // Add a random spin
        const spinRot = (Math.random() > 0.5 ? 360 : -360) + "deg";
        innerDiv.style.setProperty('--spin-rot', spinRot);
        
        // Duration for the spin should be different from fall to look natural
        const spinDuration = Math.random() * 2 + 2; 
        innerDiv.style.animationDuration = `${spinDuration}s`;

        symbol.style.left = `${leftPos}vw`;
        symbol.style.animationDuration = `${durationSeconds}s`;
        symbol.style.animationDelay = `${delaySeconds}s`;

        container.appendChild(symbol);
    };

    // Create falling sports balls
    chosenCategories.forEach(category => {
        let variants = SPORTS_ASSETS[category];
        if (!variants) variants = [category];
        
        for (let i = 0; i < ballsPerCategory; i++) {
            // Pick a random variant
            const randomItem = variants[Math.floor(Math.random() * variants.length)];
            createBall(randomItem);
        }
    });
    
    // Create the periodic flying trophy arc
    function launchTrophy() {
        if (!document.querySelector('.sports-container')) return;

        const flyFromLeft = Math.random() > 0.5;
        let trophySymbol = document.createElement('div');
        trophySymbol.className = "sports-symbol sports-trophy-wrapper";
        
        let trophyInner = document.createElement('div');
        trophyInner.className = "sports-inner sports-trophy-inner";
        
        let trophyImg = document.createElement('img');
        trophyImg.src = `../Seasonals/Resources/sport_assets/trophy.gif`;
        trophyImg.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
        trophyImg.onerror = function() {
            this.style.display = 'none';
        };
        
        trophyInner.appendChild(trophyImg);
        trophySymbol.appendChild(trophyInner);
        
        if (flyFromLeft) {
            trophySymbol.style.animationName = "sports-arc-x-right";
            trophySymbol.style.left = "-15vw";
        } else {
            trophySymbol.style.animationName = "sports-arc-x-left";
            trophySymbol.style.left = "115vw";
        }
        
        trophyInner.style.animationName = "sports-arc-y";
        
        // Appearance timing
        const arcDuration = 6 + Math.random() * 2; 
        
        trophySymbol.style.animationDuration = `${arcDuration}s`;
        trophyInner.style.animationDuration = `${arcDuration}s`;
        
        // Prevent looping for the trophy
        trophySymbol.style.animationIterationCount = "1";
        trophyInner.style.animationIterationCount = "1";
        trophySymbol.style.animationFillMode = "forwards";
        trophyInner.style.animationFillMode = "forwards";
        
        container.appendChild(trophySymbol);

        // Remove node after animation completes
        setTimeout(() => {
            if (trophySymbol && trophySymbol.parentNode) {
                trophySymbol.parentNode.removeChild(trophySymbol);
            }
        }, arcDuration * 1000 + 500);
        
        // Schedule the next trophy
        setTimeout(() => { if (document.body.contains(container)) launchTrophy(); }, Math.random() * 20000 + 10000); // Wait 10-30s until next trophy
    }
    
    // Launch initial trophy after a short delay
    if (enableTrophy) {
        setTimeout(() => { if (document.body.contains(container)) launchTrophy(); }, Math.random() * 5000 + 2000);
    }

    const confettiCount = isMobile ? 30 : 60;
    
    for (let i = 0; i < confettiCount; i++) {
        let confetti = document.createElement('div');
        confetti.className = 'sports-confetti';
        
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.backgroundColor = color;
        
        // Random shape generator for varied confetti
        const shape = Math.random();
        if (shape > 0.66) {
            confetti.classList.add('circle');
            const size = Math.random() * 5 + 5; // 5-10px
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
        } else if (shape > 0.33) {
            confetti.classList.add('rect');
            const width = Math.random() * 4 + 4; // 4-8px
            const height = Math.random() * 5 + 8; // 8-13px
            confetti.style.width = `${width}px`;
            confetti.style.height = `${height}px`;
        } else {
            confetti.classList.add('triangle');
        }
        
        const leftPos = Math.random() * 100;
        const delaySeconds = Math.random() * 8;
        const duration = Math.random() * 3 + 4; // 4 to 7 seconds

        confetti.style.left = `${leftPos}vw`;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delaySeconds}s`;
        
        // Random 3D Rotation for flutter
        confetti.style.setProperty('--rx', Math.random().toFixed(2));
        confetti.style.setProperty('--ry', Math.random().toFixed(2));
        confetti.style.setProperty('--rz', (Math.random() * 0.5).toFixed(2));
        confetti.style.setProperty('--rot-dir', `${(Math.random() > 0.5 ? 1 : -1) * 360}deg`);

        container.appendChild(confetti);
    }
}

function initializeSports() {
  if (!sports) return;
  createSports();
  toggleSports();
}

initializeSports();

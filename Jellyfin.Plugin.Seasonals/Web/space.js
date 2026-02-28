const config = window.SeasonalsPluginConfig?.Space || {};

const space = config.EnableSpace !== undefined ? config.EnableSpace : true; // enable/disable space
const planetCountConf = config.PlanetCount !== undefined ? config.PlanetCount : 6; // count of planets
const astronautCountConf = config.AstronautCount !== undefined ? config.AstronautCount : 1; // count of astronaut
const satelliteCountConf = config.SatelliteCount !== undefined ? config.SatelliteCount : 4; // count of satellite
const issCountConf = config.IssCount !== undefined ? config.IssCount : 1; // count of iss
const rocketCountConf = config.RocketCount !== undefined ? config.RocketCount : 1; // count of rocket/space shuttle
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const symbolCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 2; // Devisor to reduce number of objects on mobile

// Credit: https://lottiefiles.com/free-animation/astronaut-63lcWG4Xnh
const astronautImages = [
    "../Seasonals/Resources/space_assets/astronaut_1.gif"
];

// Credits: https://flaticon.com
const planetImages = [
    "../Seasonals/Resources/space_assets/planet_1.png",
    "../Seasonals/Resources/space_assets/planet_2.png",
    "../Seasonals/Resources/space_assets/planet_3.png",
    "../Seasonals/Resources/space_assets/planet_4.png",
    "../Seasonals/Resources/space_assets/planet_5.png",
    "../Seasonals/Resources/space_assets/planet_6.png",
    "../Seasonals/Resources/space_assets/planet_7.png",
    "../Seasonals/Resources/space_assets/planet_8.png",
    "../Seasonals/Resources/space_assets/planet_9.png"
];

// Credits: https://lottiefiles.com/free-animation/s-satellite-vfnNE8AALo
const satelliteImages = [
    "../Seasonals/Resources/space_assets/Satellite_1.gif",
    "../Seasonals/Resources/space_assets/Satellite_2.gif"
];

// Credit: https://pixabay.com/de/illustrations/raumstation-raum-struktur-8023777/
const issImage = "../Seasonals/Resources/space_assets/iss.png";

/**
 * Credits:
 * https://lottiefiles.com/free-animation/rocket-MYUQ3UFq3k
 * https://pixabay.com/de/vectors/space-shuttle-atlantis-nasa-156012/
 */
const rocketImages = [
    "../Seasonals/Resources/space_assets/rocket.gif",
    "../Seasonals/Resources/space_assets/space-shuttle.png"
]

let msgPrinted = false;

function toggleSpace() {
  const container = document.querySelector('.space-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Space hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Space visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleSpace);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createSpace() {
    const container = document.querySelector('.space-container') || document.createElement('div');

    if (!document.querySelector('.space-container')) {
        container.className = 'space-container';
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    // const standardPlanetCount = 4;
    // const standardAstronautCount = 1;
    // const standardSatelliteCount = 2;
    // const standardIssCount = 1;
    // const standardRocketCount = 1;

    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    let divisor = isMobile ? Math.max(1, symbolCountMobile) : 1;
    let pCount = Math.floor(planetCountConf / divisor);
    let aCount = Math.floor(astronautCountConf / divisor);
    let sCount = Math.floor(satelliteCountConf / divisor);
    let iCount = Math.floor(issCountConf / divisor);
    let rCount = Math.floor(rocketCountConf / divisor);

    // Add Nebula Glow
    const bgGlow = document.createElement('div');
    bgGlow.className = 'space-bg-glow';
    container.appendChild(bgGlow);

    // Add CSS Starfield
    const starfield = document.createElement('div');
    starfield.className = 'space-starfield';
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
    starLayer1.style.boxShadow = boxShadows1.join(", ");
    starLayer1.style.animation = 'space-star-drift 200s linear infinite';
    starfield.appendChild(starLayer1);

    const starLayer2 = document.createElement('div');
    starLayer2.style.width = '2px'; starLayer2.style.height = '2px';
    starLayer2.style.background = 'transparent';
    starLayer2.style.boxShadow = boxShadows2.join(", ");
    starLayer2.style.animation = 'space-star-drift 150s linear infinite';
    starfield.appendChild(starLayer2);

    const starLayer3 = document.createElement('div');
    starLayer3.style.width = '3px'; starLayer3.style.height = '3px';
    starLayer3.style.background = 'transparent';
    starLayer3.style.boxShadow = boxShadows3.join(", ");
    starLayer3.style.animation = 'space-star-drift 100s linear infinite';
    starfield.appendChild(starLayer3);
    
    container.appendChild(starfield);

    // Shooting stars
    const shootingStarCount = isMobile ? 1 : 2; // Less frequent
    for (let i = 0; i < shootingStarCount; i++) {
        const streak = document.createElement('div');
        streak.className = 'space-shooting-star';
        // Pick a random tail direction and fall direction to match
        const isFromLeft = Math.random() > 0.5;
        // Direction angle: random between 15deg-75deg (left) or 105deg-165deg (right)
        // so they don't always fall in the exact same quadrant trajectory
        let angle = isFromLeft 
            ? Math.random() * 60 + 15 
            : Math.random() * 60 + 105;
        
        streak.style.setProperty('--shoot-angle', `${angle}deg`);
        
        const topStart = Math.random() * 50; 
        streak.style.left = isFromLeft ? '-20vw' : '120vw';
        streak.style.top = `${topStart}vh`;
        
        // Travel 200 viewport widths exactly along the rotated angle
        streak.style.setProperty('--shoot-distance', '200vw');
        
        streak.style.animationDelay = `${Math.random() * 20}s`; 
        
        // MARK: Shooting Star Speed
        const flightCycleDuration = Math.random() * 10 + 15; // 15-25s
        streak.style.animationDuration = `${flightCycleDuration}s`; 
        
        container.appendChild(streak);
    }

    const useRandomDuration = enableDifferentDuration !== false;

    function createSpaceItem(imageArr, cCount, addedClass) {
        for (let i = 0; i < cCount; i++) {
            let symbol = document.createElement('div');
            
            const randomImage = imageArr[Math.floor(Math.random() * imageArr.length)];
            symbol.className = `space-symbol ${addedClass}`;

            let img = document.createElement('img');
            img.src = randomImage;
            img.onerror = function() {
                this.style.display = 'none';
            }; 
            symbol.appendChild(img);

            const topPos = Math.random() * 90; // 0 to 90vh
            
            // Zero gravity sizes / speeds
            const depth = Math.random(); 
            // Make background elements (depth close to 0) much smaller than foreground
            const distanceScale = 0.15 + (depth * 0.85); // 0.15 to 1.0
            
            symbol.style.zIndex = Math.floor(depth * 30) + 20;

            let durationSeconds = 30; // Very slow
            if (useRandomDuration) {
                durationSeconds = (1 - depth) * 40 + 30 + Math.random() * 10 - 5; 
            }

            // Randomly pick direction: left-to-right OR right-to-left
            const goRight = Math.random() > 0.5;
            const baseTransformScale = goRight ? 'scaleX(-1)' : 'scaleX(1)';
            
            if (goRight) {
                symbol.style.animationName = 'space-drift-right';
                symbol.style.left = '-20vw';
                symbol.style.right = 'auto';
            } else {
                symbol.style.animationName = 'space-drift-left';
                symbol.style.right = '-20vw';
                symbol.style.left = 'auto';
            }

            symbol.style.top = `${topPos}vh`;
            symbol.style.animationDuration = `${durationSeconds}s`;
            
            // Negative delay correctly scatters them initially across the screen 
            // so they don't all appear to spawn from the edge at the start
            const delaySeconds = -(Math.random() * durationSeconds);
            symbol.style.animationDelay = `${delaySeconds}s`;
            
            // Slow rotation inside inner div
            const rotationDiv = document.createElement('div');
            const rotDur = Math.random() * 20 + 20; // 20-40s spin
            const spinReverse = Math.random() > 0.5 ? 'reverse' : 'normal';
            rotationDiv.style.animation = `space-slow-spin ${rotDur}s linear infinite ${spinReverse}`;
            
            // Apply final static scaling and facing to inner image directly
            img.style.transform = `scale(${distanceScale}) ${baseTransformScale}`;
            
            rotationDiv.appendChild(img);
            symbol.appendChild(rotationDiv);

            // Swap to a random image from the pool every time it completes an orbit (disappears)
            if (imageArr.length > 1) {
                // The animation delay pushes the initial cycle, so we use setInterval matched to duration
                const intervalId = setInterval(() => {
                    if (!document.body.contains(container)) { clearInterval(intervalId); return; }
                    // Update only if currently out of bounds to avoid popping
                    const rect = symbol.getBoundingClientRect();
                    if (rect.right < 0 || rect.left > window.innerWidth) {
                        img.src = imageArr[Math.floor(Math.random() * imageArr.length)];
                    }
                }, 2000); // Check occasionally if it's off screen
            }

            container.appendChild(symbol);
        }
    }

    createSpaceItem(planetImages, pCount, 'space-planet');
    createSpaceItem(astronautImages, aCount, 'space-astronaut');
    createSpaceItem(satelliteImages, sCount, 'space-satellite');
    createSpaceItem([issImage], iCount, 'space-iss');
    createSpaceItem(rocketImages, rCount, 'space-rocket');
}

function initializeSpace() {
  if (!space) return;
  createSpace();
  toggleSpace();
}

initializeSpace();

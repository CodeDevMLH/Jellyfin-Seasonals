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

/**
 * Credits:
 * https://pixabay.com/de/illustrations/raumstation-raum-struktur-8023777/
 * https://commons.wikimedia.org/wiki/File:Orthographic_view_of_Orion_spacecraft,_bottom-front_with_solar_panels_(23128839505).png
 */
const issImage = [
    "../Seasonals/Resources/space_assets/iss.png",
    "../Seasonals/Resources/space_assets/orion.png"
]

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

  const videoPlayer = document.querySelector('.videoPlayerContainer:not(.hide)');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer:not(.hide)');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const isPreferences = window.location.href.includes('mypreferences') || !!document.querySelector('#myPreferencesMenuPage');

  if (videoPlayer || trailerPlayer || isDashboard || isPreferences) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('🎉 Seasonals: Space hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('🎉 Seasonals: Space visible');
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
    starLayer1.style.borderRadius = '50%';
    starLayer1.style.boxShadow = boxShadows1.join(", ");
    starLayer1.style.animation = 'space-star-drift 200s linear infinite';
    starfield.appendChild(starLayer1);

    const starLayer2 = document.createElement('div');
    starLayer2.style.width = '2px'; starLayer2.style.height = '2px';
    starLayer2.style.background = 'transparent';
    starLayer2.style.borderRadius = '50%';
    starLayer2.style.boxShadow = boxShadows2.join(", ");
    starLayer2.style.animation = 'space-star-drift 150s linear infinite';
    starfield.appendChild(starLayer2);

    const starLayer3 = document.createElement('div');
    starLayer3.style.width = '3px'; starLayer3.style.height = '3px';
    starLayer3.style.background = 'transparent';
    starLayer3.style.borderRadius = '50%';
    starLayer3.style.boxShadow = boxShadows3.join(", ");
    starLayer3.style.animation = 'space-star-drift 100s linear infinite';
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
            streak.style.animation = `space-shoot ${flightTime}s linear forwards`;
        }, delayMs);
    }

    const shootingStarCount = isMobile ? 2 : 4; 
    for (let i = 0; i < shootingStarCount; i++) {
        const streak = document.createElement('div');
        streak.className = 'space-shooting-star';
        streak.addEventListener('animationend', () => spawnShootingStar(streak));
        spawnShootingStar(streak);
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
    let maxIssItems = Math.min(iCount, 2);
    if (maxIssItems === 1) {
        let randomIss = issImage[Math.floor(Math.random() * issImage.length)];
        createSpaceItem([randomIss], 1, 'space-iss');
    } else if (maxIssItems === 2) {
        createSpaceItem([issImage[0]], 1, 'space-iss');
        createSpaceItem([issImage[1]], 1, 'space-iss');
    }
    createSpaceItem(rocketImages, rCount, 'space-rocket');
}

function initializeSpace() {
  if (!space) return;
  createSpace();
  toggleSpace();
}

initializeSpace();

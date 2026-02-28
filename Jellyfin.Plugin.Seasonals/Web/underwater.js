const config = window.SeasonalsPluginConfig?.Underwater || {};

const underwater = config.EnableUnderwater !== undefined ? config.EnableUnderwater : true; // enable/disable underwater
const symbolCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 2; // Devisor to reduce number of objects on mobile
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const enableLightRays = config.EnableLightRays !== undefined ? config.EnableLightRays : true; // enable/disable lightrays
const seaweedCount = config.SeaweedCount !== undefined ? config.SeaweedCount : 50; // count of seaweed

// Entity counts configured
const fishCount = config.FishCount !== undefined ? config.FishCount : 15; // count of fish
const seahorseCount = config.SeahorseCount !== undefined ? config.SeahorseCount : 3; // count of seahorse
const jellyfishCount = config.JellyfishCount !== undefined ? config.JellyfishCount : 3; // count of jellyfish
const turtleCount = config.TurtleCount !== undefined ? config.TurtleCount : 1; // count of turtle
const crabCount = config.CrabCount !== undefined ? config.CrabCount : 2; // count of crab
const starfishCount = config.StarfishCount !== undefined ? config.StarfishCount : 2; // count of starfish
const shellCount = config.ShellCount !== undefined ? config.ShellCount : 2; // count of shell

// credits: https://lottiefiles.com/free-animation/seaweed-E6Go0HdkqY
const seaweeds = [
    "../Seasonals/Resources/underwater_assets/seaweed_1.gif",
    "../Seasonals/Resources/underwater_assets/seaweed_2.gif"
];

/**
 * Credits:
 * https://www.animierte-gifs.net/img-animiertes-krebs-bild-0041-59970.htm
 * https://www.animierte-gifs.net/img-animiertes-krebs-bild-0002-59931.htm
 * 
 */
const crabImages = [
    "../Seasonals/Resources/underwater_assets/crab_1.gif",
    "../Seasonals/Resources/underwater_assets/crab_2.gif",
    "../Seasonals/Resources/underwater_assets/crab_3.gif"
];

/**
 * Credits:
 * https://lottiefiles.com/free-animation/dancing-starfish-tJ9ZFu9Zq0
 * https://www.animierte-gifs.net/img-animiertes-fische-bild-0003-50003.htm
 */
const starfishImages = [
    "../Seasonals/Resources/underwater_assets/starfish_1.gif",
    "../Seasonals/Resources/underwater_assets/starfish_2.gif"
];

// Credit: https://www.animierte-gifs.net/img-animiertes-muschel-bild-0021-108539.htm
const shellImages = [
    "../Seasonals/Resources/underwater_assets/shell_1.gif"
];

/**
 * Credits:
 * https://lottiefiles.com/free-animation/0101uwt-tt-01-4fA4Lm9gtN
 * https://www.animierte-gifs.net/img-animiertes-fische-bild-0473-50473.htm
 * https://www.animierte-gifs.net/img-animiertes-fische-bild-0290-50290.htm
 * https://www.animierte-gifs.net/img-animiertes-fische-bild-0049-50049.htm
 * https://www.animierte-gifs.net/img-animiertes-fische-bild-0403-50403.htm
 * 
 * https://flaticon.com
 */
const fishImages = [
    "../Seasonals/Resources/underwater_assets/fish_1.gif",
    "../Seasonals/Resources/underwater_assets/fish_2.gif",
    "../Seasonals/Resources/underwater_assets/fish_3.gif",
    "../Seasonals/Resources/underwater_assets/fish_5.gif",
    "../Seasonals/Resources/underwater_assets/fish_6.gif",
    "../Seasonals/Resources/underwater_assets/fish_7.png",
    "../Seasonals/Resources/underwater_assets/fish_8.png",
    "../Seasonals/Resources/underwater_assets/fish_9.png",
    "../Seasonals/Resources/underwater_assets/fish_10.png",
    "../Seasonals/Resources/underwater_assets/fish_11.png",
    "../Seasonals/Resources/underwater_assets/fish_12.png",
    "../Seasonals/Resources/underwater_assets/fish_13.png",
    "../Seasonals/Resources/underwater_assets/fish_14.png",
    "../Seasonals/Resources/underwater_assets/fish_15.png"
];

/**
 * Credits:
 * https://www.animierte-gifs.net/img-animiertes-fische-bild-0221-50221.htm
 * https://www.animierte-gifs.net/img-animiertes-fische-bild-0217-50217.htm
 */
const seahorsesImages = [
    "../Seasonals/Resources/underwater_assets/seahorse_1.gif",
    "../Seasonals/Resources/underwater_assets/seahorse_2.gif"
];

// credit: https://lottiefiles.com/free-animation/sea-turtle-s0sbHIWS2F
const turtleImages = [
    "../Seasonals/Resources/underwater_assets/turtle.gif"
];

// credits: https://lottiefiles.com/free-animation/jellyfish-wPwyF8EeSQ
const jellyfishImages = [
    "../Seasonals/Resources/underwater_assets/jellyfish_1.gif",
    "../Seasonals/Resources/underwater_assets/jellyfish_2.gif"
];

// MARK: Base sizes for all creatures (in vh)
const seahorseSize = 8;
const turtleSize = 14;
const jellyfishSize = 18;
const fishSize = 8;
const crabSize = 4;
const starfishSize = 4;
const shellSize = 7;

let msgPrinted = false;

function toggleUnderwater() {
  const container = document.querySelector('.underwater-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Underwater hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Underwater visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleUnderwater);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createUnderwater() {
    const container = document.querySelector('.underwater-container') || document.createElement('div');

    if (!document.querySelector('.underwater-container')) {
        container.className = 'underwater-container';
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    } else {
        container.innerHTML = ''; // Prevent infinite duplication on theme reload!
    }

    // Deep blue overlay
    const bg = document.createElement('div');
    bg.className = 'underwater-bg';
    container.appendChild(bg);
    
    // Light Rays (God Rays)
    if (enableLightRays) {
        const rays = document.createElement('div');
        rays.className = 'underwater-god-rays';
        container.appendChild(rays);
    }

    const useRandomDuration = enableDifferentDuration !== false;
    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

    // Seaweed swaying at the bottom (evenly distributed based on count)
    const activeSeaweedCount = isMobile ? Math.max(1, Math.floor(seaweedCount / Math.max(1, symbolCountMobile))) : Math.max(1, seaweedCount);
    const seaweedSpacing = 95 / activeSeaweedCount;
    for (let i = 0; i < activeSeaweedCount; i++) {
        let seaweed = document.createElement('div');
        seaweed.className = 'underwater-seaweed';
        seaweed.style.position = 'absolute';
        
        // Distance from the bottom edge for the seaweed
        seaweed.style.bottom = '-18px';
        
        let offset = (Math.random() * seaweedSpacing) - (seaweedSpacing / 2);
        seaweed.style.left = `max(0vw, min(95vw, calc(${(i * seaweedSpacing)}vw + ${offset}vw)))`;
        seaweed.style.animationDelay = `-${Math.random() * 5}s`;
        
        // Random parallax scale for seaweed depth
        const depth = Math.random();
        const scale = 0.5 + depth * 0.7; // 0.5 to 1.2
        const blur = depth < 0.3 ? `blur(2px)` : 'none';
        seaweed.style.filter = blur;
        
        let flip = Math.random() > 0.5 ? 'scaleX(-1)' : 'scaleX(1)';
        seaweed.style.transform = `scale(${scale}) ${flip}`;
        seaweed.style.zIndex = depth < 0.5 ? '15' : '30';

        // Mix Emojis and GIFs for seaweed
        if (Math.random() > 0.4) {
            let img = document.createElement('img');
            img.src = seaweeds[Math.floor(Math.random() * seaweeds.length)];
            img.onerror = function() {
                this.style.display = 'none';
            };
            seaweed.appendChild(img);
        } else {
            seaweed.innerHTML = '🌿';
            seaweed.style.fontSize = '3rem';
            seaweed.style.bottom = '0';
            seaweed.style.transformOrigin = 'bottom center';
        }
        container.appendChild(seaweed);
    }

    // Static Bottom Creatures logic
    function spawnStatic(imageArray, maxCount, baseSize) {
        let spawnLimit = isMobile ? Math.floor(maxCount / Math.max(1, symbolCountMobile)) : maxCount;
        for (let i = 0; i < spawnLimit; i++) {
            let creature = document.createElement('div');
            creature.className = 'underwater-static-bottom';
            creature.style.position = 'absolute';
            creature.style.bottom = '5px';
            creature.style.left = `${Math.random() * 95}vw`;
            creature.style.zIndex = '20'; // In between seaweed layers

            let img = document.createElement('img');
            img.src = imageArray[Math.floor(Math.random() * imageArray.length)];
            img.style.height = `${baseSize}vh`;

            // Random scale variance and flip
            const scale = 0.7 + Math.random() * 0.5; // 0.7 to 1.2 x baseSize
            const flip = Math.random() > 0.5 ? 'scaleX(-1)' : 'scaleX(1)';
            img.style.transform = `scale(${scale}) ${flip}`;
            
            img.onerror = function() {
                this.style.display = 'none';
            };
            creature.appendChild(img);
            container.appendChild(creature);
        }
    }

    spawnStatic(crabImages, crabCount, crabSize);
    spawnStatic(starfishImages, starfishCount, starfishSize);
    spawnStatic(shellImages, shellCount, shellSize);

    // Swimmers logic
    function spawnSwimmerLoop(imageArray, maxCount, baseSize, typeName) {
        if (maxCount <= 0) return;
        let spawnLimit = isMobile ? Math.floor(maxCount / Math.max(1, symbolCountMobile)) : maxCount;
        
        for (let i = 0; i < spawnLimit; i++) {
            spawnSingleSwimmer(imageArray, baseSize, typeName);
        }
    }

    function spawnSingleSwimmer(imageArray, baseSize, typeName) {
        if (!document.querySelector('.underwater-container')) return;

        let symbol = document.createElement('div');
        symbol.className = `underwater-symbol`;
        
        const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
        let img = document.createElement('img');
        img.src = randomImage;
        img.style.height = `${baseSize}vh`;
        img.style.width = 'auto';
        img.style.maxWidth = 'none';
        
        img.onerror = function() {
            this.style.display = 'none';
        };

        const depth = Math.random();
        const distanceScale = 0.4 + (depth * 0.8);
        const blurAmount = depth < 0.4 ? (1 - depth) * 3 : 0;
        const opacity = 0.4 + (depth * 0.5);
        
        symbol.style.opacity = `${opacity}`;
        symbol.style.filter = `blur(${blurAmount}px)`;
        symbol.style.zIndex = Math.floor(depth * 30) + 10;
        
        symbol.style.animationIterationCount = 'infinite';

        let durationSeconds = (1 - depth) * 20 + 15 + Math.random() * 5; 
        if (!useRandomDuration) durationSeconds = 20;

        // Apply a negative delay on spawn so they start mid-screen scattered
        const startDelay = -(Math.random() * durationSeconds);

        // Animate based on type
        if (typeName === 'jellyfish') {
            const goUp = Math.random() > 0.5;
            symbol.style.animationName = goUp ? 'underwater-traverse-up' : 'underwater-traverse-down';
            symbol.style.left = `${Math.random() * 90}vw`;
            
            const flip = Math.random() > 0.5 ? 'scaleX(-1)' : 'scaleX(1)';
            symbol.style.transform = `scale(${distanceScale}) ${flip}`;
            
            durationSeconds *= 0.8;
            symbol.style.animationDuration = `${durationSeconds}s`;
            symbol.style.animationDelay = `${startDelay}s`;
            
            symbol.appendChild(img);
        } else {
            const goRight = Math.random() > 0.5;
            const directionScale = goRight ? 'scaleX(-1)' : 'scaleX(1)';
            
            symbol.style.animationName = goRight ? 'underwater-traverse-right' : 'underwater-traverse-left';
            symbol.style.animationDelay = `${startDelay}s`;
            
            const rotationDiv = document.createElement('div');
            let swayDur = Math.random() * 2 + 2; 
            if (typeName === 'seahorse') swayDur *= 1.5;
            else if (typeName === 'turtle') swayDur *= 2;
            
            rotationDiv.style.animation = `underwater-sway-y ${swayDur}s ease-in-out infinite alternate`;
            // Random internal sway to prevent synchronized wiggling
            rotationDiv.style.animationDelay = `-${Math.random() * 5}s`;
            
            // Apply flip scale directly to the image inside rotationDiv
            img.style.transform = `scale(${distanceScale}) ${directionScale}`;
            rotationDiv.appendChild(img);
            
            symbol.appendChild(rotationDiv);
            
            symbol.style.top = `${Math.random() * 80 + 5}vh`;
            symbol.style.animationDuration = `${durationSeconds}s`;
        }

        container.appendChild(symbol);
    }

    // Start swimmer loops
    spawnSwimmerLoop(fishImages, fishCount, fishSize, 'fish');
    spawnSwimmerLoop(seahorsesImages, seahorseCount, seahorseSize, 'seahorse');
    spawnSwimmerLoop(jellyfishImages, jellyfishCount, jellyfishSize, 'jellyfish');
    spawnSwimmerLoop(turtleImages, turtleCount, turtleSize, 'turtle');
    const bubbleCount = isMobile ? 15 : 30;
    
    for (let i = 0; i < bubbleCount; i++) {
        let bubble = document.createElement('div');
        bubble.className = 'underwater-bubble';
        
        const leftPos = Math.random() * 100;
        const delaySeconds = Math.random() * 8;
        const duration = Math.random() * 4 + 4; // 4 to 8s rising

        bubble.style.left = `${leftPos}vw`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delaySeconds}s`;

        // randomize bubble size
        const size = Math.random() * 15 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        container.appendChild(bubble);
    }
}



function initializeUnderwater() {
  if (!underwater) return;
  createUnderwater();
  toggleUnderwater();
}

initializeUnderwater();

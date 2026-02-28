const config = window.SeasonalsPluginConfig?.Spring || {};

const spring = config.EnableSpring !== undefined ? config.EnableSpring : true; // enable/disable spring
const pollenCount = config.PollenCount !== undefined ? config.PollenCount : 30; // count of pollen
const enableSunbeams = config.EnableSpringSunbeams !== undefined ? config.EnableSpringSunbeams : true; // enable/disable sunbeams
const sunbeamCount = config.SunbeamCount !== undefined ? config.SunbeamCount : 5; // count of sunbeams
const birdCount = config.BirdCount !== undefined ? config.BirdCount : 3; // count of birds
const butterflyCount = config.ButterflyCount !== undefined ? config.ButterflyCount : 4; // count of butterflies
const beeCount = config.BeeCount !== undefined ? config.BeeCount : 2; // count of bees
const ladybugCount = config.LadybugCount !== undefined ? config.LadybugCount : 2; // count of ladybugs
const symbolCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 2; // Devisor to reduce number of objects on mobile

// Credit: https://lottiefiles.com/free-animation/birds-flying-V7O0L8jkOg
const birdImages = [
    '../Seasonals/Resources/spring_assets/Bird_1.gif',
    '../Seasonals/Resources/spring_assets/Bird_2.gif',
    '../Seasonals/Resources/spring_assets/Bird_3.gif'
];

// Credit: https://lottiefiles.com/free-animation/butterfly-lottie-animation-b6IeEGLFLF
const butterflyImages = [
    '../Seasonals/Resources/spring_assets/Butterfly_1.gif',
    '../Seasonals/Resources/spring_assets/Butterfly_2.gif'
];

// Credit: https://lottiefiles.com/free-animation/loading-flying-beee-WcTfIccdJZ
const beeImage = '../Seasonals/Resources/spring_assets/Bee.gif';

// Credit: https://pixabay.com/gifs/ladybug-insect-nature-fly-wings-5068/
const ladybugImage = '../Seasonals/Resources/spring_assets/ladybug.gif';

let msgPrinted = false;

function toggleSpring() {
  const springContainer = document.querySelector('.spring-container');
  if (!springContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    springContainer.style.display = 'none';
    if (!msgPrinted) {
      console.log('Spring hidden');
      msgPrinted = true;
    }
  } else {
    springContainer.style.display = 'block';
    if (msgPrinted) {
      console.log('Spring visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleSpring);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createPollen(container) {
    const pollen = document.createElement('div');
    pollen.classList.add('spring-pollen');
    
    // MARK: POLLEN START VERTICAL POSITION (in %)
    const startY = Math.random() * 60 + 20; 
    pollen.style.top = `${startY}%`;
    pollen.style.left = `${Math.random() * 100}%`;
    
    // MARK: POLLEN SIZE
    const size = Math.random() * 3 + 1; // 1-4px
    pollen.style.width = `${size}px`;
    pollen.style.height = `${size}px`;
    
    const duration = Math.random() * 20 + 20; 
    pollen.style.animationDuration = `${duration}s`;
    pollen.style.animationDelay = `-${Math.random() * 20}s`; 
    
    container.appendChild(pollen);
}

function spawnSunbeamGroup(container, count) {
    if (!enableSunbeams) return;

    const rotate = Math.random() * 30 - 15 + 45; 
    let beamsActive = count;

    for (let i = 0; i < count; i++) {
        const beam = document.createElement('div');
        beam.classList.add('spring-sunbeam');
        
        const left = Math.random() * 100;
        beam.style.left = `${left}%`;
        
        // MARK: SUNBEAM WIDTH (in px)
        const width = Math.random() * 12 + 8; // 8-20px wide
        beam.style.width = `${width}px`;
        
        beam.style.setProperty('--beam-rotation', `${rotate}deg`);
        
        const duration = Math.random() * 7 + 8; // 8-15s
        beam.style.animation = `spring-beam-pulse ${duration}s ease-in-out forwards`;
        
        beam.style.animationDelay = `${Math.random() * 3}s`;
        
        beam.addEventListener('animationend', () => {
            beam.remove();
            beamsActive--;
            if (beamsActive === 0) {
                spawnSunbeamGroup(container, count);
            }
        });
        
        container.appendChild(beam);
    }
}

function createGrass(container) {
    let grassContainer = container.querySelector('.spring-grass-container');
    if (!grassContainer) {
        grassContainer = document.createElement('div');
        grassContainer.className = 'spring-grass-container';
        container.appendChild(grassContainer);
    }
    
    grassContainer.innerHTML = '';
    
    let pathsBg = '';
    let pathsFg = '';
    const w = window.innerWidth;
    const hSVG = 80;
    
    // 1. Generate Straight Line HTML-Style Grass (converted to SVG Paths)
    const bladeCount = w / 5; // Reduced from w/3
    for (let i = 0; i < bladeCount; i++) {
        const height = Math.random() * 40 + 20; // 20-60px height
        const x = i * 5 + Math.random() * 3;
        
        const hue = 100 + Math.random() * 40; 
        const color = `hsl(${hue}, 60%, 40%)`;
        
        const line = `<line x1="${x}" y1="${hSVG}" x2="${x}" y2="${hSVG - height}" stroke="${color}" stroke-width="2" />`;
        // ~66% chance to be in background (1001), 33% foreground (1003)
        if (Math.random() > 0.33) pathsBg += line; else pathsFg += line;
    }

    // 2. Generate Curved Earth-Day Style Grass
    for (let i = 0; i < 200; i++) { // Reduced from 400
        const x = Math.random() * w;
        const h = 20 + Math.random() * 50;
        const cY = hSVG - h;
        const bend = x + (Math.random() * 15 - 7.5); // curvature
        const color = Math.random() > 0.5 ? '#4caf50' : '#45a049';
        const width = 1 + Math.random() * 2;
        const path = `<path d="M ${x} ${hSVG} Q ${bend} ${cY+20} ${bend} ${cY}" stroke="${color}" stroke-width="${width}" fill="none"/>`;
        // ~66% chance to be in background (1001), 33% foreground (1003)
        if (Math.random() > 0.33) pathsBg += path; else pathsFg += path;
    }

    // 3. Generate SVG Flowers
    const colors = ['#FF69B4', '#FFD700', '#87CEFA', '#FF4500', '#BA55D3', '#FFA500', '#FF1493', '#FFFFFF'];
    const flowerCount = Math.floor(w / 40); // Reduced from w/30
    for (let i = 0; i < flowerCount; i++) {
        const x = 10 + Math.random() * (w - 20);
        const y = 10 + Math.random() * 40; // 10-50px from top of SVG
        const col = colors[Math.floor(Math.random() * colors.length)];
        
        let flower = '';
        // Stem
        flower += `<path d="M ${x} ${hSVG} Q ${x - 5 + Math.random() * 10} ${y+15} ${x} ${y}" stroke="#2e7d32" stroke-width="1.5" fill="none"/>`;
        
        // Petals
        const r = 2 + Math.random() * 1.5;
        flower += `<circle cx="${x-r}" cy="${y-r}" r="${r}" fill="${col}"/>`;
        flower += `<circle cx="${x+r}" cy="${y-r}" r="${r}" fill="${col}"/>`;
        flower += `<circle cx="${x-r}" cy="${y+r}" r="${r}" fill="${col}"/>`;
        flower += `<circle cx="${x+r}" cy="${y+r}" r="${r}" fill="${col}"/>`;
        // Center
        flower += `<circle cx="${x}" cy="${y}" r="${r*0.7}" fill="#FFF8DC"/>`;

        // ~66% chance to be in background (1001), 33% foreground (1003)
        if (Math.random() > 0.33) pathsBg += flower; else pathsFg += flower;
    }

    // Inject purely SVG based grass container
    grassContainer.innerHTML = `
    <div class="spring-meadow-layer" style="z-index: 1001;">
        <svg class="spring-meadow" viewBox="0 0 ${w} ${hSVG}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g class="spring-sway">
                ${pathsBg}
            </g>
        </svg>
    </div>
    <div class="spring-meadow-layer" style="z-index: 1003;">
        <svg class="spring-meadow" viewBox="0 0 ${w} ${hSVG}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g class="spring-sway" style="animation-delay: -2s;">
                ${pathsFg}
            </g>
        </svg>
    </div>
    `;
}

function initSpringObjects() {
    let container = document.querySelector('.spring-container');
    if (!container) {
        container = document.createElement("div");
        container.className = "spring-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    createGrass(container);
    
    if (enableSunbeams) {
        spawnSunbeamGroup(container, sunbeamCount);
    }
}

function initializeSpring() {
    if (!spring) {
        console.warn('Spring is disabled.');
        return;
    }

    initSpringObjects();
    toggleSpring();

    const container = document.querySelector('.spring-container');
    if (container) {
        let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
        let divisor = isMobile ? Math.max(1, symbolCountMobile) : 1;

        let adjPollen = Math.floor(pollenCount / divisor);
        let adjBird = Math.floor(birdCount / divisor);
        let adjButterfly = Math.floor(butterflyCount / divisor);
        let adjBee = Math.floor(beeCount / divisor);
        let adjLadybug = Math.floor(ladybugCount / divisor);

        // Add Pollen
        for (let i = 0; i < adjPollen; i++) {
            createPollen(container);
        }

        // Add Birds
        for (let i = 0; i < adjBird; i++) {
            setTimeout(() => createBird(container), Math.random() * 1000); // 0-1s desync
        }
        // Add Butterflies
        for (let i = 0; i < adjButterfly; i++) {
            setTimeout(() => createButterfly(container), Math.random() * 1000); // 0-1s desync
        }
        // Add Bees
        for (let i = 0; i < adjBee; i++) {
            setTimeout(() => createBee(container), Math.random() * 1000); // 0-1s desync
        }
        // Add Ladybugs
        for (let i = 0; i < adjLadybug; i++) {
            setTimeout(() => createLadybugGif(container), Math.random() * 1000); // 0-1s desync
        }
    }
}

function createBird(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper'); 
    wrapper.classList.add('spring-bird-wrapper'); 
    
    const alignY = document.createElement('div');
    alignY.classList.add('spring-align-y');

    const mirror = document.createElement('div');
    mirror.classList.add('spring-mirror-wrapper');
    
    const bird = document.createElement('img');
    bird.classList.add('spring-bird');
    
    const randomSrc = birdImages[Math.floor(Math.random() * birdImages.length)];
    bird.src = randomSrc;
    
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    // MARK: BIRD SPEED (10-15s)
    const duration = Math.random() * 5 + 10;
    
    // MARK: BIRD HEIGHT RANGE (in vh)
    const startY = Math.random() * 55 + 5; // Start 5-60vh
    const endY = Math.random() * 55 + 5;   // End 5-60vh
    alignY.style.setProperty('--start-y', `${startY}vh`);
    alignY.style.setProperty('--end-y', `${endY}vh`);
    
    if (direction === 'right') {
        wrapper.style.animation = `spring-fly-right-wrapper ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(-1)'; 
    } else {
        wrapper.style.animation = `spring-fly-left-wrapper ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(1)'; 
    }
    alignY.style.animation = `spring-vertical-drift ${duration}s linear forwards`;
    
    wrapper.addEventListener('animationend', (e) => {
        if (e.animationName.includes('fly-')) {
            wrapper.remove();
            if (document.body.contains(container)) createBird(container);
        }
    });
    
    bird.style.animation = `spring-bob 2s ease-in-out infinite`;
      
    mirror.appendChild(bird);
    alignY.appendChild(mirror);
    wrapper.appendChild(alignY);
    container.appendChild(wrapper);
}

function createButterfly(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper');
    wrapper.classList.add('spring-butterfly-wrapper');

    const alignY = document.createElement('div');
    alignY.classList.add('spring-align-y');

    const mirror = document.createElement('div');
    mirror.classList.add('spring-mirror-wrapper');

    const butterfly = document.createElement('img');
    butterfly.classList.add('spring-butterfly');
    
    const randomSrc = butterflyImages[Math.floor(Math.random() * butterflyImages.length)];
    butterfly.src = randomSrc;
    
    const duration = Math.random() * 15 + 25; 
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    
    if (direction === 'right') {
        wrapper.style.animation = `spring-fly-right-wrapper ${duration}s linear forwards`;  
        mirror.style.transform = 'scaleX(1)'; 
    } else {
        wrapper.style.animation = `spring-fly-left-wrapper ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(-1)'; 
    }
    
    wrapper.addEventListener('animationend', (e) => {
        if (e.animationName.includes('fly-')) {
            wrapper.remove();
            if (document.body.contains(container)) createButterfly(container);
        }
    });

    // MARK: BUTTERFLY FLUTTER RHYTHM
    butterfly.style.animation = `spring-flutter 3s ease-in-out infinite`;
    butterfly.style.animationDelay = `-${Math.random() * 3}s`;

    // MARK: BUTTERFLY HEIGHT (in vh)
    const top = Math.random() * 35 + 30; // 30-65vh 
    alignY.style.transform = `translateY(${top}vh)`;
    
    mirror.appendChild(butterfly);
    alignY.appendChild(mirror);
    wrapper.appendChild(alignY);
    container.appendChild(wrapper);
}

function createBee(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper'); 
    wrapper.classList.add('spring-bee-wrapper');

    const alignY = document.createElement('div');
    alignY.classList.add('spring-align-y');

    const mirror = document.createElement('div');
    mirror.classList.add('spring-mirror-wrapper');

    const bee = document.createElement('img');
    bee.classList.add('spring-bee');
    bee.src = beeImage;
    
    const duration = Math.random() * 10 + 15;
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    
    if (direction === 'right') {
        wrapper.style.animation = `spring-fly-right-wrapper ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(1)'; 
    } else {
        wrapper.style.animation = `spring-fly-left-wrapper ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(-1)';
    }

    wrapper.addEventListener('animationend', (e) => {
        if (e.animationName.includes('fly-')) {
            wrapper.remove();
            if (document.body.contains(container)) createBee(container);
        }
    });

    // MARK: BEE HEIGHT (in vh)
    const top = Math.random() * 60 + 20; // 20-80vh
    alignY.style.transform = `translateY(${top}vh)`;
    
    mirror.appendChild(bee);
    alignY.appendChild(mirror);
    wrapper.appendChild(alignY);
    container.appendChild(wrapper);
}

function createLadybugGif(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper'); 
    wrapper.classList.add('spring-ladybug-wrapper');

    const alignY = document.createElement('div');
    alignY.classList.add('spring-align-y');

    const mirror = document.createElement('div');
    mirror.classList.add('spring-mirror-wrapper');

    const bug = document.createElement('img');
    bug.classList.add('spring-ladybug-gif');
    bug.src = ladybugImage;
    
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    const duration = Math.random() * 20 + 30; 
    
    if (direction === 'right') {
        wrapper.style.animation = `spring-walk-right ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(1)'; 
    } else {
        wrapper.style.animation = `spring-walk-left ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(-1)';
    }
    
    wrapper.addEventListener('animationend', (e) => {
        if (e.animationName.includes('walk-')) {
            wrapper.remove();
            if (document.body.contains(container)) createLadybugGif(container);
        }
    });
        
    bug.style.animation = `spring-crawl 2s ease-in-out infinite`;

    alignY.style.transform = `translateY(calc(100vh - 5px - 30px))`; 
    
    mirror.appendChild(bug);
    alignY.appendChild(mirror);
    wrapper.appendChild(alignY);
    container.appendChild(wrapper);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleResize = debounce(() => {
    const container = document.querySelector('.spring-container');
    if (container) {
        createGrass(container);
    }
}, 250);

window.addEventListener('resize', handleResize);

initializeSpring();

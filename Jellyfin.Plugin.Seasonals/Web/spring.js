const config = window.SeasonalsPluginConfig?.Spring || {};

const spring = config.EnableSpring !== undefined ? config.EnableSpring : true; // Enable/disable spring
const pollenCount = config.PollenCount || 30; // Number of pollen particles
const sunbeamCount = config.SunbeamCount || 5; // Number of sunbeams
const enableSunbeams = config.EnableSpringSunbeams !== undefined ? config.EnableSpringSunbeams : true; // Enable/disable sunbeams
const birdCount = config.BirdCount !== undefined ? config.BirdCount : 3; // Number of birds
const butterflyCount = config.ButterflyCount !== undefined ? config.ButterflyCount : 4; // Number of butterflies
const beeCount = config.BeeCount !== undefined ? config.BeeCount : 2; // Number of bees
const ladybugCount = config.LadybugCount !== undefined ? config.LadybugCount : 2; // Number of ladybugs
const randomSpring = config.EnableRandomSpring !== undefined ? config.EnableRandomSpring : true; // Enable random spring objects

const birdImages = [
    '../Seasonals/Resources/spring_assets/Bird_1.gif',
    '../Seasonals/Resources/spring_assets/Bird_2.gif',
    '../Seasonals/Resources/spring_assets/Bird_3.gif'
];

const butterflyImages = [
    '../Seasonals/Resources/spring_assets/Butterfly_1.gif',
    '../Seasonals/Resources/spring_assets/Butterfly_2.gif'
];

const beeImage = '../Seasonals/Resources/spring_assets/Bee.gif';
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
observer.observe(document.body, { childList: true, subtree: true, attributes: true });


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
    
    const bladeCount = window.innerWidth / 3; 
    for (let i = 0; i < bladeCount; i++) {
        const blade = document.createElement('div');
        blade.classList.add('spring-grass');
        
        // MARK: GRASS HEIGHT
        const height = Math.random() * 40 + 20; // 20-60px height
        blade.style.height = `${height}px`;
        blade.style.left = `${i * 3 + Math.random() * 2}px`;
        
        const duration = Math.random() * 2 + 3; 
        blade.style.animationDuration = `${duration}s`;
        blade.style.animationDelay = `-${Math.random() * 5}s`;
        
        const hue = 100 + Math.random() * 40; 
        blade.style.backgroundColor = `hsl(${hue}, 60%, 40%)`;
        
        // Random z-index to interleave with Ladybug (1002)
        // Values: 1001 (behind) or 1003 (front)
        const z = Math.random() > 0.5 ? 1001 : 1003;
        blade.style.zIndex = z;
        
        grassContainer.appendChild(blade);
    }
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
        if (randomSpring) {
            // Add Pollen
            for (let i = 0; i < pollenCount; i++) {
                createPollen(container);
            }

            // Add Birds
            for (let i = 0; i < birdCount; i++) {
                setTimeout(() => createBird(container), Math.random() * 1000); // 0-1s desync
            }
            // Add Butterflies
            for (let i = 0; i < butterflyCount; i++) {
                setTimeout(() => createButterfly(container), Math.random() * 1000); // 0-1s desync
            }
            // Add Bees
            for (let i = 0; i < beeCount; i++) {
                setTimeout(() => createBee(container), Math.random() * 1000); // 0-1s desync
            }
            // Add Ladybugs
            for (let i = 0; i < ladybugCount; i++) {
                setTimeout(() => createLadybugGif(container), Math.random() * 1000); // 0-1s desync
            }
        }
    }
}

function createBird(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper'); 
    wrapper.classList.add('spring-bird-wrapper'); 
    
    const mirror = document.createElement('div');
    mirror.classList.add('spring-mirror-wrapper');
    
    const bird = document.createElement('img');
    bird.classList.add('spring-bird');
    
    const randomSrc = birdImages[Math.floor(Math.random() * birdImages.length)];
    bird.src = randomSrc;
    
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    // MARK: BIRD SPEED (10-15s)
    const duration = Math.random() * 5 + 10;
    
    // MARK: BIRD HEIGHT RANGE (in %)
    const startY = Math.random() * 55 + 5; // Start 5-60%
    const endY = Math.random() * 55 + 5;   // End 5-60%
    wrapper.style.setProperty('--start-y', `${startY}%`);
    wrapper.style.setProperty('--end-y', `${endY}%`);
    
    if (direction === 'right') {
        wrapper.style.animation = `spring-fly-right-wrapper ${duration}s linear forwards, spring-vertical-drift ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(-1)'; 
    } else {
        wrapper.style.animation = `spring-fly-left-wrapper ${duration}s linear forwards, spring-vertical-drift ${duration}s linear forwards`;
        mirror.style.transform = 'scaleX(1)'; 
    }
    
    wrapper.addEventListener('animationend', (e) => {
        if (e.animationName.includes('fly-')) {
            wrapper.remove();
            createBird(container);
        }
    });
    
    bird.style.animation = `spring-bob 2s ease-in-out infinite`;
     
    wrapper.style.translate = `0 ${startY}%`; 
    
    mirror.appendChild(bird);
    wrapper.appendChild(mirror);
    container.appendChild(wrapper);
}

function createButterfly(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper');
    wrapper.classList.add('spring-butterfly-wrapper');

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
            createButterfly(container);
        }
    });

    // MARK: BUTTERFLY FLUTTER RHYTHM
    butterfly.style.animation = `spring-flutter 3s ease-in-out infinite`;
    butterfly.style.animationDelay = `-${Math.random() * 3}s`;

    // MARK: BUTTERFLY HEIGHT (in %)
    const top = Math.random() * 35 + 30; // 30-65% 
    wrapper.style.translate = `0 ${top}%`;
    
    mirror.appendChild(butterfly);
    wrapper.appendChild(mirror);
    container.appendChild(wrapper);
}

function createBee(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper'); 
    wrapper.classList.add('spring-bee-wrapper');

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
            createBee(container);
        }
    });

    // MARK: BEE HEIGHT (in %)
    const top = Math.random() * 60 + 20; // 20-80%
    wrapper.style.translate = `0 ${top}%`;
    
    mirror.appendChild(bee);
    wrapper.appendChild(mirror);
    container.appendChild(wrapper);
}

function createLadybugGif(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('spring-anim-wrapper'); 
    wrapper.classList.add('spring-ladybug-wrapper');

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
            createLadybugGif(container);
        }
    });
        
    bug.style.animation = `spring-crawl 2s ease-in-out infinite`;

    wrapper.style.top = 'auto'; 
    wrapper.style.bottom = '5px';
    
    mirror.appendChild(bug);
    wrapper.appendChild(mirror);
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

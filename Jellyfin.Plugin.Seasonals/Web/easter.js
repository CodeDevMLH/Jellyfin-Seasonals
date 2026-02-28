const config = window.SeasonalsPluginConfig?.Easter || {};

const easter = config.EnableEaster !== undefined ? config.EnableEaster : true; // enable/disable easter
const enableBunny = config.EnableBunny !== undefined ? config.EnableBunny : true; // enable/disable bunny
const minBunnyRestTime = config.MinBunnyRestTime !== undefined ? config.MinBunnyRestTime : 2000; // timing parameter
const maxBunnyRestTime = config.MaxBunnyRestTime !== undefined ? config.MaxBunnyRestTime : 5000; // timing parameter
const eggCount = config.EggCount !== undefined ? config.EggCount : 15; // count of egg

/* MARK: Bunny movement config */
const jumpDistanceVw = 5; // Distance in vw the bunny covers per jump
const jumpDurationMs = 770; // Time in ms the bunny spends moving during a jump
const pauseDurationMs = 116.6666; // Time in ms the bunny pauses between jumps

const rabbit = "../Seasonals/Resources/easter_images/Osterhase.gif";

// Credit: https://flaticon.com
const easterEggImages = [
    "../Seasonals/Resources/easter_images/egg_1.png",
    "../Seasonals/Resources/easter_images/egg_2.png",
    "../Seasonals/Resources/easter_images/egg_3.png",
    "../Seasonals/Resources/easter_images/egg_4.png",
    "../Seasonals/Resources/easter_images/egg_5.png",
    "../Seasonals/Resources/easter_images/egg_6.png",
    "../Seasonals/Resources/easter_images/egg_7.png",
    "../Seasonals/Resources/easter_images/egg_8.png",
    "../Seasonals/Resources/easter_images/egg_9.png",
    "../Seasonals/Resources/easter_images/egg_10.png",
    "../Seasonals/Resources/easter_images/egg_11.png",
    "../Seasonals/Resources/easter_images/egg_12.png",
    "../Seasonals/Resources/easter_images/eggs.png"
];

let msgPrinted = false;

// Check visibility
function toggleEaster() {
    const easterContainer = document.querySelector('.easter-container');
    if (!easterContainer) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        easterContainer.style.display = 'none';
        if (rabbitTimeout) {
            clearTimeout(rabbitTimeout);
            isAnimating = false;
        }
        if (!msgPrinted) {
            console.log('Easter hidden');
            msgPrinted = true;
        }
    } else {
        easterContainer.style.display = 'block';
        if (!isAnimating && enableBunny) {
            animateRabbit(document.querySelector('#rabbit'));
        }
        if (msgPrinted) {
            console.log('Easter visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleEaster);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createEasterGrassAndEggs(container) {
    let grassContainer = container.querySelector('.easter-grass-container');
    if (!grassContainer) {
        grassContainer = document.createElement('div');
        grassContainer.className = 'easter-grass-container';
        container.appendChild(grassContainer);
    }
    
    grassContainer.innerHTML = '';
    
    let pathsBg = '';
    let pathsFg = '';
    const w = window.innerWidth;
    const hSVG = 80; // Grass 80px high
    
    // Generate Grass
    const bladeCount = w / 5;
    for (let i = 0; i < bladeCount; i++) {
        const height = Math.random() * 40 + 20;
        const x = i * 5 + Math.random() * 3;
        const hue = 80 + Math.random() * 40; // slightly more yellow-green for spring/easter
        const color = `hsl(${hue}, 60%, 40%)`;
        const line = `<line x1="${x}" y1="${hSVG}" x2="${x}" y2="${hSVG - height}" stroke="${color}" stroke-width="2" />`;
        if (Math.random() > 0.33) pathsBg += line; else pathsFg += line;
    }

    for (let i = 0; i < 200; i++) {
        const x = Math.random() * w;
        const h = 20 + Math.random() * 50;
        const cY = hSVG - h;
        const bend = x + (Math.random() * 40 - 20);
        const color = Math.random() > 0.5 ? '#4caf50' : '#8bc34a';
        const width = 1 + Math.random() * 2;
        const path = `<path d="M ${x} ${hSVG} Q ${bend} ${cY+20} ${bend} ${cY}" stroke="${color}" stroke-width="${width}" fill="none"/>`;
        if (Math.random() > 0.33) pathsBg += path; else pathsFg += path;
    }

    // Generate Flowers
    const colors = ['#FF69B4', '#FFD700', '#87CEFA', '#FF4500', '#BA55D3', '#FFA500', '#FF1493'];
    for (let i = 0; i < 40; i++) {
        const x = 10 + Math.random() * (w - 20);
        const y = hSVG * 0.1 + Math.random() * (hSVG * 0.5);
        const col = colors[Math.floor(Math.random() * colors.length)];
        
        let path = '';
        path += `<path d="M ${x} ${hSVG} Q ${x - 5 + Math.random() * 10} ${y+15} ${x} ${y}" stroke="#006400" stroke-width="1.5" fill="none"/>`;
        
        const r = 2 + Math.random() * 1.5;
        path += `<circle cx="${x-r}" cy="${y-r}" r="${r}" fill="${col}"/>`;
        path += `<circle cx="${x+r}" cy="${y-r}" r="${r}" fill="${col}"/>`;
        path += `<circle cx="${x-r}" cy="${y+r}" r="${r}" fill="${col}"/>`;
        path += `<circle cx="${x+r}" cy="${y+r}" r="${r}" fill="${col}"/>`;
        path += `<circle cx="${x}" cy="${y}" r="${r*0.7}" fill="#FFF8DC"/>`;
        
        if (Math.random() > 0.33) pathsBg += path; else pathsFg += path;
    }

    grassContainer.innerHTML = `
    <div class="easter-meadow-layer" style="z-index: 1001;">
        <svg class="easter-meadow" viewBox="0 0 ${w} ${hSVG}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g class="easter-sway">
                ${pathsBg}
            </g>
        </svg>
    </div>
    <div class="easter-meadow-layer" style="z-index: 1003;">
        <svg class="easter-meadow" viewBox="0 0 ${w} ${hSVG}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g class="easter-sway" style="animation-delay: -2s;">
                ${pathsFg}
            </g>
        </svg>
    </div>
    `;

    // Add Easter Eggs
    for (let i = 0; i < eggCount; i++) {
        const x = 2 + Math.random() * 96;
        const y = Math.random() * 18; // 0 to 18px off bottom
        const imageSrc = easterEggImages[Math.floor(Math.random() * easterEggImages.length)];
        
        const eggImg = document.createElement('img');
        eggImg.src = imageSrc;
        eggImg.style.position = 'absolute';
        eggImg.style.left = `${x}vw`;
        eggImg.style.bottom = `${y}px`;
        eggImg.style.width = `${15 + Math.random() * 10}px`;
        eggImg.style.height = 'auto';
        eggImg.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        eggImg.style.zIndex = Math.random() > 0.5 ? '1000' : '1004'; // Between grass layers
        
        grassContainer.appendChild(eggImg);
    }
}

let rabbitTimeout;
let isAnimating = false;

function addHoppingRabbit(container) {
    if (!enableBunny) return;

    const rabbitImg = document.createElement("img");
    rabbitImg.id = "rabbit";
    rabbitImg.src = rabbit;
    rabbitImg.alt = "Hopping Easter Bunny";
    rabbitImg.className = "hopping-rabbit";
    
    rabbitImg.style.bottom = "-15px";
    rabbitImg.style.position = "absolute";

    container.appendChild(rabbitImg);

    animateRabbit(rabbitImg);
}

function animateRabbit(rabbit) {
    if (!rabbit || isAnimating) return;
    isAnimating = true;

    const startFromLeft = Math.random() >= 0.5;
    const startX = startFromLeft ? -15 : 115;
    let currentX = startX;
    const endX = startFromLeft ? 115 : -15;
    const direction = startFromLeft ? 1 : -1;

    rabbit.style.transition = 'none';
    const transformScale = startFromLeft ? 'scaleX(-1)' : '';
    // Set bounding box center-of-gravity shift when graphic is flipped
    rabbit.style.transformOrigin = startFromLeft ? '59% 50%' : '50% 50%';
    rabbit.style.transform = `translateX(${currentX}vw) ${transformScale}`;

    const loopDurationMs = jumpDurationMs + pauseDurationMs;

    let startTime = null;

    function animationStep(timestamp) {
        if (!document.querySelector('.easter-container') || rabbit.style.display === 'none') {
            isAnimating = false;
            return;
        }

        if (!startTime) {
            startTime = timestamp;
            const currSrc = rabbit.src.split('?')[0];
            rabbit.src = currSrc + '?t=' + Date.now();
        }

        const elapsed = timestamp - startTime;
        
        const completedLoops = Math.floor(elapsed / loopDurationMs);
        const timeInCurrentLoop = elapsed % loopDurationMs;

        // Determine if we are currently jumping or pausing
        let currentLoopDistance = 0;
        if (timeInCurrentLoop < jumpDurationMs) {
            // We are in the jumping phase
            currentLoopDistance = (timeInCurrentLoop / jumpDurationMs) * jumpDistanceVw;
        } else {
            // We are in the paused phase
            currentLoopDistance = jumpDistanceVw;
        }

        currentX = startX + (completedLoops * jumpDistanceVw + currentLoopDistance) * direction;
        
        rabbit.style.transform = `translateX(${currentX}vw) ${transformScale}`;

        // Check if finished crossing
        if ((direction === 1 && currentX >= endX) || (direction === -1 && currentX <= endX)) {
            let restTime = Math.random() * (maxBunnyRestTime - minBunnyRestTime) + minBunnyRestTime;

            isAnimating = false;
            rabbitTimeout = setTimeout(() => {
                if (!document.body.contains(rabbit)) return;
                animateRabbit(document.querySelector('#rabbit'));
            }, restTime);
            return;
        }

        rabbitTimeout = requestAnimationFrame(animationStep);
    }

    // Start loop
    rabbitTimeout = requestAnimationFrame(animationStep);
}

function initializeEaster() {
    if (!easter) return;

    const container = document.querySelector('.easter-container') || document.createElement("div");

    if (!document.querySelector('.easter-container')) {
        container.className = "easter-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    createEasterGrassAndEggs(container);
    addHoppingRabbit(container);
    
    // Add resize listener to regenerate meadow
    window.addEventListener('resize', () => {
        if(document.querySelector('.easter-container')) {
            createEasterGrassAndEggs(container);
        }
    });

    toggleEaster();
}

initializeEaster();
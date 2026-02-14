const config = window.SeasonalsPluginConfig?.Santa || {};

const santaIsFlying = config.EnableSanta !== undefined ? config.EnableSanta : true; // enable/disable santa
let snowflakesCount = config.SnowflakesCount || 500; // count of snowflakes (recommended values: 300-600)
const snowflakesCountMobile = config.SnowflakesCountMobile || 250; // count of snowflakes on mobile devices (Warning: High values may affect performance)
const snowFallSpeed = config.SnowFallSpeed || 3; // speed of snowfall	(recommended values: 0-5)
const santaSpeed = config.SantaSpeed || 10; // speed of santa in seconds (recommended values: 5-15)
const santaSpeedMobile = config.SantaSpeedMobile || 8; // speed of santa on mobile devices in seconds
const maxSantaRestTime = config.MaxSantaRestTime || 8; // maximum time santa rests in seconds
const minSantaRestTime = config.MinSantaRestTime || 3; // minimum time santa rests in seconds
const maxPresentFallSpeed = config.MaxPresentFallSpeed || 5; // maximum speed of falling presents in seconds
const minPresentFallSpeed = config.MinPresentFallSpeed || 2; // minimum speed of falling presents in seconds

let msgPrinted = false; // flag to prevent multiple console messages
let isMobile = false; // flag to detect mobile devices
let canvas, ctx;  // canvas and context for drawing snowflakes
let animationFrameId; // ID of the animation frame
let animationFrameIdSanta; // ID of the animation frame for santa

// function to check and control the santa
function toggleSnowfall() {
    const santaContainer = document.querySelector('.santa-container');
    if (!santaContainer) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    // hide santa if video/trailer player is active or dashboard is visible
    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        santaContainer.style.display = 'none'; // hide santa
        removeCanvas();
        if (!msgPrinted) {
            console.log('Snowfall hidden');
            msgPrinted = true;
        }
    } else {
        santaContainer.style.display = 'block'; // show santa
        if (!animationFrameId && !animationFrameIdSanta) {
            initializeCanvas();
            snowflakes = createSnowflakes(santaContainer);
            animateAll();
        }

        if (msgPrinted) {
            console.log('Snowfall visible');
            msgPrinted = false;
        }
    }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleSnowfall);

// start observation
observer.observe(document.body, {
    childList: true,    // observe adding/removing of child elements
    subtree: true,      // observe all levels of the DOM tree
    attributes: true    // observe changes to attributes (e.g. class changes)
});

let resizeObserver; // Observer for resize events

function initializeCanvas() {
    if (document.getElementById('snowfallCanvas')) {
        console.warn('Canvas already exists.');
        return;
    }

    const container = document.querySelector('.santa-container');
    if (!container) {
        console.error('Error: No element with class "santa-container" found.');
        return;
    }

    canvas = document.createElement('canvas');
    canvas.id = 'snowfallCanvas';
    container.appendChild(canvas);
    ctx = canvas.getContext('2d');

    // Initial resize
    resizeCanvas(container);

    // Initialize ResizeObserver
    resizeObserver = new ResizeObserver(() => resizeCanvas(container));
    resizeObserver.observe(container);
}

function removeCanvas() {
    const canvas = document.getElementById('snowfallCanvas');
    if (canvas) {
        canvas.remove();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            console.log('Animation frame canceled');
        }
        if (animationFrameIdSanta) {
            cancelAnimationFrame(animationFrameIdSanta);
            animationFrameIdSanta = null;
            console.log('Santa animation frame canceled');
        }

        // Disconnect ResizeObserver
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }

        console.log('Canvas removed');
    }
}

function resizeCanvas(container) {
    if (!canvas) return;

    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Scale snowflakes positions if dimensions changed (to avoid clustering)
    if (oldWidth > 0 && oldHeight > 0 && snowflakes.length > 0) {
        const scaleX = canvas.width / oldWidth;
        const scaleY = canvas.height / oldHeight;

        snowflakes.forEach(flake => {
            flake.x *= scaleX;
            flake.y *= scaleY;
        });
    }
}

function createSnowflakes(container) {
    return Array.from({ length: snowflakesCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 0.6 + 1,
        speed: Math.random() * snowFallSpeed + 1,
        swing: Math.random() * 2 - 1,
    }));
}

// Initialize snowflakes
let snowflakes = [];

function drawSnowflakes() {
    if (!ctx || !canvas) {
        console.error('Error: Canvas or context not found.');
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // empty canvas

    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white'; // color of snowflakes
        ctx.fill();
    });
}

function updateSnowflakes() {
    snowflakes.forEach(flake => {
        flake.y += flake.speed; // downwards movement
        flake.x += flake.swing; // sideways movement

        // reset snowflake if it reaches the bottom
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width; // with new random X position
        }

        // wrap snowflakes around the screen edges
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;
    });
}

// credits: flaticon.com
const presentImages = [
    '../Seasonals/Resources/santa_images/gift1.png',
    '../Seasonals/Resources/santa_images/gift2.png',
    '../Seasonals/Resources/santa_images/gift3.png',
    '../Seasonals/Resources/santa_images/gift4.png',
    '../Seasonals/Resources/santa_images/gift5.png',
    '../Seasonals/Resources/santa_images/gift6.png',
    '../Seasonals/Resources/santa_images/gift7.png',
    '../Seasonals/Resources/santa_images/gift8.png',
];

// credits: https://www.animatedimages.org/img-animated-santa-claus-image-0420-85884.htm
const santaImage = '../Seasonals/Resources/santa_images/santa.gif';


function createSantaElement() {
    const santa = document.createElement('img');
    santa.src = santaImage;
    santa.classList.add('santa');
    const santaContainer = document.querySelector('.santa-container');
    santaContainer.appendChild(santa);
}

function dropPresent(santa, fromLeft) {
    const presentSrc = presentImages[Math.floor(Math.random() * presentImages.length)];
    const present = document.createElement('img');
    present.src = presentSrc;
    present.classList.add('present');
    santa.parentElement.appendChild(present);

    // Get Santa's position
    const santaRect = santa.getBoundingClientRect();
    present.style.left = fromLeft ? `${santaRect.left}px` : `${santaRect.left + santaRect.width - 15}px`;
    present.style.top = `${santaRect.bottom - 50}px`;

    // Start falling
    const duration = Math.random() * (maxPresentFallSpeed - minPresentFallSpeed) + minPresentFallSpeed;
    present.style.transition = `top ${duration}s linear`;
    requestAnimationFrame(() => {
        present.style.top = `${window.innerHeight}px`;
    });

    // Remove from DOM after animation
    present.addEventListener('transitionend', () => {
        present.remove();
    });
}

function reloadSantaGif() {
    const santa = document.querySelector('.santa');
    const src = santa.src;
    santa.src = '';
    santa.src = src;
}

function animateSanta() {
    const santa = document.querySelector('.santa');

    function startAnimation() {
        const santaHeight = santa.offsetHeight;
        if (santaHeight === 0) {
            setTimeout(startAnimation, 100);
            return;
        }
        // console.log('Santa height: ', santaHeight);

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const fromLeft = Math.random() < 0.5;
        const startX = fromLeft ? -220 : screenWidth + 220;
        const endX = fromLeft ? screenWidth + 220 : -220;
        const startY = Math.random() * (screenHeight / 5) + santaHeight; // Restrict to upper screen
        const endY = Math.random() * (screenHeight / 5) + santaHeight; // Restrict to upper screen
        const angle = Math.random() * 16 - 8; // -8 to 8 degrees

        santa.style.left = `${startX}px`;
        santa.style.top = `${startY}px`;
        santa.style.transform = `rotate(${angle}deg) ${fromLeft ? 'scaleX(-1)' : 'scaleX(1)'}`; // Mirror if not from left

        let duration;
        if (isMobile) {
            duration = santaSpeedMobile * 1000;
        } else {
            duration = santaSpeed * 1000;
        }
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const startTime = performance.now();

        function move() {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentY = startY + deltaY * progress - 50 * Math.sin(progress * Math.PI);
            santa.style.left = `${startX + deltaX * progress}px`;
            santa.style.top = `${currentY}px`;

            if (Math.random() < 0.05) { // 5% chance to drop a present
                dropPresent(santa, fromLeft);
            }

            if (progress < 1) {
                animationFrameIdSanta = requestAnimationFrame(move);
            } else {
                const pause = Math.random() * ((maxSantaRestTime - minSantaRestTime) * 1000) + minSantaRestTime * 1000;
                setTimeout(animateSanta, pause);
            }
        }

        animationFrameIdSanta = requestAnimationFrame(move);
    }

    reloadSantaGif();

    startAnimation();
}


function animateAll() {
    drawSnowflakes();
    updateSnowflakes();
    animationFrameId = requestAnimationFrame(animateAll);
}

// initialize santa
function initializeSanta() {
    if (!santaIsFlying) {
        console.warn('Sante is disabled.');
        return; // exit if santa is disabled
    }
    const container = document.querySelector('.santa-container');
    if (container) {
        const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
        if (screenWidth < 768) { // lower count of snowflakes on mobile devices
            isMobile = true;
            console.log('Mobile device detected. Reducing snowflakes count.');
            snowflakesCount = snowflakesCountMobile;
        }

        console.log('Santa enabled.');
        initializeCanvas();
        snowflakes = createSnowflakes(container);
        createSantaElement();
        animateAll();
        animateSanta();
    }
}

initializeSanta();
const config = window.SeasonalsPluginConfig?.Snowstorm || {};

const snowstorm = config.EnableSnowstorm !== undefined ? config.EnableSnowstorm : true; // enable/disable snowstorm
let snowflakesCount = config.SnowflakesCount !== undefined ? config.SnowflakesCount : 500; // count of snowflakes
const snowflakesCountMobile = config.SnowflakesCountMobile !== undefined ? config.SnowflakesCountMobile : 250; // count of snowflakes on mobile
const snowFallSpeed = config.Speed !== undefined ? config.Speed : 6; // speed of snowstorm
const horizontalWind = config.HorizontalWind !== undefined ? config.HorizontalWind : 4; // horizontal wind strength
const verticalVariation = config.VerticalVariation !== undefined ? config.VerticalVariation : 2; // vertical variation

let msgPrinted = false; // flag to prevent multiple console messages

let canvas, ctx;  // canvas and context for drawing snowflakes
let animationFrameId; // ID of the animation frame

// function to check and control the snowstorm
function toggleSnowstorm() {
  const snowstormContainer = document.querySelector('.snowstorm-container');
  if (!snowstormContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide snowstorm if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    snowstormContainer.style.display = 'none'; // hide snowstorm
    removeCanvas();
    if (!msgPrinted) {
      console.log('Snowstorm hidden');
      msgPrinted = true;
    }
  } else {
    snowstormContainer.style.display = 'block'; // show snowstorm
    if (!animationFrameId) {
      initializeCanvas();
      snowflakes = createSnowflakes(snowstormContainer);
      animateSnowstorm();
    } else {
      console.warn('could not initialize snowfall: animation frame is already running');
    }

    if (msgPrinted) {
      console.log('Snowstorm visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleSnowstorm);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

let resizeObserver; // Observer for resize events

function initializeCanvas() {
  if (document.getElementById('snowfallCanvas')) {
    console.warn('Canvas already exists.');
    return;
  }

  const container = document.querySelector('.snowstorm-container');
  if (!container) {
    console.error('Error: No element with class "snowstorm-container" found.');
    return;
  }

  canvas = document.createElement('canvas');
  canvas.id = 'snowstormCanvas';
  container.appendChild(canvas);
  ctx = canvas.getContext('2d');

  // Initial resize
  resizeCanvas(container);

  // Initialize ResizeObserver
  resizeObserver = new ResizeObserver(() => resizeCanvas(container));
  resizeObserver.observe(container);
}

function removeCanvas() {
  const canvas = document.getElementById('snowstormCanvas');
  if (canvas) {
    canvas.remove();
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
      console.log('Animation frame canceled');
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
    radius: Math.random() * 1.2 + 1,
    fallspeed: Math.random() * snowFallSpeed + 2,
    horizontal: Math.random() * horizontalWind * 2 - horizontalWind,
    vertical: Math.random() * verticalVariation * 2 - verticalVariation,
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
    flake.y += flake.fallspeed + flake.vertical; // downwards movement
    flake.x += flake.horizontal; // sideways movement

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

function animateSnowstorm() {
  drawSnowflakes();
  updateSnowflakes();
  animationFrameId = requestAnimationFrame(animateSnowstorm);
}

// initialize snowfall
function initializeSnowstorm() {
  if (!snowstorm) {
    console.warn('Snowstorm is disabled.');
    return; // exit if snowfall is disabled
  }
  const container = document.querySelector('.snowstorm-container');
  if (container) {
    const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    if (isMobile) { // lower count of snowflakes on mobile devices
      console.log('Mobile device detected. Reducing snowflakes count.');
      snowflakesCount = snowflakesCountMobile;
    }

    console.log('Snowstorm enabled.');
    initializeCanvas();
    snowflakes = createSnowflakes(container);
    animateSnowstorm();
  }
}

initializeSnowstorm();

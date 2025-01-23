const snowstorm = true; // enable/disable snowstorm
let snowflakesCount = 500; // count of snowflakes (recommended values: 300-600)
const snowflakesCountMobile = 250; // count of snowflakes on mobile devices
const snowFallSpeed = 6; // speed of snowfall	(recommended values: 4-8)
const horizontalWind = 4; // horizontal wind speed (recommended value: 4)
const verticalVariation = 2; // vertical variation (recommended value: 2)

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

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});


function initializeCanvas() {
  const container = document.querySelector('.snowstorm-container');
  if (!container) {
    console.error('Error: No element with class "snowfall-container" found.');
    return;
  }

  canvas = document.createElement('canvas');
  canvas.id = 'snowstormCanvas';
  container.appendChild(canvas);
  ctx = canvas.getContext('2d');

  resizeCanvas(container);
  window.addEventListener('resize', () => resizeCanvas(container));
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
    console.log('Canvas removed');
  }
}

function resizeCanvas(container) {
  if (!canvas) return;
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
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
    const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
    if (screenWidth < 768) { // lower count of snowflakes on mobile devices
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

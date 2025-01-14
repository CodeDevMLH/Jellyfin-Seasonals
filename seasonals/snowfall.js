const snowfall = true; // enable/disable snowfall
let snowflakesCount = 500; // count of snowflakes (recommended values: 300-600)
const snowflakesCountMobile = 250; // count of snowflakes on mobile devices
const snowFallSpeed = 3; // speed of snowfall	(recommended values: 0-5)

let msgPrinted = false; // flag to prevent multiple console messages

let canvas, ctx;  // canvas and context for drawing snowflakes

// function to check and control the snowfall
function toggleSnowfall() {
  const snowfallContainer = document.querySelector('.snowfall-container');
  if (!snowfallContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide snowfall if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    snowfallContainer.style.display = 'none'; // hide snowfall
    if (!msgPrinted) {
      console.log('Snowfall hidden');
      msgPrinted = true;
    }
  } else {
    snowfallContainer.style.display = 'block'; // show snowfall
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


function initializeCanvas() {
  const container = document.querySelector('.snowfall-container');
  if (!container) {
    console.error('Error: No element with class "snowfall-container" found.');
    return;
  }

  canvas = document.createElement('canvas');
  canvas.id = 'snowfallCanvas';
  container.appendChild(canvas);
  ctx = canvas.getContext('2d');

  resizeCanvas(container);
  window.addEventListener('resize', () => resizeCanvas(container));
}

function resizeCanvas(container) {
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function createSnowflakes(container) {
  return Array.from({ length: snowflakesCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2 + 1,
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

function animateSnowfall() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(animateSnowfall);
}

// initialize snowfall
function initializeSnowfall() {
  if (!snowfall) {
    console.warn('Snowfall is disabled.');
    return; // exit if snowfall is disabled
  }
  const container = document.querySelector('.snowfall-container');
  if (container) {
    const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
    if (screenWidth < 768) { // lower count of snowflakes on mobile devices
      console.log('Mobile device detected. Reducing snowflakes count.');
      snowflakesCount = snowflakesCountMobile;
    }

    console.log('Snowfall enabled.');
    initializeCanvas();
    snowflakes = createSnowflakes(container);
    animateSnowfall();
  }
}

initializeSnowfall();
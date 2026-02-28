const config = window.SeasonalsPluginConfig?.Rain || {};

const enabled = config.EnableRain !== undefined ? config.EnableRain : true; // enable/disable rain
const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
const elementCount = isMobile ? (config.RaindropCountMobile || 150) : (config.RaindropCount || 300); // count of raindrops
const rainSpeed = config.RainSpeed !== undefined ? config.RainSpeed : 1.0; // speed of rain

let msgPrinted = false;

// Toggle Function
function toggleRain() {
  const container = document.querySelector('.rain-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Rain hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Rain visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleRain);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createElements() {
  const container = document.querySelector('.rain-container') || document.createElement('div');

  if (!document.querySelector('.rain-container')) {
    container.className = 'rain-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  for (let i = 0; i < elementCount; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop-pure';
    
    drop.style.left = `${Math.random() * 140}vw`;
    drop.style.top = `${-20 - Math.random() * 50}vh`;

    const duration = (0.5 + Math.random() * 0.5) / (rainSpeed || 1);
    drop.style.animation = `pure-rain ${duration}s linear infinite`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    drop.style.opacity = Math.random() * 0.5 + 0.3;

    container.appendChild(drop);
  }
}

function initializeRain() {
  if (!enabled) return;
  createElements();
  toggleRain();
}

initializeRain();

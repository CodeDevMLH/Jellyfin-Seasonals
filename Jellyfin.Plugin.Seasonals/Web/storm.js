const config = window.SeasonalsPluginConfig?.Storm || {};

const enabled = config.EnableStorm !== undefined ? config.EnableStorm : true; // enable/disable storm
const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
const elementCount = isMobile ? (config.RaindropCountMobile || 150) : (config.RaindropCount || 300); // count of raindrops
const enableLightning = config.EnableLightning !== undefined ? config.EnableLightning : true; // enable/disable lightning
const rainSpeed = config.RainSpeed !== undefined ? config.RainSpeed : 1.0; // speed of rain

let msgPrinted = false;

// Toggle Function
function toggleStorm() {
  const container = document.querySelector('.storm-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Storm hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Storm visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleStorm);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createElements() {
  const container = document.querySelector('.storm-container') || document.createElement('div');

  if (!document.querySelector('.storm-container')) {
    container.className = 'storm-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  for (let i = 0; i < elementCount; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    
    drop.style.left = `${Math.random() * 140}vw`;
    drop.style.top = `${-20 - Math.random() * 50}vh`;

    const duration = (0.5 + Math.random() * 0.5) / (rainSpeed || 1);
    drop.style.animation = `stormy-rain ${duration}s linear infinite`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    drop.style.opacity = Math.random() * 0.5 + 0.3;

    container.appendChild(drop);
  }

  if (enableLightning) {
      const flash = document.createElement('div');
      flash.className = 'lightning-flash';
      container.appendChild(flash);

      function triggerFlash() {
          const nextFlashDelay = 5000 + Math.random() * 10000;
          
          setTimeout(() => {
              flash.style.opacity = '0.8';
              setTimeout(() => { flash.style.opacity = '0'; }, 50);
              setTimeout(() => { flash.style.opacity = '0.5'; }, 100);
              setTimeout(() => { flash.style.opacity = '0'; }, 150);
              
              triggerFlash();
          }, nextFlashDelay);
      }

      triggerFlash();
  }
}

function initializeStorm() {
  if (!enabled) return;
  createElements();
  toggleStorm();
}

initializeStorm();

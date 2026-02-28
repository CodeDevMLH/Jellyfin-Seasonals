const config = window.SeasonalsPluginConfig?.Pride || {};

const enabled = config.EnablePride !== undefined ? config.EnablePride : true; // enable/disable pride
const elementCount = config.HeartCount !== undefined ? config.HeartCount : 20; // count of heart
const heartSize = config.HeartSize !== undefined ? config.HeartSize : 1.5; // size of hearts
const colorHeader = config.ColorHeader !== undefined ? config.ColorHeader : true; // optionally color the header with pride colors

let msgPrinted = false;

function togglePride() {
  const container = document.querySelector('.pride-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Pride hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Pride visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(togglePride);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createElements() {
  const container = document.querySelector('.pride-container') || document.createElement('div');

  if (!document.querySelector('.pride-container')) {
    container.className = 'pride-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  if (colorHeader) {
      document.body.classList.add('pride-active');
  }

  const cleanupObserver = new MutationObserver(() => {
      if (!document.querySelector('.pride-container')) {
          document.body.classList.remove('pride-active');
      }
  });
  cleanupObserver.observe(document.body, { childList: true });

  const heartEmojis = ['❤️', '🧡', '💛', '💚', '💙', '💜'];

  for (let i = 0; i < elementCount; i++) {
    const el = document.createElement('div');
    el.className = 'pride-heart';
    
    el.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    el.style.fontSize = `${heartSize}rem`;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${5 + Math.random() * 5}s`;
    el.style.animationDelay = `${Math.random() * 5}s`;
    el.style.marginLeft = `${(Math.random() - 0.5) * 100}px`;

    container.appendChild(el);
  }
}

function initializePride() {
  if (!enabled) return;
  createElements();
  togglePride();
}

initializePride();

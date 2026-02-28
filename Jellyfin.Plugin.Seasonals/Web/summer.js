const config = window.SeasonalsPluginConfig?.Summer || {};

const summer = config.EnableSummer !== undefined ? config.EnableSummer : true; // enable/disable summer
const bubbleCount = config.BubbleCount !== undefined ? config.BubbleCount : 30; // count of bubbles
const dustCount = config.DustCount !== undefined ? config.DustCount : 50; // count of dust particles
const symbolCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 2; // Devisor to reduce number of objects on mobile
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations

let msgPrinted = false;

function toggleSummer() {
  const summerContainer = document.querySelector('.summer-container');
  if (!summerContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    summerContainer.style.display = 'none';
    if (!msgPrinted) {
      console.log('Summer hidden');
      msgPrinted = true;
    }
  } else {
    summerContainer.style.display = 'block';
    if (msgPrinted) {
      console.log('Summer visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleSummer);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createBubble(container) {
    const bubble = document.createElement('div');

    bubble.classList.add('summer-bubble');

    // Random horizontal position
    const randomLeft = Math.random() * 100;
    bubble.style.left = `${randomLeft}%`;

    // MARK: BUBBLE SIZE
    const size = Math.random() * 20 + 10; // 10-30px bubbles
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Animation properties
    const duration = (Math.random() * 10 + 5);
    const delay = Math.random() * 10;
    
    if (enableDifferentDuration) {
        bubble.style.animationDuration = `${duration}s`;
    }
    bubble.style.animationDelay = `${delay}s`;

    container.appendChild(bubble);
}

function createDust(container) {
    const dust = document.createElement('div');

    dust.classList.add('summer-dust');

    // Random horizontal position
    const randomLeft = Math.random() * 100;
    dust.style.left = `${randomLeft}%`;

    // MARK: DUST SIZE
    const size = Math.random() * 3 + 1; // 1-4px dust
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;

    // Animation properties
    const duration = (Math.random() * 20 + 10); // Dust is slower
    const delay = Math.random() * 10;
    
    if (enableDifferentDuration) {
        dust.style.animationDuration = `${duration}s`;
    }
    dust.style.animationDelay = `${delay}s`;

    container.appendChild(dust);
}

function initSummerObjects() {
    let container = document.querySelector('.summer-container');
    if (!container) {
        container = document.createElement("div");
        container.className = "summer-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    let limitBubbles = isMobile ? Math.floor(bubbleCount / Math.max(1, symbolCountMobile)) : bubbleCount;
    let limitDust = isMobile ? Math.floor(dustCount / Math.max(1, symbolCountMobile)) : dustCount;

    // Initial bubbles
    for (let i = 0; i < limitBubbles; i++) {
        createBubble(container);
    }
    
    // Initial dust
    for (let i = 0; i < limitDust; i++) {
        createDust(container);
    }
}

function initializeSummer() {
    if (!summer) return;
    initSummerObjects();
    toggleSummer();
}

initializeSummer();

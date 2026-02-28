const config = window.SeasonalsPluginConfig?.Spooky || {};

const spooky = config.EnableSpooky !== undefined ? config.EnableSpooky : true; // enable/disable spooky
const spookyCount = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of symbols
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const enableSpookySway = config.EnableSpookySway !== undefined ? config.EnableSpookySway : true; // enable/disable spooky sway
const spookySize = config.SpookySize !== undefined ? config.SpookySize : 20; // size of elements
const spookyGlowSize = config.SpookyGlowSize !== undefined ? config.SpookyGlowSize : 2; // size of element glow

const spookyImages = [
  "../Seasonals/Resources/halloween_images/ghost_20x20.png",
  "../Seasonals/Resources/halloween_images/bat_20x20.png",
  "../Seasonals/Resources/halloween_images/pumpkin_20x20.png",
];

let msgPrinted = false;

// function to check and control the spooky theme
function toggleSpooky() {
  const spookyContainer = document.querySelector('.spooky-container');
  if (!spookyContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    spookyContainer.style.display = 'none';
    if (!msgPrinted) {
      console.log('Spooky Theme hidden');
      msgPrinted = true;
    }
  } else {
    spookyContainer.style.display = 'block';
    if (msgPrinted) {
      console.log('Spooky Theme visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleSpooky);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createSpooky() {
  const container = document.querySelector('.spooky-container') || document.createElement("div");

  if (!document.querySelector('.spooky-container')) {
    container.className = "spooky-container";
    container.setAttribute("aria-hidden", "true");
    document.body.appendChild(container);
  }

  // Base items per image
  for (let i = 0; i < 4; i++) {
    spookyImages.forEach(imageSrc => {
      const spookyOuter = document.createElement("div");
      spookyOuter.className = "spooky";
      
      const spookyInner = document.createElement("div");
      spookyInner.className = "spooky-inner";
      spookyInner.style.width = `${spookySize}px`;
      if (!enableSpookySway) spookyInner.style.animationName = 'none';

      const img = document.createElement("img");
      img.src = imageSrc;
      img.style.filter = spookyGlowSize > 0 ? `drop-shadow(0 0 ${spookyGlowSize}px rgba(255, 120, 0, 0.4))` : 'none';

      // randomize fall and sway (shake) speeds like halloween.js
      if (enableDifferentDuration) {
        const randomAnimationDuration = Math.random() * 10 + 6; // fall duration (6s to 10s)
        const randomAnimationDuration2 = Math.random() * 5 + 2; // shake duration (2s to 5s)
        spookyOuter.style.animationDuration = `${randomAnimationDuration}s`;
        spookyInner.style.animationDuration = `${randomAnimationDuration2}s`;
      }

      const randomLeft = Math.random() * 100;
      const randomAnimationDelay = Math.random() * 10;
      const randomAnimationDelay2 = Math.random() * 3;
      
      spookyOuter.style.left = `${randomLeft}%`;
      spookyOuter.style.animationDelay = `${randomAnimationDelay}s`;
      spookyInner.style.animationDelay = `${randomAnimationDelay2}s`;

      spookyInner.appendChild(img);
      spookyOuter.appendChild(spookyInner);
      container.appendChild(spookyOuter);
    });
  }

  for (let i = 0; i < spookyCount; i++) {
    const spookyOuter = document.createElement("div");
    spookyOuter.className = "spooky";
    
    const spookyInner = document.createElement("div");
    spookyInner.className = "spooky-inner";
    spookyInner.style.width = `${spookySize}px`;
    if (!enableSpookySway) spookyInner.style.animationName = 'none';

    const imageSrc = spookyImages[Math.floor(Math.random() * spookyImages.length)];
    const img = document.createElement("img");
    img.src = imageSrc;
    img.style.filter = spookyGlowSize > 0 ? `drop-shadow(0 0 ${spookyGlowSize}px rgba(255, 120, 0, 0.4))` : 'none';

    const randomLeft = Math.random() * 100;
    const randomAnimationDelay = Math.random() * 10;
    const randomAnimationDelay2 = Math.random() * 3;

    spookyOuter.style.left = `${randomLeft}%`;
    spookyOuter.style.animationDelay = `${randomAnimationDelay}s`;
    spookyInner.style.animationDelay = `${randomAnimationDelay2}s`;

    if (enableDifferentDuration) {
        const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
        const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
        spookyOuter.style.animationDuration = `${randomAnimationDuration}s`;
        spookyInner.style.animationDuration = `${randomAnimationDuration2}s`;
    }

    spookyInner.appendChild(img);
    spookyOuter.appendChild(spookyInner);
    container.appendChild(spookyOuter);
  }
  
  console.log('Spooky symbols added');
}

// initialize spooky
function initializeSpooky() {
  if (!spooky) return;
  createSpooky();
  toggleSpooky();
}

// initialize script
initializeSpooky();

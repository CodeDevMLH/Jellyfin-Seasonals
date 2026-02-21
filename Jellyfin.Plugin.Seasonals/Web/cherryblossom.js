const config = window.SeasonalsPluginConfig?.CherryBlossom || {};

const cherryBlossom = config.EnableCherryBlossom !== undefined ? config.EnableCherryBlossom : true;
const petalCount = config.PetalCount || 25;
const randomCherryBlossom = config.EnableRandomCherryBlossom !== undefined ? config.EnableRandomCherryBlossom : true;
const randomCherryBlossomMobile = config.EnableRandomCherryBlossomMobile !== undefined ? config.EnableRandomCherryBlossomMobile : false;
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true;

let msgPrinted = false;

function toggleCherryBlossom() {
  const container = document.querySelector('.cherryblossom-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('CherryBlossom hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('CherryBlossom visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleCherryBlossom);
observer.observe(document.body, { childList: true, subtree: true, attributes: true });

function createPetal(container) {
    const petal = document.createElement('div');
    petal.classList.add('cherryblossom-petal');

    const type = Math.random() > 0.5 ? 'type1' : 'type2';
    petal.classList.add(type);

    const color = Math.random() > 0.7 ? 'darker' : 'lighter';
    petal.classList.add(color);

    const randomLeft = Math.random() * 100;
    petal.style.left = `${randomLeft}%`;

    const size = Math.random() * 0.5 + 0.5;
    petal.style.transform = `scale(${size})`;

    const duration = Math.random() * 5 + 8;
    const delay = Math.random() * 10;
    const swayDuration = Math.random() * 2 + 2;

    if (enableDifferentDuration) {
        petal.style.animationDuration = `${duration}s, ${swayDuration}s`;
    }
    petal.style.animationDelay = `${delay}s, ${Math.random() * 3}s`;

    container.appendChild(petal);
}

function addRandomObjects() {
    const container = document.querySelector('.cherryblossom-container');
    if (!container) return;

    for (let i = 0; i < petalCount; i++) {
        createPetal(container);
    }
}

function initObjects() {
    let container = document.querySelector('.cherryblossom-container');
    if (!container) {
        container = document.createElement("div");
        container.className = "cherryblossom-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    // Initial batch
    for (let i = 0; i < 15; i++) {
        createPetal(container);
    }
}

function initializeCherryBlossom() {
    if (!cherryBlossom) return;
    initObjects();
    toggleCherryBlossom();

    const screenWidth = window.innerWidth;
    if (randomCherryBlossom && (screenWidth > 768 || randomCherryBlossomMobile)) {
        addRandomObjects();
    }
}

initializeCherryBlossom();

const config = window.SeasonalsPluginConfig?.Resurrection || {};

const enableResurrection = config.EnableResurrection !== undefined ? config.EnableResurrection : true;
const enableRandomSymbols = config.EnableRandomSymbols !== undefined ? config.EnableRandomSymbols : true;
const enableRandomSymbolsMobile = config.EnableRandomSymbolsMobile !== undefined ? config.EnableRandomSymbolsMobile : false;
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true;
const symbolCount = config.SymbolCount || 12;

let animationEnabled = true;
let statusLogged = false;

const images = [
    '../Seasonals/Resources/resurrection_images/crosses.png',
    '../Seasonals/Resources/resurrection_images/palm-branch.png',
    '../Seasonals/Resources/resurrection_images/draped-cross.png',
    '../Seasonals/Resources/resurrection_images/empty-tomb.png',
    '../Seasonals/Resources/resurrection_images/he-is-risen.png',
    '../Seasonals/Resources/resurrection_images/crown-of-thorns.png',
    '../Seasonals/Resources/resurrection_images/risen-lord.png',
    '../Seasonals/Resources/resurrection_images/dove.png'
];

function toggleResurrection() {
    const container = document.querySelector('.resurrection-container');
    if (!container) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    animationEnabled = !(videoPlayer || trailerPlayer || isDashboard || hasUserMenu);
    container.style.display = animationEnabled ? 'block' : 'none';

    if (!animationEnabled && !statusLogged) {
        console.log('Resurrection hidden');
        statusLogged = true;
    } else if (animationEnabled && statusLogged) {
        console.log('Resurrection visible');
        statusLogged = false;
    }
}

const observer = new MutationObserver(toggleResurrection);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});

function createSymbol(imageSrc, leftPercent, delaySeconds) {
    const symbol = document.createElement('div');
    symbol.className = 'resurrection-symbol';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = '';

    symbol.style.left = `${leftPercent}%`;
    symbol.style.animationDelay = `${delaySeconds}s, ${Math.random() * 3}s`;

    if (enableDifferentDuration) {
        const fallDuration = Math.random() * 7 + 7;
        const swayDuration = Math.random() * 4 + 2;
        symbol.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    }

    symbol.appendChild(img);
    return symbol;
}

function addSymbols(count) {
    const container = document.querySelector('.resurrection-container');
    if (!container || !enableRandomSymbols) return;

    const isDesktop = window.innerWidth > 768;
    if (!isDesktop && !enableRandomSymbolsMobile) return;

    for (let i = 0; i < count; i++) {
        const imageSrc = images[Math.floor(Math.random() * images.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        container.appendChild(createSymbol(imageSrc, left, delay));
    }
}

function initResurrection() {
    let container = document.querySelector('.resurrection-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'resurrection-container';
        container.setAttribute('aria-hidden', 'true');
        document.body.appendChild(container);
    }

    // Place one of each of the 8 provided resurrection images first.
    images.forEach((imageSrc, index) => {
        const left = (index + 1) * (100 / (images.length + 1));
        const delay = Math.random() * 8;
        container.appendChild(createSymbol(imageSrc, left, delay));
    });

    const extraCount = Math.max(symbolCount - images.length, 0);
    addSymbols(extraCount);
}

function initializeResurrection() {
    if (!enableResurrection) return;
    initResurrection();
    toggleResurrection();
}

initializeResurrection();

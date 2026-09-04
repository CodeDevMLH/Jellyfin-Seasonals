const config = window.SeasonalsPluginConfig?.Frost || {};

const frost = config.EnableFrost !== undefined ? config.EnableFrost : true; // enable/disable frost

let msgPrinted = false;

function toggleFrost() {
    const container = document.querySelector('.frost-container');
    if (!container) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer:not(.hide)');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer:not(.hide)');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const isPreferences = window.location.href.includes('mypreferences') || !!document.querySelector('#myPreferencesMenuPage');

    if (videoPlayer || trailerPlayer || isDashboard || isPreferences) {
        container.style.display = 'none';
        if (!msgPrinted) {
            console.log('🎉 Seasonals: Frost hidden');
            msgPrinted = true;
        }
    } else {
        container.style.display = 'block';
        if (msgPrinted) {
            console.log('🎉 Seasonals: Frost visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleFrost);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createFrost(container) {
    const frostLayer = document.createElement('div');
    frostLayer.className = 'frost-layer';

    const frostCrystals = document.createElement('div');
    frostCrystals.className = 'frost-crystals';
    
    // An SVG filter to make things look "frozen"/distorted around the edges
    const svgFilter = document.createElement('div');
    svgFilter.innerHTML = `
        <svg style="display:none;">
            <filter id="frost-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </svg>
    `;
    
    frostLayer.appendChild(frostCrystals);
    container.appendChild(frostLayer);
    container.appendChild(svgFilter);
}

function initializeFrost() {
    if (!frost) return;

    const container = document.querySelector('.frost-container') || document.createElement("div");

    if (!document.querySelector('.frost-container')) {
        container.className = "frost-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    createFrost(container);
}

initializeFrost();

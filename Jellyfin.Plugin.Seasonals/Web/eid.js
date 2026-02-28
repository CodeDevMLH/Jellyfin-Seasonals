const config = window.SeasonalsPluginConfig?.Eid || {};
const eid = config.EnableEid !== undefined ? config.EnableEid : true; // enable/disable eid
const lanternCount = config.LanternCount !== undefined ? config.LanternCount : 8; // count of lantern
const lanternCountMobile = config.LanternCountMobile !== undefined ? config.LanternCountMobile : 3; // count of lantern on mobile

const eidSymbols = ['🌙', '⭐', '✨'];

let msgPrinted = false;

function toggleEid() {
    const container = document.querySelector('.eid-container');
    if (!container) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        container.style.display = 'none';
        if (!msgPrinted) {
            console.log('Eid hidden');
            msgPrinted = true;
        }
    } else {
        container.style.display = 'block';
        if (msgPrinted) {
            console.log('Eid visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleEid);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createEid(container) {
    const starCount = 20;
    
    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    let activeLanternCount = isMobile ? lanternCountMobile : lanternCount;

    // Create evenly spaced lanterns
    const segmentWidth = 100 / activeLanternCount;
    for (let i = 0; i < activeLanternCount; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'eid-symbol lantern-rope';
        
        // Base position within segment, with slight random jitter
        const baseLeft = (i * segmentWidth) + (segmentWidth * 0.2);
        const jitter = Math.random() * (segmentWidth * 0.6);
        symbol.style.left = `${baseLeft + jitter}%`;
        
        symbol.style.animationDelay = `${Math.random() * -4}s`;
        const ropeLen = 15 + Math.random() * 15; // 15vh to 30vh
        symbol.style.height = `${ropeLen}vh`;

        const lanternSpan = document.createElement('span');
        lanternSpan.className = 'lantern-emoji';
        lanternSpan.textContent = '🏮';
        symbol.appendChild(lanternSpan);
        
        container.appendChild(symbol);
    }
    
    // Create random floating stars
    for (let i = 0; i < starCount; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'eid-symbol floating-star';
        symbol.textContent = eidSymbols[Math.floor(Math.random() * eidSymbols.length)];
        symbol.style.left = `${Math.random() * 100}%`;
        symbol.style.top = `${Math.random() * 100}%`;
        symbol.style.animationDelay = `${Math.random() * -5}s`;
        
        symbol.addEventListener('animationiteration', () => {
            symbol.style.left = `${Math.random() * 90 + 5}%`;
            symbol.style.top = `${Math.random() * 100}%`;
        });

        container.appendChild(symbol);
    }
}

function initializeEid() {
    if (!eid) return;
    const container = document.querySelector('.eid-container') || document.createElement("div");
    if (!document.querySelector('.eid-container')) {
        container.className = "eid-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    createEid(container);
    toggleEid();
}
initializeEid();

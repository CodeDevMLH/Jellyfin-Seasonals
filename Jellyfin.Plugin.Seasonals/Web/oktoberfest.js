const config = window.SeasonalsPluginConfig?.Oktoberfest || {};
const oktoberfest = config.EnableOktoberfest !== undefined ? config.EnableOktoberfest : true; // enable/disable oktoberfest
const symbolCount = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of symbols
const symbolCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 10; // count of symbols on mobile
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations

const oktoberfestSymbols = ['🥨', '🍺', '🍻', '🥨', '🥨'];

let msgPrinted = false;

// function to check and control the oktoberfest
function toggleOktoberfest() {
  const oktoberfestContainer = document.querySelector('.oktoberfest-container');
  if (!oktoberfestContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide oktoberfest if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    oktoberfestContainer.style.display = 'none'; // hide oktoberfest
    if (!msgPrinted) {
      console.log('Oktoberfest hidden');
      msgPrinted = true;
    }
  } else {
    oktoberfestContainer.style.display = 'block'; // show oktoberfest
    if (msgPrinted) {
      console.log('Oktoberfest visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleOktoberfest);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createOktoberfest(container, count) {
    for (let i = 0; i < count; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'oktoberfest-symbol';
        symbol.textContent = oktoberfestSymbols[Math.floor(Math.random() * oktoberfestSymbols.length)];
        symbol.style.left = `${Math.random() * 100}%`;
        symbol.style.animationDelay = `${Math.random() * 10}s, ${Math.random() * 5}s`;
        const duration1 = Math.random() * 5 + 8;
        const duration2 = Math.random() * 3 + 3;
        if (enableDifferentDuration) {
            symbol.style.animationDuration = `${duration1}s, ${duration2}s`;
        }
        
        container.appendChild(symbol);
    }
}

function initializeOktoberfest() {
    if (!oktoberfest) return;
    const container = document.querySelector('.oktoberfest-container') || document.createElement("div");
    if (!document.querySelector('.oktoberfest-container')) {
        container.className = "oktoberfest-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    const count = !isMobile ? symbolCount : symbolCountMobile;

    createOktoberfest(container, count);
}
initializeOktoberfest();

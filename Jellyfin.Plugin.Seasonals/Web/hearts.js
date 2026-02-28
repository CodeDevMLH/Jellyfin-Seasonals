const config = window.SeasonalsPluginConfig?.Hearts || {};

const hearts = config.EnableHearts !== undefined ? config.EnableHearts : true; // enable/disable hearts
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const heartsCount = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of symbol
const heartsCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 10; // count of symbol on mobile

// Array of hearts characters
const heartSymbols = ['❤️', '💕', '💞', '💓', '💗', '💖'];

let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the hearts
function toggleHearts() {
  const heartsContainer = document.querySelector('.hearts-container');
  if (!heartsContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide hearts if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    heartsContainer.style.display = 'none'; // hide hearts
    if (!msgPrinted) {
      console.log('Hearts hidden');
      msgPrinted = true;
    }
  } else {
    heartsContainer.style.display = 'block'; // show hearts
    if (msgPrinted) {
      console.log('Hearts visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleHearts);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function initHearts(count) {
  let heartsContainer = document.querySelector('.hearts-container'); // get the hearts container
  if (!heartsContainer) {
    heartsContainer = document.createElement("div");
    heartsContainer.className = "hearts-container";
    heartsContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(heartsContainer);
  }

  console.log('Adding heart symbols');

  for (let i = 0; i < count; i++) {
    // create a new hearts elements
    const heartsDiv = document.createElement("div");
    heartsDiv.className = "heart";

    // pick a random hearts symbol
    heartsDiv.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];


    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = -(Math.random() * 16); // delay (-16s to 0s)
    const randomAnimationDelay2 = -(Math.random() * 5); // delay (-5s to 0s)

    // apply styles
    heartsDiv.style.left = `${randomLeft}%`;
    heartsDiv.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 16 + 12; // delay (12s to 16s)
      const randomAnimationDuration2 = Math.random() * 7 + 3; // delay (3s to 7s)
      heartsDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    // add the hearts to the container
    heartsContainer.appendChild(heartsDiv);
  }
  console.log('Heart symbols added');
}

// initialize hearts
function initializeHearts() {
  if (!hearts) return; // exit if hearts is disabled

  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
  const count = !isMobile ? heartsCount : heartsCountMobile;

  initHearts(count);
  toggleHearts();
}

initializeHearts();
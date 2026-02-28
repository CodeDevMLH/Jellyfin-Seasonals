const config = window.SeasonalsPluginConfig?.Christmas || {};

const christmas = config.EnableChristmas !== undefined ? config.EnableChristmas : true; // enable/disable christmas
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const christmasCount = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of symbol
const christmasCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 10; // count of symbol on mobile

// Array of christmas characters
const christmasSymbols = ['❆', '🎁', '❄️', '🎁', '🎅', '🎊', '🎁', '🎉'];

let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the christmas
function toggleChristmas() {
  const christmasContainer = document.querySelector('.christmas-container');
  if (!christmasContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide christmas if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    christmasContainer.style.display = 'none'; // hide christmas
    if (!msgPrinted) {
      console.log('Christmas hidden');
      msgPrinted = true;
    }
  } else {
    christmasContainer.style.display = 'block'; // show christmas
    if (msgPrinted) {
      console.log('Christmas visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleChristmas);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function initChristmas(count) {
  let christmasContainer = document.querySelector('.christmas-container'); // get the christmas container
  if (!christmasContainer) {
    christmasContainer = document.createElement("div");
    christmasContainer.className = "christmas-container";
    christmasContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(christmasContainer);
  }

  console.log('Adding christmas');

  for (let i = 0; i < count; i++) {
    // create a new christmas element
    const christmasDiv = document.createElement('div');
    christmasDiv.classList.add('christmas');

    // pick a random christmas symbol
    christmasDiv.textContent = christmasSymbols[Math.floor(Math.random() * christmasSymbols.length)];

    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = -(Math.random() * 16); // delay (-16s to 0s)
    const randomAnimationDelay2 = -(Math.random() * 5); // delay (-5s to 0s)

    // apply styles
    christmasDiv.style.left = `${randomLeft}%`;
    christmasDiv.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
      const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
      christmasDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    // add the christmas to the container
    christmasContainer.appendChild(christmasDiv);
  }
  console.log('Christmas added');
}

// initialize christmas
function initializeChristmas() {
  if (!christmas) return; // exit if christmas is disabled

  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
  const count = !isMobile ? christmasCount : christmasCountMobile;

  initChristmas(count);
  toggleChristmas();
}

initializeChristmas();
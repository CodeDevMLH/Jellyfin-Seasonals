const christmas = true; // enable/disable christmas
const randomChristmas = true; // enable random Christmas
const randomChristmasMobile = false; // enable random Christmas on mobile devices
const enableDiffrentDuration = true; // enable different duration for the random Christmas symbols
const christmasCount = 25; // count of random extra christmas


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

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});

// Array of christmas characters
const christmasSymbols = ['❆', '🎁', '❄️', '🎁', '🎅', '🎊', '🎁', '🎉'];

function addRandomChristmas(count) {
  const christmasContainer = document.querySelector('.christmas-container'); // get the christmas container
  if (!christmasContainer) return; // exit if christmas container is not found

  console.log('Adding random christmas');

  for (let i = 0; i < count; i++) {
    // create a new christmas element
    const christmasDiv = document.createElement('div');
    christmasDiv.classList.add('christmas');

    // pick a random christmas symbol
    christmasDiv.textContent = christmasSymbols[Math.floor(Math.random() * christmasSymbols.length)];

    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = Math.random() * 12 + 8; // delay (8s to 12s)
    const randomAnimationDelay2 = Math.random() * 5 + 3; // delay (0s to 5s)

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
  console.log('Random christmas added');
}

// initialize standard christmas
function initChristmas() {
  const christmasContainer = document.querySelector('.christmas-container') || document.createElement("div");

  if (!document.querySelector('.christmas-container')) {
    christmasContainer.className = "christmas-container";
    christmasContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(christmasContainer);
  }

  // create the 12 standard christmas
  for (let i = 0; i < 12; i++) {
    const christmasDiv = document.createElement('div');
    christmasDiv.className = 'christmas';
    christmasDiv.textContent = christmasSymbols[Math.floor(Math.random() * christmasSymbols.length)];

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
      const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
      christmasDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    christmasContainer.appendChild(christmasDiv);
  }
}

// initialize christmas and add random christmas symbols after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!christmas) return; // exit if christmas is disabled
  initChristmas();
  toggleChristmas();

  const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
  if (randomChristmas && (screenWidth > 768 || randomChristmasMobile)) { // add random christmas only on larger screens, unless enabled for mobile devices
    addRandomChristmas(christmasCount);
  }
});
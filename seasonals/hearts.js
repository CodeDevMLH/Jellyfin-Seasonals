const hearts = true; // enable/disable hearts
const randomSymbols = true; // enable more random symbols
const randomSymbolsMobile = false; // enable random symbols on mobile devices
const enableDiffrentDuration = true; // enable different animation duration for random symbols
const heartsCount = 25; // count of random extra symbols

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

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});


// Array of hearts characters
const heartSymbols = ['❤️', '💕', '💞', '💓', '💗', '💖'];


function addRandomSymbols(count) {
  const heartsContainer = document.querySelector('.hearts-container'); // get the hearts container
  if (!heartsContainer) return; // exit if hearts container is not found

  console.log('Adding random heart symbols');

  for (let i = 0; i < count; i++) {
    // create a new hearts elements
    const heartsDiv = document.createElement("div");
    heartsDiv.className = "heart";

    // pick a random hearts symbol
    heartsDiv.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];


    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = Math.random() * 14; // delay (0s to 14s)
    const randomAnimationDelay2 = Math.random() * 5; // delay (0s to 5s)

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
  console.log('Random hearts symbols added');
}

// create hearts objects
function createHearts() {
  const container = document.querySelector('.hearts-container') || document.createElement("div");

  if (!document.querySelector('.hearts-container')) {
    container.className = "hearts-container";
    container.setAttribute("aria-hidden", "true");
    document.body.appendChild(container);
  }

  for (let i = 0; i < 12; i++) {
    const heartsDiv = document.createElement("div");
    heartsDiv.className = "heart";
    heartsDiv.textContent = heartSymbols[i % heartSymbols.length];

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 16 + 12; // delay (12s to 16s)
      const randomAnimationDuration2 = Math.random() * 7 + 3; // delay (3s to 7s)
      heartsDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    container.appendChild(heartsDiv);
  }
}


// initialize hearts
function initializeHearts() {
  if (!hearts) return; // exit if hearts is disabled
  createHearts();
  toggleHearts();

  const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
  if (randomSymbols && (screenWidth > 768 || randomSymbolsMobile)) { // add random heartss only on larger screens, unless enabled for mobile devices
    addRandomSymbols(heartsCount);
  }
}

initializeHearts();
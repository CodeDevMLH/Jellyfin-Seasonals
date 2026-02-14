const config = window.SeasonalsPluginConfig?.Halloween || {};

const halloween = config.EnableHalloween !== undefined ? config.EnableHalloween : true; // enable/disable halloween
const randomSymbols = config.EnableRandomSymbols !== undefined ? config.EnableRandomSymbols : true; // enable more random symbols
const randomSymbolsMobile = config.EnableRandomSymbolsMobile !== undefined ? config.EnableRandomSymbolsMobile : false; // enable random symbols on mobile devices (Warning: High values may affect performance)
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different duration for the random halloween symbols
const halloweenCount = config.SymbolCount || 25; // count of random extra symbols

let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the halloween
function toggleHalloween() {
  const halloweenContainer = document.querySelector('.halloween-container');
  if (!halloweenContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide halloween if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    halloweenContainer.style.display = 'none'; // hide halloween
    if (!msgPrinted) {
      console.log('Halloween hidden');
      msgPrinted = true;
    }
  } else {
    halloweenContainer.style.display = 'block'; // show halloween
    if (msgPrinted) {
      console.log('Halloween visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleHalloween);

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});


const images = [
  "../Seasonals/Resources/halloween_images/ghost_20x20.png",
  "../Seasonals/Resources/halloween_images/bat_20x20.png",
  "../Seasonals/Resources/halloween_images/pumpkin_20x20.png",
];

function addRandomSymbols(count) {
  const halloweenContainer = document.querySelector('.halloween-container'); // get the halloween container
  if (!halloweenContainer) return; // exit if halloween container is not found

  console.log('Adding random halloween symbols');


  for (let i = 0; i < count; i++) {
    // create a new halloween elements
    const halloweenDiv = document.createElement("div");
    halloweenDiv.className = "halloween";

    // pick a random halloween symbol
    const imageSrc = images[Math.floor(Math.random() * images.length)];
    const img = document.createElement("img");
    img.src = imageSrc;

    halloweenDiv.appendChild(img);


    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = Math.random() * 10; // delay (0s to 10s)
    const randomAnimationDelay2 = Math.random() * 3; // delay (0s to 3s)

    // apply styles
    halloweenDiv.style.left = `${randomLeft}%`;
    halloweenDiv.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
      const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
      halloweenDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    // add the halloween to the container
    halloweenContainer.appendChild(halloweenDiv);
  }
  console.log('Random halloween symbols added');
}

// create halloween objects
function createHalloween() {
  const container = document.querySelector('.halloween-container') || document.createElement("div");

  if (!document.querySelector('.halloween-container')) {
    container.className = "halloween-container";
    container.setAttribute("aria-hidden", "true");
    document.body.appendChild(container);
  }

  for (let i = 0; i < 4; i++) {
    images.forEach(imageSrc => {
      const halloweenDiv = document.createElement("div");
      halloweenDiv.className = "halloween";

      const img = document.createElement("img");
      img.src = imageSrc;

      // set random animation duration
      if (enableDiffrentDuration) {
        const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
        const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
        halloweenDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
      }

      halloweenDiv.appendChild(img);
      container.appendChild(halloweenDiv);
    });
  }
}

// initialize halloween
function initializeHalloween() {
  if (!halloween) return; // exit if halloween is disabled
  createHalloween();
  toggleHalloween();

  const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
  if (randomSymbols && (screenWidth > 768 || randomSymbolsMobile)) { // add random halloweens only on larger screens, unless enabled for mobile devices
    addRandomSymbols(halloweenCount);
  }
}

initializeHalloween();
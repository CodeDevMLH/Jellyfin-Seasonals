const halloween = true; // enable/disable halloween

let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the halloween
function toggleHalloween() {
  const halloweenContainer = document.querySelector('.snow-container');
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

/*
const images = [
    "/web/seasonal/ghost_20x20.png",
    "/web/seasonal/bat_20x20.png",
    "/web/seasonal/pumpkin_20x20.png",
];*/
const images = [
  "./images/ghost_20x20.png",
  "./images/bat_20x20.png",
  "./images/pumpkin_20x20.png",
];

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

      halloweenDiv.appendChild(img);
      container.appendChild(halloweenDiv);
    });
  }
}


// initialize halloween after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!halloween) return; // exit if halloween is disabled
  createHalloween();
  toogleHalloween();
});

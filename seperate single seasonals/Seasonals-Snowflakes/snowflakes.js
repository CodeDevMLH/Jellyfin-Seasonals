const snowflakes = true; // enable/disable snowflakes
const randomSnowflakes = true; // enable random Snowflakes
const randomSnowflakesMobile = false; // enable random Snowflakes on mobile devices
const enableColoredSnowflakes = true; // enable colored snowflakes on mobile devices
const enableDiffrentDuration = true; // enable different animation duration for random symbols
const snowflakeCount = 25; // count of random extra snowflakes


let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the snowflakes
function toggleSnowflakes() {
  const snowflakeContainer = document.querySelector('.snowflakes');
  if (!snowflakeContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide snowflakes if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    snowflakeContainer.style.display = 'none'; // hide snowflakes
    if (!msgPrinted) {
      console.log('Snowflakes hidden');
      msgPrinted = true;
    }
  } else {
    snowflakeContainer.style.display = 'block'; // show snowflakes
    if (msgPrinted) {
      console.log('Snowflakes visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleSnowflakes);

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});

function addRandomSnowflakes(count) {
  const snowflakeContainer = document.querySelector('.snowflakes'); // get the snowflake container
  if (!snowflakeContainer) return; // exit if snowflake container is not found

  console.log('Adding random snowflakes');

  const snowflakeSymbols = ['❅', '❆']; // some snowflake symbols
  const snowflakeSymbolsMobile = ['❅', '❆', '❄']; // some snowflake symbols mobile version

  for (let i = 0; i < count; i++) {
    // create a new snowflake element
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // pick a random snowflake symbol
    if (enableColoredSnowflakes) {
      snowflake.textContent = snowflakeSymbolsMobile[Math.floor(Math.random() * snowflakeSymbolsMobile.length)];
    } else {
      snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
    }

    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = Math.random() * 8; // delay (0s to 8s)
    const randomAnimationDelay2 = Math.random() * 5; // delay (0s to 5s)

    // apply styles
    snowflake.style.left = `${randomLeft}%`;
    snowflake.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 14 + 10; // delay (10s to 14s)
      const randomAnimationDuration2 = Math.random() * 5 + 3; // delay (3s to 5s)
      snowflake.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    // add the snowflake to the container
    snowflakeContainer.appendChild(snowflake);
  }
  console.log('Random snowflakes added');
}

// initialize standard snowflakes
function initSnowflakes() {
  const snowflakesContainer = document.querySelector('.snowflakes') || document.createElement("div");

  if (!document.querySelector('.snowflakes')) {
    snowflakesContainer.className = "snowflakes";
    snowflakesContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(snowflakesContainer);
  }

  // Array of snowflake characters
  const snowflakeSymbols = ['❅', '❆'];

  // create the 12 standard snowflakes
  for (let i = 0; i < 12; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = snowflakeSymbols[i % 2]; // change between ❅ and ❆

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 14 + 10; // delay (10s to 14s)
      const randomAnimationDuration2 = Math.random() * 5 + 3; // delay (3s to 5s)
      snowflake.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    snowflakesContainer.appendChild(snowflake);
  }
}

// initialize snowflakes and add random snowflakes after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!snowflakes) return; // exit if snowflakes are disabled
  initSnowflakes();
  toggleSnowflakes();

  const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
  if (randomSnowflakes && (screenWidth > 768 || randomSnowflakesMobile)) { // add random snowflakes only on larger screens, unless enabled for mobile devices
    addRandomSnowflakes(snowflakeCount);
  }
});
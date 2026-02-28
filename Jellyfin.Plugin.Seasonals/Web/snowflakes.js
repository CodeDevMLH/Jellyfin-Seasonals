const config = window.SeasonalsPluginConfig?.Snowflakes || {};

const snowflakes = config.EnableSnowflakes !== undefined ? config.EnableSnowflakes : true; // enable/disable snowflakes
const snowflakeCount = config.SnowflakeCount !== undefined ? config.SnowflakeCount : 25; // count of snowflakes
const snowflakeCountMobile = config.SnowflakeCountMobile !== undefined ? config.SnowflakeCountMobile : 10; // count of snowflakes on mobile
const enableColoredSnowflakes = config.EnableColoredSnowflakes !== undefined ? config.EnableColoredSnowflakes : true; // enable/disable colored snowflakes
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations

const snowflakeSymbols = ['❅', '❆']; // some snowflake symbols
const snowflakeSymbolsMobile = ['❅', '❆', '❄']; // some snowflake symbols mobile version

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
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function initSnowflakes(count) {
  let snowflakeContainer = document.querySelector('.snowflakes'); // get the snowflake container
  if (!snowflakeContainer) {
    snowflakeContainer = document.createElement("div");
    snowflakeContainer.className = "snowflakes";
    snowflakeContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(snowflakeContainer);
  }

  console.log('Adding snowflakes');

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
    const randomAnimationDelay = -(Math.random() * 14); // delay (-14s to 0s)
    const randomAnimationDelay2 = -(Math.random() * 5); // delay (-5s to 0s)

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
  console.log('Snowflakes added');
}

// initialize snowflakes
function initializeSnowflakes() {
  if (!snowflakes) return; // exit if snowflakes are disabled

  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
  const count = !isMobile ? snowflakeCount : snowflakeCountMobile;

  initSnowflakes(count);
  toggleSnowflakes();
}

initializeSnowflakes();
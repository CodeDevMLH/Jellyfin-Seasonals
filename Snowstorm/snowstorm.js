const snowstorm = true; // enable/disable snowstorm
const snowflakesCount = 500; // count of snowflakes (recommended values: 300-600)
const snowFallSpeed = 4; // speed of snowfall	(recommended values: 0-8)

let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the snowstorm
function toggleSnowstorm() {
  const snowstormContainer = document.querySelector('.snowstorm');
  if (!snowstormContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide snowstorm if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    snowstormContainer.style.display = 'none'; // hide snowstorm
    if (!msgPrinted) {
      console.log('Snowstorm hidden');
      msgPrinted = true;
    }
  } else {
    snowstormContainer.style.display = 'block'; // show snowstorm
    if (msgPrinted) {
      console.log('Snowstorm visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleSnowstorm);

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});


function createSnowstorm() {
  const container = document.getElementById('snowstorm');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  for (let i = 0; i < snowflakesCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // random size
    const size = Math.random() * 4 + 1;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // random starting position
    snowflake.style.left = `${Math.random() * windowWidth}px`;
    snowflake.style.top = `${Math.random() * windowHeight}px`;

    container.appendChild(snowflake);

    animateSnowflake(snowflake);
  }
}

function animateSnowflake(snowflake) {
  // animation parameters
  const fallSpeed = Math.random() * snowFallSpeed + 2;
  const horizontalWind = Math.random() * 4 - 2;
  const verticalVariation = Math.random() * 4 - 1;

  function fall() {
    const currentTop = parseFloat(snowflake.style.top || 0);
    const currentLeft = parseFloat(snowflake.style.left || 0);

    snowflake.style.top = `${currentTop + fallSpeed + verticalVariation}px`;
    snowflake.style.left = `${currentLeft + horizontalWind}px`;

    // if snowflake is out of the window, reset its position
    if (currentTop > window.innerHeight) {
      snowflake.style.top = '0px';
      snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    }

    requestAnimationFrame(fall);
  }

  fall();
}

// initialize snowstorm after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!snowstorm) return; // exit if snowstorm is disabled
  createSnowstorm();
});

const snowfall = true; // enable/disable snowfall
const snowflakesCount = 500; // count of snowflakes (recommended values: 300-600)
const snowFallSpeed = 3; // speed of snowfall	(recommended values: 0-5)

let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the snowfall
function toggleSnowfall() {
  const snowfallContainer = document.querySelector('.snowfall');
  if (!snowfallContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide snowfall if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    snowfallContainer.style.display = 'none'; // hide snowfall
    if (!msgPrinted) {
      console.log('Snowfall hidden');
      msgPrinted = true;
    }
  } else {
    snowfallContainer.style.display = 'block'; // show snowfall
    if (msgPrinted) {
      console.log('Snowfall visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleSnowfall);

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});


function createSnowflakes() {
  const container = document.querySelector('.snowfall') || document.createElement("div");

  if (!document.querySelector('.snowfall')) {
    container.className = "snowfall";
    container.setAttribute("aria-hidden", "true");
    document.body.appendChild(container);
  }


  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  for (let i = 0; i < snowflakesCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // random size between 1 and 3 pixels
    const size = Math.random() * 3 + 1;
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
  // Animation Parameter
  const speed = Math.random() * snowFallSpeed + 1;
  // const speed = Math.random() * 3 + 1;
  const sidewaysMovement = Math.random() * 2 - 1;

  function fall() {
    const currentTop = parseFloat(snowflake.style.top || 0);
    const currentLeft = parseFloat(snowflake.style.left || 0);

    // fall and sideways movement
    snowflake.style.top = `${currentTop + speed}px`;
    snowflake.style.left = `${currentLeft + sidewaysMovement}px`;

    // if snowflake is out of the window, reset its position
    if (currentTop > window.innerHeight) {
      snowflake.style.top = '0px';
      snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    }

    requestAnimationFrame(fall);
  }

  fall();
}

// initialize snowfall
function initializeSnowfall() {
  if (!snowfall) {
    return; // exit if snowfall is disabled
  }
  createSnowflakes();
}

initializeSnowfall();
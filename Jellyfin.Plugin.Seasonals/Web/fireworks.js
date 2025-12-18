const config = window.SeasonalsPluginConfig?.Fireworks || {};

const fireworks = config.EnableFireworks !== undefined ? config.EnableFireworks : true; // enable/disable fireworks
const scrollFireworks = config.ScrollFireworks !== undefined ? config.ScrollFireworks : true; // enable fireworks to scroll with page content
const particlesPerFirework = config.ParticleCount || 50; // count of particles per firework (Warning: High values may affect performance)
const minFireworks = config.MinFireworks || 3; // minimum number of simultaneous fireworks
const maxFireworks = config.MaxFireworks || 6; // maximum number of simultaneous fireworks
const intervalOfFireworks = config.LaunchInterval || 3200; // interval for the fireworks in milliseconds

// array of color palettes for the fireworks
const colorPalettes = [
  ['#ff0000', '#ff7300', '#ff4500'], // red's
  ['#0040ff', '#5a9bff', '#b0d9ff'], // blue's
  ['#47ff00', '#8eff47', '#00ff7f'], // green's
  ['#ffd700', '#c0c0c0', '#ff6347'], // gold, silver, red
  ['#ff00ff', '#ff99ff', '#800080'], // magenta's
  ['#ffef00', '#ffff99', '#ffd700'], // yellow's
  ['#ff4500', '#ff6347', '#ff7f50'], // orange's
  ['#e3e3e3', '#c0c0c0', '#7d7c7c'], // silver's
];

let msgPrinted = false; // flag to prevent multiple console messages
let spacing = 0; // spacing between fireworks

// function to check and control fireworks
function toggleFirework() {
  const fireworksContainer = document.querySelector('.fireworks');
  if (!fireworksContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide fireworks if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    fireworksContainer.style.display = 'none'; // hide fireworks
    if (!msgPrinted) {
      console.log('Fireworks hidden');
      clearInterval(fireworksInterval);
      msgPrinted = true;
    }
  } else {
    fireworksContainer.style.display = 'block'; // show fireworks
    if (msgPrinted) {
      console.log('Fireworks visible');
      startFireworks();
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleFirework);

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});


// Function to create a rocket trail
function createRocketTrail(x, startY, endY) {
  const fireworkContainer = document.querySelector('.fireworks');
  const rocketTrail = document.createElement('div');
  rocketTrail.classList.add('rocket-trail');
  fireworkContainer.appendChild(rocketTrail);

  // Set position and animation
  rocketTrail.style.setProperty('--trailX', `${x}px`);
  rocketTrail.style.setProperty('--trailStartY', `${startY}px`);
  rocketTrail.style.setProperty('--trailEndY', `${endY}px`);

  // Remove the element after the animation
  setTimeout(() => {
    fireworkContainer.removeChild(rocketTrail);
  }, 2000); // Duration of the animation
}

// Function for particle explosion
function createExplosion(x, y) {
  const fireworkContainer = document.querySelector('.fireworks');

  // Choose a random color palette
  const chosenPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

  for (let i = 0; i < particlesPerFirework; i++) {
    const particle = document.createElement('div');
    particle.classList.add('firework');

    const angle = Math.random() * 2 * Math.PI; // Random direction
    const distance = Math.random() * 180 + 100; // Random distance
    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--x', `${xOffset}px`);
    particle.style.setProperty('--y', `${yOffset}px`);
    particle.style.background = chosenPalette[Math.floor(Math.random() * chosenPalette.length)];

    fireworkContainer.appendChild(particle);

    // Remove particle after the animation
    setTimeout(() => particle.remove(), 3000);
  }
}

// Function for the firework with trail
function launchFirework() {
  // Random horizontal position
  const x = Math.random() * window.innerWidth; // Any value across the entire width

  // Trail starts at the bottom and ends at a random height around the middle
  let startY, endY;
  if (scrollFireworks) {
    // Y-position considers scrolling
    startY = window.scrollY + window.innerHeight; // Bottom edge of the window plus the scroll offset
    endY = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2 + window.scrollY; // Area around the middle, but also with scrolling
  } else {
    startY = window.innerHeight; // Bottom edge of the window
    endY = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2; // Area around the middle
  }

  // Create trail
  createRocketTrail(x, startY, endY);

  // Create explosion
  setTimeout(() => {
    createExplosion(x, endY); // Explosion at the end height
  }, 1000); // or 1200
}

// Start the firework routine
function startFireworks() {
  const fireworkContainer = document.querySelector('.fireworks') || document.createElement("div");

  if (!document.querySelector('.fireworks')) {
    fireworkContainer.className = "fireworks";
    fireworkContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(fireworkContainer);
  }
  
  fireworksInterval = setInterval(() => {
    const randomCount = Math.floor(Math.random() * maxFireworks) + minFireworks;
    for (let i = 0; i < randomCount; i++) {
      setTimeout(() => {
        launchFirework();
      }, i * 200); // 200ms delay between fireworks
    }
  }, intervalOfFireworks); // Interval between fireworks
}

// Initialize fireworks and add random fireworks
function initializeFireworks() {
  if (!fireworks) return; // exit if fireworks are disabled
  startFireworks();
  toggleFirework();
}

initializeFireworks();
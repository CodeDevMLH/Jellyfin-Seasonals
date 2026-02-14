const config = window.SeasonalsPluginConfig?.Autumn || {};

const leaves = config.EnableAutumn !== undefined ? config.EnableAutumn : true; // enable/disable leaves
const randomLeaves = config.EnableRandomLeaves !== undefined ? config.EnableRandomLeaves : true; // enable random leaves
const randomLeavesMobile = config.EnableRandomLeavesMobile !== undefined ? config.EnableRandomLeavesMobile : false; // enable random leaves on mobile devices (Warning: High values may affect performance)
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different duration for the random leaves
const enableRotation = config.EnableRotation !== undefined ? config.EnableRotation : false; // enable/disable leaf rotation
const leafCount = config.LeafCount || 25; // count of random extra leaves


let msgPrinted = false; // flag to prevent multiple console messages

// function to check and control the leaves
function toggleAutumn() {
  const autumnContainer = document.querySelector('.autumn-container');
  if (!autumnContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide leaves if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    autumnContainer.style.display = 'none'; // hide leaves
    if (!msgPrinted) {
      console.log('Autumn hidden');
      msgPrinted = true;
    }
  } else {
    autumnContainer.style.display = 'block'; // show leaves
    if (msgPrinted) {
      console.log('Autumn visible');
      msgPrinted = false;
    }
  }
}

// observe changes in the DOM
const observer = new MutationObserver(toggleAutumn);

// start observation
observer.observe(document.body, {
  childList: true,    // observe adding/removing of child elements
  subtree: true,      // observe all levels of the DOM tree
  attributes: true    // observe changes to attributes (e.g. class changes)
});


const images = [
  "../Seasonals/Resources/autumn_images/acorn1.png",
  "../Seasonals/Resources/autumn_images/acorn2.png",
  "../Seasonals/Resources/autumn_images/leaf1.png",
  "../Seasonals/Resources/autumn_images/leaf2.png",
  "../Seasonals/Resources/autumn_images/leaf3.png",
  "../Seasonals/Resources/autumn_images/leaf4.png",
  "../Seasonals/Resources/autumn_images/leaf5.png",
  "../Seasonals/Resources/autumn_images/leaf6.png",
  "../Seasonals/Resources/autumn_images/leaf7.png",
  "../Seasonals/Resources/autumn_images/leaf8.png",
  "../Seasonals/Resources/autumn_images/leaf9.png",
  "../Seasonals/Resources/autumn_images/leaf10.png",
  "../Seasonals/Resources/autumn_images/leaf11.png",
  "../Seasonals/Resources/autumn_images/leaf12.png",
  "../Seasonals/Resources/autumn_images/leaf13.png",
  "../Seasonals/Resources/autumn_images/leaf14.png",
  "../Seasonals/Resources/autumn_images/leaf15.png",
];

function addRandomLeaves(count) {
  const autumnContainer = document.querySelector('.autumn-container'); // get the leave container
  if (!autumnContainer) return; // exit if leave container is not found

  console.log('Adding random leaves');

  // Array of leave characters
  for (let i = 0; i < count; i++) {
    // create a new leave element
    const leaveDiv = document.createElement('div');
    leaveDiv.className = enableRotation ? "leaf" : "leaf no-rotation";

    // pick a random leaf symbol
    const imageSrc = images[Math.floor(Math.random() * images.length)];
    const img = document.createElement("img");
    img.src = imageSrc;

    leaveDiv.appendChild(img);


    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = Math.random() * 12; // delay for fall (0s to 12s)
    const randomAnimationDelay2 = Math.random() * 4; // delay for shake+rotate (0s to 4s)

    // apply styles
    leaveDiv.style.left = `${randomLeft}%`;
    leaveDiv.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // fall duration (6s to 16s)
      const randomAnimationDuration2 = Math.random() * 3 + 2; // shake+rotate duration (2s to 5s)
      leaveDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    // set random rotation angles (only if rotation is enabled)
    if (enableRotation) {
      const randomRotateStart = -(Math.random() * 40 + 20); // -20deg to -60deg
      const randomRotateEnd = Math.random() * 40 + 20; // 20deg to 60deg
      leaveDiv.style.setProperty('--rotate-start', `${randomRotateStart}deg`);
      leaveDiv.style.setProperty('--rotate-end', `${randomRotateEnd}deg`);
    } else {
      // No rotation - set to 0 degrees
      leaveDiv.style.setProperty('--rotate-start', '0deg');
      leaveDiv.style.setProperty('--rotate-end', '0deg');
    }

    // add the leave to the container
    autumnContainer.appendChild(leaveDiv);
  }
  console.log('Random leaves added');
}

// initialize standard leaves
function initLeaves() {
  const container = document.querySelector('.autumn-container') || document.createElement("div");

  if (!document.querySelector('.autumn-container')) {
    container.className = "autumn-container";
    container.setAttribute("aria-hidden", "true");
    document.body.appendChild(container);
  }

  for (let i = 0; i < 12; i++) {
    const leafDiv = document.createElement("div");
    leafDiv.className = enableRotation ? "leaf" : "leaf no-rotation";

    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // fall duration (6s to 16s)
      const randomAnimationDuration2 = Math.random() * 3 + 2; // shake+rotate duration (2s to 5s)
      leafDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    // set random rotation angles for standard leaves too (only if rotation is enabled)
    if (enableRotation) {
      const randomRotateStart = -(Math.random() * 40 + 20); // -20deg to -60deg
      const randomRotateEnd = Math.random() * 40 + 20; // 20deg to 60deg
      leafDiv.style.setProperty('--rotate-start', `${randomRotateStart}deg`);
      leafDiv.style.setProperty('--rotate-end', `${randomRotateEnd}deg`);
    } else {
      // No rotation - set to 0 degrees
      leafDiv.style.setProperty('--rotate-start', '0deg');
      leafDiv.style.setProperty('--rotate-end', '0deg');
    }

    leafDiv.appendChild(img);
    container.appendChild(leafDiv);
  }
}

// initialize leaves and add random leaves
function initializeLeaves() {
  if (!leaves) return; // exit if leaves are disabled
  initLeaves();
  toggleAutumn();

  const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
  if (randomLeaves && (screenWidth > 768 || randomLeavesMobile)) { // add random leaves only on larger screens, unless enabled for mobile devices
    addRandomLeaves(leafCount);
  }
}

initializeLeaves();
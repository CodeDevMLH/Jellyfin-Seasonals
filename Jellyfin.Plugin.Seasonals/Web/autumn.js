const config = window.SeasonalsPluginConfig?.Autumn || {};

const leaves = config.EnableAutumn !== undefined ? config.EnableAutumn : true; // enable/disable autumn
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const enableRotation = config.EnableRotation !== undefined ? config.EnableRotation : false; // enable/disable rotation
const leafCount = config.LeafCount !== undefined ? config.LeafCount : 35; // count of random extra leaves
const leafCountMobile = config.LeafCountMobile !== undefined ? config.LeafCountMobile : 10; // count of random extra leaves on mobile

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
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function initLeaves(count) {
  let autumnContainer = document.querySelector('.autumn-container'); // get the leave container
  if (!autumnContainer) {
    autumnContainer = document.createElement("div");
    autumnContainer.className = "autumn-container";
    autumnContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(autumnContainer);
  }

  console.log('Adding leaves');

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
    // Display directly symbols on full screen (below) or let it build up (above)
    // const randomAnimationDelay = -(Math.random() * 16); // delay for fall (-16s to 0s)
    const randomAnimationDelay2 = -(Math.random() * 4); // delay for shake+rotate (-4s to 0s)

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
  console.log('Leaves added');
}

// initialize leaves
function initializeLeaves() {
  if (!leaves) return; // exit if leaves are disabled

  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
  const count = !isMobile ? leafCount : leafCountMobile;

  initLeaves(count);
  toggleAutumn();
}

initializeLeaves();
const leaves = true; // enable/disable leaves
const randomLeaves = true; // enable random leaves
const randomLeavesMobile = false; // enable random leaves on mobile devices
const enableDiffrentDuration = true; // enable different duration for the random leaves
const leafCount = 25; // count of random extra leaves


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
  "./seasonals/autumn_images/acorn1.png",
  "./seasonals/autumn_images/acorn2.png",
  "./seasonals/autumn_images/leaf1.png",
  "./seasonals/autumn_images/leaf2.png",
  "./seasonals/autumn_images/leaf3.png",
  "./seasonals/autumn_images/leaf4.png",
  "./seasonals/autumn_images/leaf5.png",
  "./seasonals/autumn_images/leaf6.png",
  "./seasonals/autumn_images/leaf7.png",
  "./seasonals/autumn_images/leaf8.png",
  "./seasonals/autumn_images/leaf9.png",
  "./seasonals/autumn_images/leaf10.png",
  "./seasonals/autumn_images/leaf11.png",
  "./seasonals/autumn_images/leaf12.png",
  "./seasonals/autumn_images/leaf13.png",
  "./seasonals/autumn_images/leaf14.png",
  "./seasonals/autumn_images/leaf15.png",
];

// remove commented out image array to enable test site working, comment out above images array for that
/*
const images = [
  "./images/acorn1.png",
  "./images/acorn2.png",
  "./images/leaf1.png",
  "./images/leaf2.png",
  "./images/leaf3.png",
  "./images/leaf4.png",
  "./images/leaf5.png",
  "./images/leaf6.png",
  "./images/leaf7.png",
  "./images/leaf8.png",
  "./images/leaf9.png",
  "./images/leaf10.png",
  "./images/leaf11.png",
  "./images/leaf12.png",
  "./images/leaf13.png",
  "./images/leaf14.png",
  "./images/leaf15.png",
];
*/

function addRandomLeaves(count) {
  const autumnContainer = document.querySelector('.autumn-container'); // get the leave container
  if (!autumnContainer) return; // exit if leave container is not found

  console.log('Adding random leaves');

  // Array of leave characters
  for (let i = 0; i < count; i++) {
    // create a new leave element
    const leaveDiv = document.createElement('div');
    leaveDiv.className = "leaf";

    // pick a random leaf symbol
    const imageSrc = images[Math.floor(Math.random() * images.length)];
    const img = document.createElement("img");
    img.src = imageSrc;

    leaveDiv.appendChild(img);


    // set random horizontal position, animation delay and size(uncomment lines to enable) 
    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = Math.random() * 12; // delay (0s to 12s)
    const randomAnimationDelay2 = Math.random() * 5; // delay (0s to 5s)

    // apply styles
    leaveDiv.style.left = `${randomLeft}%`;
    leaveDiv.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
      const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
      leafDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
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
    leafDiv.className = "leaf";

    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
      const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
      leafDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    leafDiv.appendChild(img);
    container.appendChild(leafDiv);
  }
}

// initialize leaves and add random leaves after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (!leaves) return; // exit if leaves are disabled
  initLeaves();
  toggleAutumn();

  const screenWidth = window.innerWidth; // get the screen width to detect mobile devices
  if (randomLeaves && (screenWidth > 768 || randomLeavesMobile)) { // add random leaves only on larger screens, unless enabled for mobile devices
    addRandomLeaves(leafCount);
  }
});
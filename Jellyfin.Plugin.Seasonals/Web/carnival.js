const config = window.SeasonalsPluginConfig?.Carnival || {};

const carnival = config.EnableCarnival !== undefined ? config.EnableCarnival : true; // enable/disable carnival
const carnivalCount = config.ObjectCount !== undefined ? config.ObjectCount : 120; // Number of confetti pieces to spawn
const carnivalCountMobile = config.ObjectCountMobile !== undefined ? config.ObjectCountMobile : 60; // Number of confetti pieces to spawn on mobile
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const enableSway = config.EnableCarnivalSway !== undefined ? config.EnableCarnivalSway : true; // enable/disable carnivalsway

const confettiColors = [
    '#fce18a', '#ff726d', '#b48def', '#f4306d', 
    '#36c5f0', '#2ccc5d', '#e9b31d', '#9b59b6', 
    '#3498db', '#e74c3c', '#1abc9c', '#f1c40f'
];

let msgPrinted = false;

// function to check and control the carnival animation
function toggleCarnival() {
  const carnivalContainer = document.querySelector('.carnival-container');
  if (!carnivalContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide carnival if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    carnivalContainer.style.display = 'none'; // hide carnival
    if (!msgPrinted) {
      console.log('Carnival hidden');
      msgPrinted = true;
    }
  } else {
    carnivalContainer.style.display = 'block'; // show carnival
    if (msgPrinted) {
      console.log('Carnival visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleCarnival);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createConfettiPiece(container, isInitial = false) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('carnival-wrapper');
    
    let swayWrapper = wrapper;
    
    if (enableSway) {
        swayWrapper = document.createElement('div');
        swayWrapper.classList.add('carnival-sway-wrapper');
        wrapper.appendChild(swayWrapper);
    }

    const confetti = document.createElement('div');
    confetti.classList.add('carnival-confetti');

    // Random color
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.backgroundColor = color;

    // Random shape
    const shape = Math.random();
    if (shape > 0.8) {
        confetti.classList.add('circle');
    } else if (shape > 0.6) {
        confetti.classList.add('square');
    } else if (shape > 0.4) {
        confetti.classList.add('triangle');
    } else {
        confetti.classList.add('rect');
    }

    // Random position
    wrapper.style.left = `${Math.random() * 100}%`;

    // MARK: CONFETTI SIZE (RECTANGLES)
    if (!confetti.classList.contains('circle') && !confetti.classList.contains('square') && !confetti.classList.contains('triangle')) {
        const width = Math.random() * 3 + 4; // 4-7px
        const height = Math.random() * 5 + 8; // 8-13px
        confetti.style.width = `${width}px`;
        confetti.style.height = `${height}px`;
    } else if (confetti.classList.contains('circle') || confetti.classList.contains('square')) {
        // MARK: CONFETTI SIZE (CIRCLES/SQUARES)
        const size = Math.random() * 5 + 5; // 5-10px
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
    }

    // MARK: CONFETTI FALLING SPEED (in seconds)
    const duration = Math.random() * 5 + 5; 

    let delay = 0;
    if (isInitial) {
        delay = -Math.random() * duration;
    } else {
        delay = Math.random() * 10; 
    }
    
    wrapper.style.animationDelay = `${delay}s`;
    wrapper.style.animationDuration = `${duration}s`;
    
    if (enableSway) {
        // Random sway duration
        const swayDuration = Math.random() * 2 + 3; // 3-5s per cycle
        swayWrapper.style.animationDuration = `${swayDuration}s`;
        swayWrapper.style.animationDelay = `-${Math.random() * 5}s`;
        
        // MARK: SWAY DISTANCE RANGE (in px)
        const swayAmount = Math.random() * 70 + 30; // 30-100px
        const direction = Math.random() > 0.5 ? 1 : -1;
        swayWrapper.style.setProperty('--sway-amount', `${swayAmount * direction}px`);
    }
    
    // MARK: CONFETTI FLUTTER ROTATION SPEED
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    confetti.style.setProperty('--rx', Math.random().toFixed(2));
    confetti.style.setProperty('--ry', Math.random().toFixed(2));
    confetti.style.setProperty('--rz', (Math.random() * 0.5).toFixed(2));
    
    // Random direction for 3D rotation
    const rotDir = Math.random() > 0.5 ? 1 : -1;
    confetti.style.setProperty('--rot-dir', `${rotDir * 360}deg`);

    if (enableSway) {
        swayWrapper.appendChild(confetti);
        wrapper.appendChild(swayWrapper);
    } else {
        wrapper.appendChild(confetti);
    }
    
    // Respawn confetti when it hits the bottom
    wrapper.addEventListener('animationend', (e) => {
        if (e.animationName === 'carnival-fall') {
            wrapper.remove();
            createConfettiPiece(container, false); // respawn without initial huge delay
        }
    });

    container.appendChild(wrapper);
}

// initialize standard carnival objects
function initCarnivalObjects(count) {
    let container = document.querySelector('.carnival-container');
    if (!container) {
        container = document.createElement("div");
        container.className = "carnival-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    // Initial confetti
    for (let i = 0; i < count; i++) {
        createConfettiPiece(container, true);
    }
}

// initialize carnival
function initializeCarnival() {
  if (!carnival) return;

    const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    const count = !isMobile ? carnivalCount : carnivalCountMobile;

    initCarnivalObjects(count);
    toggleCarnival();
}

initializeCarnival();

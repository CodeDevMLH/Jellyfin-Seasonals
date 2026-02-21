const config = window.SeasonalsPluginConfig?.Summer || {};

const summer = config.EnableSummer !== undefined ? config.EnableSummer : true; // Enable/disable summer theme
const bubbleCount = config.BubbleCount || 30; // Number of bubbles
const dustCount = config.DustCount || 50; // Number of dust particles
const randomSummer = config.EnableRandomSummer !== undefined ? config.EnableRandomSummer : true; // Enable random generating objects
const randomSummerMobile = config.EnableRandomSummerMobile !== undefined ? config.EnableRandomSummerMobile : false; // Enable random generating objects on mobile
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // Randomize animation duration of bubbles and dust

let msgPrinted = false;

function toggleSummer() {
  const summerContainer = document.querySelector('.summer-container');
  if (!summerContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    summerContainer.style.display = 'none';
    if (!msgPrinted) {
      console.log('Summer hidden');
      msgPrinted = true;
    }
  } else {
    summerContainer.style.display = 'block';
    if (msgPrinted) {
      console.log('Summer visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleSummer);
observer.observe(document.body, { childList: true, subtree: true, attributes: true });

function createBubble(container, isDust = false) {
    const bubble = document.createElement('div');
    
    if (isDust) {
        bubble.classList.add('summer-dust');
    } else {
        bubble.classList.add('summer-bubble');
    }

    // Random horizontal position
    const randomLeft = Math.random() * 100;
    bubble.style.left = `${randomLeft}%`;

    // Random size
    if (!isDust) {
        // MARK: BUBBLE SIZE
        const size = Math.random() * 20 + 10; // 10-30px bubbles
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
    } else {
        // MARK: DUST SIZE
        const size = Math.random() * 3 + 1; // 1-4px dust
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
    }

    // Animation properties
    const duration = isDust ? (Math.random() * 20 + 10) : (Math.random() * 10 + 5); // Dust is slower
    const delay = Math.random() * 10;
    
    if (enableDifferentDuration) {
        bubble.style.animationDuration = `${duration}s`;
    }
    bubble.style.animationDelay = `${delay}s`;

    container.appendChild(bubble);
}

function addRandomSummerObjects() {
    const container = document.querySelector('.summer-container');
    if (!container) return;
    
    // Add bubbles
    for (let i = 0; i < bubbleCount; i++) {
        createBubble(container, false);
    }
    
    // Add some dust particles
    for (let i = 0; i < dustCount; i++) {
        createBubble(container, true);
    }
}

function initSummerObjects() {
    let container = document.querySelector('.summer-container');
    if (!container) {
        container = document.createElement("div");
        container.className = "summer-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    // Initial bubbles/dust
    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        const isDust = Math.random() > 0.5;
        if (isDust) {
            bubble.classList.add('summer-dust');
        } else {
            bubble.classList.add('summer-bubble');
        }
        
        const randomLeft = Math.random() * 100;
        bubble.style.left = `${randomLeft}%`;
        
        if (!isDust) {
            // MARK: BUBBLE SIZE
            const size = Math.random() * 20 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
        } else {
            // MARK: DUST SIZE
            const size = Math.random() * 3 + 1;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
        }
        
        const duration = isDust ? (Math.random() * 20 + 10) : (Math.random() * 10 + 5);
        if (enableDifferentDuration) {
           bubble.style.animationDuration = `${duration}s`;
        }
        
        bubble.style.animationDelay = `-${Math.random() * 10}s`;
        container.appendChild(bubble);
    }
}

function initializeSummer() {
    if (!summer) return;
    initSummerObjects();
    toggleSummer();

    const screenWidth = window.innerWidth;
    if (randomSummer && (screenWidth > 768 || randomSummerMobile)) {
        addRandomSummerObjects();
    }
}

initializeSummer();

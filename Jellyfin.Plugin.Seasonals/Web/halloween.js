const config = window.SeasonalsPluginConfig?.Halloween || {};

const halloween = config.EnableHalloween !== undefined ? config.EnableHalloween : true; // enable/disable halloween
const enableDiffrentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const enableSpiders = config.EnableSpiders !== undefined ? config.EnableSpiders : true; // enable/disable spiders
const enableMice = config.EnableMice !== undefined ? config.EnableMice : true; // enable/disable mice
const halloweenCount = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of symbols
const halloweenCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 10; // count of symbols on mobile

const images = [
  "../Seasonals/Resources/halloween_images/ghost_20x20.png",
  "../Seasonals/Resources/halloween_images/bat_20x20.png",
  "../Seasonals/Resources/halloween_images/pumpkin_20x20.png",
];

let msgPrinted = false;

// function to check and control the halloween
function toggleHalloween() {
  const halloweenContainer = document.querySelector('.halloween-container');
  if (!halloweenContainer) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  // hide halloween if video/trailer player is active or dashboard is visible
  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    halloweenContainer.style.display = 'none'; // hide halloween
    if (!msgPrinted) {
      console.log('Halloween hidden');
      msgPrinted = true;
    }
  } else {
    halloweenContainer.style.display = 'block'; // show halloween
    if (msgPrinted) {
      console.log('Halloween visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleHalloween);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function initHalloween(count) {
  let halloweenContainer = document.querySelector('.halloween-container');
  if (!halloweenContainer) {
    halloweenContainer = document.createElement("div");
    halloweenContainer.className = "halloween-container";
    halloweenContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(halloweenContainer);
  }

  console.log('Adding halloween symbols');

  for (let i = 0; i < count; i++) {
    const halloweenDiv = document.createElement("div");
    halloweenDiv.className = "halloween";

    const imageSrc = images[Math.floor(Math.random() * images.length)];
    const img = document.createElement("img");
    img.src = imageSrc;

    halloweenDiv.appendChild(img);

    const randomLeft = Math.random() * 100; // position (0% to 100%)
    const randomAnimationDelay = Math.random() * 10; // delay (0s to 10s)
    // Display directly symbols on full screen (below) or let it build up (above)
    // const randomAnimationDelay = -(Math.random() * 10); // delay (-10s to 0s)
    const randomAnimationDelay2 = -(Math.random() * 3); // delay (-3s to 0s)

    // apply styles
    halloweenDiv.style.left = `${randomLeft}%`;
    halloweenDiv.style.animationDelay = `${randomAnimationDelay}s, ${randomAnimationDelay2}s`;

    // set random animation duration
    if (enableDiffrentDuration) {
      const randomAnimationDuration = Math.random() * 10 + 6; // delay (6s to 10s)
      const randomAnimationDuration2 = Math.random() * 5 + 2; // delay (2s to 5s)
      halloweenDiv.style.animationDuration = `${randomAnimationDuration}s, ${randomAnimationDuration2}s`;
    }

    halloweenContainer.appendChild(halloweenDiv);
  }
  console.log('Halloween symbols added');
}

// create fog layer
function createFog(container) {
  const fogContainer = document.createElement('div');
  fogContainer.className = 'halloween-fog-layer';
  
  const fog1 = document.createElement('div');
  fog1.className = 'halloween-fog-blob';
  
  const fog2 = document.createElement('div');
  fog2.className = 'halloween-fog-blob';
  
  fogContainer.appendChild(fog1);
  fogContainer.appendChild(fog2);
  container.appendChild(fogContainer);
}

// create dropping spiders
function createSpider(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'halloween-spider-wrapper';
    
    wrapper.innerHTML = `
      <div class="halloween-sway" style="display:flex; flex-direction:column; align-items:center; transform-origin: 50% -100vh;">
          <div class="halloween-thread"></div>
          <svg class="halloween-spider" viewBox="0 0 24 24" width="30" height="30">
            <circle cx="12" cy="12" r="6" fill="#1a1a1a"/>
            <!-- left legs -->
            <path d="M12 12 l-8 -4 M12 12 l-9 0 M12 12 l-8 4 M12 12 l-6 8" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <!-- right legs -->
            <path d="M12 12 l8 -4 M12 12 l9 0 M12 12 l8 4 M12 12 l6 8" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <circle cx="10" cy="14" r="1.5" fill="#ff3333"/>
            <circle cx="14" cy="14" r="1.5" fill="#ff3333"/>
          </svg>
      </div>
    `;
    
    wrapper.style.left = `${10 + Math.random() * 80}%`;
    const dropHeight = 30 + Math.random() * 50; // 30vh to 80vh
    wrapper.style.setProperty('--drop-height', `${dropHeight}vh`);
    
    const duration = Math.random() * 6 + 6; // 6-12s drop
    wrapper.style.animation = `spider-drop ${duration}s ease-in-out forwards`;
    
    // Start the sway animation only after the drop completes (30% of total duration)
    const sway = wrapper.querySelector('.halloween-sway');
    sway.style.animation = `wind-sway 8s ease-in-out ${duration * 0.3}s infinite`;
    
    // Spider retreat logic
    let isRetreating = false;
    wrapper.addEventListener('mouseenter', () => {
        if (isRetreating) return;
        isRetreating = true;
        // Retreat smoothly by pushing margin up
        wrapper.style.transition = 'margin-top 0.4s ease-in';
        wrapper.style.marginTop = '-100vh';
        
        setTimeout(() => {
            wrapper.remove();
            if (document.body.contains(container)) {
                setTimeout(() => createSpider(container), Math.random() * 5000 + 1000);
            }
        }, 500);
    });
    
    wrapper.addEventListener('animationend', () => {
        if (isRetreating) return;
        wrapper.remove();
        if (document.body.contains(container)) {
            setTimeout(() => createSpider(container), Math.random() * 5000 + 1000);
        }
    });
    
    container.appendChild(wrapper);
}

// create scurrying mice
function createMouse(container) {
    const mouse = document.createElement('div');
    mouse.className = 'halloween-mouse';
    mouse.innerHTML = `
      <svg viewBox="0 0 30 15" width="40" height="20">
        <ellipse cx="15" cy="10" rx="10" ry="5" fill="#111"/>
        <circle cx="24" cy="10" r="4" fill="#111"/> 
        <circle cx="24" cy="6" r="3" fill="#333"/> 
        <path d="M 5 10 Q 0 10 0 2" stroke="#111" stroke-width="1.5" fill="none"/> 
      </svg>
    `;
    
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    const duration = Math.random() * 3 + 2; // 2-5s run (fast)
    
    if (direction === 'right') {
        mouse.style.animation = `mouse-run-right ${duration}s linear forwards`;
        mouse.style.transform = 'scaleX(1)';
    } else {
        mouse.style.animation = `mouse-run-left ${duration}s linear forwards`;
        mouse.style.transform = 'scaleX(-1)';
    }
    
    mouse.style.bottom = `5px`; // Fixated bottom edge
    
    mouse.addEventListener('animationend', () => {
        mouse.remove();
        if (document.body.contains(container)) {
            setTimeout(() => createMouse(container), Math.random() * 4000 + 2000);
        }
    });
    
    container.appendChild(mouse);
}

function initializeHalloween() {
  if (!halloween) return;
  
  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
  const count = !isMobile ? halloweenCount : halloweenCountMobile;

  initHalloween(count);
  toggleHalloween();

  const container = document.querySelector('.halloween-container');

  if (container) {
      createFog(container);
      
      // Add a few spiders
      if (enableSpiders) {
          for (let i = 0; i < 4; i++) {
              setTimeout(() => createSpider(container), Math.random() * 5000);
          }
      }
      
      // Add a few mice
      if (enableMice) {
          for (let i = 0; i < 3; i++) {
              setTimeout(() => createMouse(container), Math.random() * 3000);
          }
      }
  }
}

initializeHalloween();
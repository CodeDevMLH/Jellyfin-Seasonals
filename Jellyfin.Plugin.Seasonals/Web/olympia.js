const config = window.SeasonalsPluginConfig?.Olympia || {};

const olympia = config.EnableOlympia !== undefined ? config.EnableOlympia : true; // enable/disable olympia theme
const symbolCount = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of floating symbols
const symbolCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 10; // count of floating symbols on mobile
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations

// Olympic Ring Colors (Carnival Config)
const confettiColors = ['#0081C8', '#FCB131', '#000000', '#00A651', '#EE334E'];
const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
const confettiCount = isMobile ? 30 : 60;

/**
 * Credits:
 * https://lottiefiles.com/free-animation/gold-coin-5Spp5kJbLP
 * https://lottiefiles.com/free-animation/silver-coin-SIgIP59fII
 * https://lottiefiles.com/free-animation/bronze-coin-wWVCJMsOUq
 */
const olympicMedals = [
    "../Seasonals/Resources/olympic_assets/gold_coin.gif",
    "../Seasonals/Resources/olympic_assets/silver_coin.gif",
    "../Seasonals/Resources/olympic_assets/bronze_coin.gif"
]

/**
 * Credits:
 * https://www.flaticon.com/de/kostenloses-icon/fackel_4683293
 * merged with:
 * https://lottiefiles.com/free-animation/abstract-flames-lottie-json-animation-oSb0IFoBrj
 */
const olympicTorch = "../Seasonals/Resources/olympic_assets/torch.gif";

let msgPrinted = false;

function toggleOlympia() {
  const container = document.querySelector('.olympia-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Olympia hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Olympia visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleOlympia);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createOlympia() {
    const container = document.querySelector('.olympia-container') || document.createElement('div');

    if (!document.querySelector('.olympia-container')) {
        container.className = 'olympia-container';
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    const standardCount = 15;
    
    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    let finalCount = isMobile ? symbolCountMobile : symbolCount;

    const useRandomDuration = enableDifferentDuration !== false;

    const olympicRings = ['ring_blue.css', 'ring_yellow.css', 'ring_black.css', 'ring_green.css', 'ring_red.css'];
    const activeItems = [...olympicMedals, ...olympicRings];

    for (let i = 0; i < finalCount; i++) {
        let symbol = document.createElement('div');
        
        const randomImgUrl = activeItems[Math.floor(Math.random() * activeItems.length)];
        const isRing = randomImgUrl.includes('ring_');
        const isMedal = randomImgUrl.includes('_coin');

        symbol.className = `olympia-symbol`;

        // Create inner div for sway/rotation
        let innerDiv = document.createElement('div');
        innerDiv.className = 'olympia-inner';
        let img = null;

        if (isRing) {
             const colorName = randomImgUrl.split('ring_')[1].split('.')[0];
             const ringColorMap = {
                 'blue': '#0081C8',
                 'yellow': '#FCB131',
                 'black': '#000000',
                 'green': '#00A651',
                 'red': '#EE334E'
             };
             let ringDiv = document.createElement('div');
             ringDiv.className = 'olympia-ring-css';
             ringDiv.style.setProperty('--ring-color', ringColorMap[colorName]);
             innerDiv.appendChild(ringDiv);
             
             // Add a 3D flip animation for rings
             const spinReverse = Math.random() > 0.5 ? 'reverse' : 'normal';
             innerDiv.style.animation = `olympia-tumble-3d ${Math.random() * 4 + 4}s linear infinite ${spinReverse}`;
             
             // Random 3D Rotation Axis for Tumbling
             innerDiv.style.setProperty('--rot-x', (Math.random() * 2 - 1).toFixed(2));
             innerDiv.style.setProperty('--rot-y', (Math.random() * 2 - 1).toFixed(2));
             innerDiv.style.setProperty('--rot-z', (Math.random() * 2 - 1).toFixed(2));
        } else {
            img = document.createElement('img');
            img.src = randomImgUrl;
            img.onerror = function() {
                symbol.remove();
            };
            innerDiv.appendChild(img);
            
            if (isMedal) {
                innerDiv.style.animation = `olympia-flip-3d ${Math.random() * 4 + 3}s linear infinite`;
            } else {
                // Torch sways, medals flip
                const swayDur = Math.random() * 2 + 2; // 2 to 4s
                const swayDir = Math.random() > 0.5 ? 'normal' : 'reverse';
                innerDiv.style.animation = `olympia-sway ${swayDur}s ease-in-out infinite alternate ${swayDir}`;
            }
        }

        symbol.appendChild(innerDiv);

        const leftPos = Math.random() * 95;
        const delaySeconds = Math.random() * 10;
        
        // Depth logic for medals and rings
        const depth = Math.random();
        const scale = 0.8 + depth * 0.4; // 0.8 to 1.2
        const zIndex = Math.floor(depth * 30) + 10;
        
        if (img) {
            img.style.transform = `scale(${scale})`;
        } else {
            innerDiv.firstChild.style.transform = `scale(${scale})`;
        }
        symbol.style.zIndex = zIndex;

        let durationSeconds = 8;
        if (useRandomDuration) {
            durationSeconds = (1 - depth) * 5 + 6 + Math.random() * 4; 
        }

        symbol.style.animation = `olympia-fall ${durationSeconds}s linear infinite`;
        symbol.style.animationDelay = `${delaySeconds}s`;
        symbol.style.left = `${leftPos}vw`;
        
        container.appendChild(symbol);
    }

    // Olympic Torches (Fixed at bottom corners, symmetrically rotated inward)
    // Generate one random inward rotation (10 to 25 deg) for both to share
    const sharedTilt = Math.random() * 15 + 10;
    
    const createTorch = (isLeft) => {
        const torch = document.createElement('div');
        torch.className = 'olympia-flame';
        
        if (isLeft) {
            torch.style.left = '5vw';
            // Lean right, face normal
            torch.style.transform = `rotate(${sharedTilt}deg) scaleX(1)`;
        } else {
            torch.style.right = '5vw';
             // Lean left, mirror image
            torch.style.transform = `rotate(-${sharedTilt}deg) scaleX(-1)`;
        }
        
        let torchImg = document.createElement('img');
        torchImg.src = `../Seasonals/Resources/olympic_assets/torch.gif`;
        torchImg.style.height = '25vh';
        torchImg.style.objectFit = 'contain';
        torchImg.onerror = function() {
            this.style.display = 'none';
        };
        torch.appendChild(torchImg);
        container.appendChild(torch);
    };

    createTorch(true);
    createTorch(false);
    
    for (let i = 0; i < confettiCount; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'olympia-confetti-wrapper';
        
        let leftPos = Math.random() * 100;
        wrapper.style.left = `${leftPos}vw`;
        
        let fallDuration = Math.random() * 3 + 4; // 4 to 7 seconds to fall
        wrapper.style.animationDuration = `${fallDuration}s`;
        wrapper.style.animationDelay = `-${Math.random() * fallDuration}s`; // Negative delay so it distributes perfectly immediately
        
        let swayWrapper = document.createElement('div');
        swayWrapper.className = 'olympia-confetti-sway';
        let swayDuration = Math.random() * 2 + 1.5; // 1.5s to 3.5s
        swayWrapper.style.animationDuration = `${swayDuration}s`;
        let swayAmount = Math.random() * 30 + 30; // 30px to 60px
        swayWrapper.style.setProperty('--sway-amount', `${swayAmount}px`);
        let initSwayDelay = Math.random() * swayDuration;
        swayWrapper.style.animationDelay = `-${initSwayDelay}s`;

        let confetti = document.createElement('div');
        confetti.className = 'olympia-confetti';
        
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.backgroundColor = color;
        
        // Random shape
        const shape = Math.random();
        if (shape > 0.66) {
            confetti.classList.add('circle');
            const size = Math.random() * 5 + 5; 
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
        } else if (shape > 0.33) {
            confetti.classList.add('rect');
            const width = Math.random() * 4 + 4; 
            const height = Math.random() * 5 + 8; 
            confetti.style.width = `${width}px`;
            confetti.style.height = `${height}px`;
        } else {
            confetti.classList.add('triangle');
        }
        
        // Random 3D Rotation for flutter
        confetti.style.setProperty('--rx', Math.random().toFixed(2));
        confetti.style.setProperty('--ry', Math.random().toFixed(2));
        confetti.style.setProperty('--rz', (Math.random() * 0.5).toFixed(2));
        confetti.style.setProperty('--rot-dir', `${(Math.random() > 0.5 ? 1 : -1) * 360}deg`);
        let rotateDuration = Math.random() * 0.8 + 0.4;
        confetti.style.animationDuration = `${rotateDuration}s`;

        swayWrapper.appendChild(confetti);
        wrapper.appendChild(swayWrapper);
        container.appendChild(wrapper);
    }
}

function initializeOlympia() {
  if (!olympia) return;
  createOlympia();
  toggleOlympia();
}

initializeOlympia();

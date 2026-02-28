const config = window.SeasonalsPluginConfig?.Birthday || {};

const birthday = config.EnableBirthday !== undefined ? config.EnableBirthday : true; // enable/disable birthday symbols
const symbolCount = config.SymbolCount !== undefined ? config.SymbolCount : 12; // count of balloons
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different duration for the symbols
const symbolCountMobile = config.SymbolCountMobile !== undefined ? config.SymbolCountMobile : 5; // count of mobile balloons
const baseConfettiCount = config.ConfettiCount !== undefined ? config.ConfettiCount : 60; // count of confetti

/**
 * Base ballon image: https://www.flaticon.com/de/kostenloses-icon/ballon_1512470
 * modified by CodeDevMLH
 */
const birthdayImages = [
    '../Seasonals/Resources/birthday_assets/balloon_blue.gif',
    '../Seasonals/Resources/birthday_assets/balloon_green.gif',
    '../Seasonals/Resources/birthday_assets/balloon_lightblue.gif',
    '../Seasonals/Resources/birthday_assets/balloon_orange.gif',
    '../Seasonals/Resources/birthday_assets/balloon_pink.gif',
    '../Seasonals/Resources/birthday_assets/balloon_red.gif',
    '../Seasonals/Resources/birthday_assets/balloon_yellow.gif',
    '../Seasonals/Resources/birthday_assets/balloon_turquoise.gif',
    '../Seasonals/Resources/birthday_assets/balloon_violet.gif'
];


const balloonColors = {
    'balloon_blue': ['#3498db', '#2980b9', '#1f618d'],
    'balloon_green': ['#2ecc71', '#27ae60', '#1e8449'],
    'balloon_lightblue': ['#36c5f0', '#81ecec', '#00cec9'],
    'balloon_orange': ['#e67e22', '#d35400', '#a04000'],
    'balloon_pink': ['#ff726d', '#f4306d', '#e84393'],
    'balloon_red': ['#e74c3c', '#c0392b', '#922b21'],
    'balloon_yellow': ['#f1c40f', '#f39c12', '#b7950b'],
    'balloon_turquoise': ['#36c5f0', '#81ecec', '#00cec9'],
    'balloon_violet': ['#9b59b6', '#8e44ad', '#6c3483']
};

let msgPrinted = false;

function toggleBirthday() {
  const container = document.querySelector('.birthday-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Birthday hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Birthday visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleBirthday);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createBalloonPopConfetti(container, x, y, colors) {
    const popConfettiColors = colors || [
        '#fce18a', '#ff726d', '#b48def', '#f4306d', 
        '#36c5f0', '#2ccc5d', '#e9b31d', '#9b59b6', 
        '#3498db', '#e74c3c', '#1abc9c', '#f1c40f'
    ];
    
    // Spawn 15-20 particles
    const particleCount = Math.floor(Math.random() * 5) + 15;
    
    for (let i = 0; i < particleCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'birthday-burst-wrapper';
        wrapper.style.position = 'absolute';
        wrapper.style.left = `${x}px`;
        wrapper.style.top = `${y}px`;
        wrapper.style.zIndex = '1000';

        const particle = document.createElement('div');
        particle.classList.add('birthday-burst-confetti');
        
        // Random color
        const color = popConfettiColors[Math.floor(Math.random() * popConfettiColors.length)];
        particle.style.backgroundColor = color;
        
        // Random shape
        const shape = Math.random();
        if (shape > 0.66) {
            particle.classList.add('circle');
            const size = Math.random() * 4 + 4; // 4-8px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        } else if (shape > 0.33) {
            particle.classList.add('rect');
            const width = Math.random() * 3 + 3; // 3-6px
            const height = Math.random() * 4 + 6; // 6-10px
            particle.style.width = `${width}px`;
            particle.style.height = `${height}px`;
        } else {
            particle.classList.add('triangle');
        }

        // Random direction for explosion (circular)
        const angle = Math.random() * 2 * Math.PI; 
        const distance = Math.random() * 60 + 20; // 20-80px burst radius
        
        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;
        
        particle.style.setProperty('--burst-x', `${xOffset}px`);
        wrapper.style.setProperty('--burst-y', `${yOffset}px`);
        
        // Random rotation during fall
        particle.style.setProperty('--rot-dir', `${(Math.random() > 0.5 ? 1 : -1) * 360}deg`);
        particle.style.setProperty('--rx', Math.random().toFixed(2));
        particle.style.setProperty('--ry', Math.random().toFixed(2));
        particle.style.setProperty('--rz', (Math.random() * 0.5).toFixed(2));
        
        wrapper.appendChild(particle);
        container.appendChild(wrapper);
        
        // Remove particle after animation
        setTimeout(() => wrapper.remove(), 1000);
    }
}

function createBirthday() {
    const container = document.querySelector('.birthday-container') || document.createElement('div');

    if (!document.querySelector('.birthday-container')) {
        container.className = 'birthday-container';
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }

    // Cake and Garland have been removed

    let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
    let finalCount = isMobile ? symbolCountMobile : symbolCount;

    const useRandomDuration = enableDifferentDuration !== false;

    // Arrays moved to top of file

    for (let i = 0; i < finalCount; i++) {
        let symbol = document.createElement('div');
        
        const randomImage = birthdayImages[Math.floor(Math.random() * birthdayImages.length)];
        const randomItem = randomImage.split('/').pop().split('.')[0]; // Extracts "balloon_blue"
        symbol.className = `birthday-symbol birthday-${randomItem}`;

        // Create inner div for sway
        let innerDiv = document.createElement('div');
        innerDiv.className = 'birthday-inner';

        let img = document.createElement('img');
        img.src = randomImage;
        img.onerror = function() {
            symbol.remove(); // Remove element completely on error
        };
        innerDiv.appendChild(img);
        
        // Sway wrapper
        let swayWrapper = document.createElement('div');
        swayWrapper.className = 'birthday-sway';
        const swayDuration = Math.random() * 3 + 3; // 3-6s per cycle
        swayWrapper.style.animationDuration = `${swayDuration}s`;
        swayWrapper.style.animationDelay = `-${Math.random() * 5}s`;
        const swayAmount = Math.random() * 60 + 20; // 20-80px
        const direction = Math.random() > 0.5 ? 1 : -1;
        swayWrapper.style.setProperty('--sway-amount', `${swayAmount * direction}px`);
        
        swayWrapper.appendChild(innerDiv);
        symbol.appendChild(swayWrapper);

        const leftPos = Math.random() * 95;
        
        // Far away effect
        const depth = Math.random();
        // MARK: balloon size
        const scale = 0.85 + depth * 0.3; // 0.85 to 1.15
        const zIndex = Math.floor(depth * 30) + 10;
        
        img.style.transform = `scale(${scale})`;
        symbol.style.zIndex = zIndex;

        let durationSeconds = 9;
        if (useRandomDuration) {
            // Far strings climb slower
            durationSeconds = (1 - depth) * 6 + 7 + Math.random() * 4; 
        }
        
        // Negative delay correctly scatters them initially across the screen vertically
        // avoiding them all popping up at bottom edge together
        const delaySeconds = -(Math.random() * durationSeconds);

        const isBalloon = randomItem.startsWith('balloon');

        if (isBalloon) {
            // Sway animation is now handled natively by the GIF motion.
            
            // Interaction to pop is handled visually by the GIF, but we can still remove it on hover
            innerDiv.addEventListener('mouseenter', function(e) {
                if (!this.classList.contains('popped')) {
                    this.classList.add('popped');
                    this.style.animation = 'birthday-pop 0.2s ease-out forwards';
                    this.style.pointerEvents = 'none'; // avoid re-triggering
                    
                    // Create confetti burst at balloon's screen position
                    const rect = this.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    // explosion height
                    const cy = rect.top + rect.height * -0.05;
                    // Ensure the burst container is appended to the main document body or the birthday container
                    createBalloonPopConfetti(document.body, cx, cy, balloonColors[randomItem]);
                }
            });

            // Reset the balloon when it reappears at the bottom of the screen
            symbol.addEventListener('animationiteration', function(e) {
                // Ignore bubbling events from the inner sway animation
                if (e.animationName === 'birthday-rise' || e.target === symbol) {
                    if (innerDiv.classList.contains('popped')) {
                        innerDiv.classList.remove('popped');
                        innerDiv.style.animation = '';
                        innerDiv.style.pointerEvents = 'auto';
                    }
                }
            });
        }

        const startRot = (Math.random() * 20) - 10; // -10 to +10 spread
        symbol.style.setProperty('--start-rot', `${startRot}deg`);
        symbol.style.setProperty('--x-pos', `${leftPos}vw`);

        symbol.style.animationDuration = `${durationSeconds}s`;
        symbol.style.animationDelay = `${delaySeconds}s`;

        container.appendChild(symbol);
    }

    // Party Confetti
    const confettiCount = baseConfettiCount;
    const allColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
    
    for (let i = 0; i < confettiCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('birthday-confetti-wrapper');
        
        // Use carnival.js 3D advanced fluttering logic
        let swayWrapper = document.createElement('div');
        swayWrapper.classList.add('birthday-sway');
        wrapper.appendChild(swayWrapper);

        const confetti = document.createElement('div');
        confetti.classList.add('birthday-confetti');

        const color = allColors[Math.floor(Math.random() * allColors.length)];
        confetti.style.backgroundColor = color;

        // Shape assignments
        const shape = Math.random();
        if (shape > 0.8) confetti.classList.add('circle');
        else if (shape > 0.6) confetti.classList.add('square');
        else if (shape > 0.4) confetti.classList.add('triangle');
        else confetti.classList.add('rect'); // default

        // Sizing
        if (!confetti.classList.contains('circle') && !confetti.classList.contains('square') && !confetti.classList.contains('triangle')) {
            const width = Math.random() * 3 + 4; // 4-7px
            const height = Math.random() * 5 + 8; // 8-13px
            confetti.style.width = `${width}px`;
            confetti.style.height = `${height}px`;
        } else if (confetti.classList.contains('circle') || confetti.classList.contains('square')) {
            const size = Math.random() * 5 + 5; // 5-10px
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
        }

        const duration = Math.random() * 5 + 5; 
        const delay = -Math.random() * duration; // Spawn fully integrated across screen width/height
        
        wrapper.style.setProperty('--x-pos', `${Math.random() * 100}vw`);
        wrapper.style.animationDelay = `${delay}s`;
        wrapper.style.animationDuration = `${duration}s`;
        
        // Sway handling
        const swayDuration = Math.random() * 2 + 3; // 3-5s per cycle
        swayWrapper.style.animationDuration = `${swayDuration}s`;
        swayWrapper.style.animationDelay = `-${Math.random() * 5}s`;
        const swayAmount = Math.random() * 70 + 30; // 30-100px
        const direction = Math.random() > 0.5 ? 1 : -1;
        swayWrapper.style.setProperty('--sway-amount', `${swayAmount * direction}px`);
        
        // 3D Flutter Rotation
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confetti.style.setProperty('--rx', Math.random().toFixed(2));
        confetti.style.setProperty('--ry', Math.random().toFixed(2));
        confetti.style.setProperty('--rz', (Math.random() * 0.5).toFixed(2));
        const rotDir = Math.random() > 0.5 ? 1 : -1;
        confetti.style.setProperty('--rot-dir', `${rotDir * 360}deg`);

        swayWrapper.appendChild(confetti);
        container.appendChild(wrapper);
    }
}

/* Removed fallback logic */

function initializeBirthday() {
  if (!birthday) return;
  createBirthday();
  toggleBirthday();
}

initializeBirthday();

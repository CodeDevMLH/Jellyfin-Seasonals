const config = window.SeasonalsPluginConfig?.MarioDay || {};
const marioday = config.EnableMarioDay !== undefined ? config.EnableMarioDay : true; // enable/disable marioday
const letMarioJump = config.LetMarioJump !== undefined ? config.LetMarioJump : true; // optionally let mario jump occasionally

// Credit: https://gifs.alphacoders.com/gifs/view/2585
const marioImage = '../Seasonals/Resources/mario_assets/mario.gif';

let msgPrinted = false;

function toggleMarioDay() {
    const container = document.querySelector('.marioday-container');
    if (!container) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        container.style.display = 'none';
        if (!msgPrinted) {
            console.log('MarioDay hidden');
            msgPrinted = true;
        }
    } else {
        container.style.display = 'block';
        if (msgPrinted) {
            console.log('MarioDay visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleMarioDay);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createMarioDay(container) {
    // MARK: Mario's running speed across the screen
    const marioSpeedSeconds = 18;

    const wrapper = document.createElement('div');
    wrapper.className = 'mario-wrapper';
    wrapper.style.animationDuration = `${marioSpeedSeconds}s`;

    const mario = document.createElement('img');
    mario.className = 'mario-runner';
    mario.src = marioImage;
    
    wrapper.appendChild(mario);
    container.appendChild(wrapper);
    
    let jumpCount = 0;
    let maxJumpsForThisRun = Math.floor(Math.random() * 3); // 0, 1, or 2

    const resetJumpInterval = setInterval(() => {
        if (!document.body.contains(container)) { clearInterval(resetJumpInterval); return; }
        jumpCount = 0;
        maxJumpsForThisRun = Math.floor(Math.random() * 3); // Randomize jumps for the next pass
    }, (marioSpeedSeconds / 2) * 1000);

    // Periodically throw out an 8-bit coin
    const intervalId = setInterval(() => {
        if (!document.body.contains(container)) { clearInterval(intervalId); return; }
        if (container.style.display === 'none') return;

        const marioRect = wrapper.getBoundingClientRect();
        if (marioRect.left < 0 || marioRect.right > window.innerWidth) return;

        if (letMarioJump && !mario.classList.contains('mario-jump') && jumpCount < maxJumpsForThisRun) {
            mario.classList.add('mario-jump');
            jumpCount++;
            setTimeout(() => mario.classList.remove('mario-jump'), 800);
        }

        const coin = document.createElement('div');
        coin.className = 'mario-coin';
        
        // Grab Mario's current screen position to lock the coin's X coordinate
        coin.style.left = `${marioRect.left + 16}px`;
        coin.style.bottom = '35px'; // bottom offset
        
        container.appendChild(coin);
        setTimeout(() => coin.remove(), 2000);

    }, 4000);
}


function initializeMarioDay() {
    if (!marioday) return;

    const container = document.querySelector('.marioday-container') || document.createElement("div");

    if (!document.querySelector('.marioday-container')) {
        container.className = "marioday-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    
    createMarioDay(container);
    toggleMarioDay();
}

initializeMarioDay();

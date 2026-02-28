const config = window.SeasonalsPluginConfig?.Friday13 || {};
const friday13 = config.EnableFriday13 !== undefined ? config.EnableFriday13 : true; // enable/disable friday13

let msgPrinted = false;

function toggleFriday13() {
    const container = document.querySelector('.friday13-container');
    if (!container) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        container.style.display = 'none';
        if (!msgPrinted) {
            console.log('Friday13 hidden');
            msgPrinted = true;
        }
    } else {
        container.style.display = 'block';
        if (msgPrinted) {
            console.log('Friday13 visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleFriday13);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createFriday13(container) {
    function spawnCat() {
        // MARK: Height of the cat from bottom
        const catBottomPosition = "-15px"; 
        // MARK: Time it takes for the cat to cross the screen
        const catWalkDurationSeconds = 20;
        
        const cat = document.createElement('img');
        cat.className = 'friday13-cat';
        cat.src = '../Seasonals/Resources/friday_assets/black-cat.gif';
        cat.style.bottom = catBottomPosition;
        
        // Either walk left to right or right to left
        const dir = Math.random() > 0.5 ? 'right' : 'left';
        cat.style.animationName = `cat-walk-${dir}`;
        cat.style.animationDuration = `${catWalkDurationSeconds}s`;
        cat.style.animationIterationCount = `1`; // play once and remove
        cat.style.animationFillMode = `forwards`;
        
        container.appendChild(cat);
        
        // Remove and respawn
        setTimeout(() => {
            if (cat.parentNode) {
                cat.parentNode.removeChild(cat);
            }
            // Respawn with random delay between 5 to 25 seconds
            setTimeout(() => { if (document.body.contains(container)) spawnCat(); }, Math.random() * 20000 + 5000);
        }, (catWalkDurationSeconds * 1000) + 500); // Wait for duration + 500ms safety margin
    }
    
    // Initial spawn with random delay
    setTimeout(() => { if (document.body.contains(container)) spawnCat(); }, Math.random() * 5000);
}

function initializeFriday13() {
    if (!friday13) return;
    const container = document.querySelector('.friday13-container') || document.createElement("div");
    if (!document.querySelector('.friday13-container')) {
        container.className = "friday13-container";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
    }
    createFriday13(container);
    toggleFriday13();
}
initializeFriday13();

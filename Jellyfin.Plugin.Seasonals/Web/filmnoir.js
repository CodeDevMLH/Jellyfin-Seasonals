const config = window.SeasonalsPluginConfig?.FilmNoir || {};
const filmnoir = config.EnableFilmNoir !== undefined ? config.EnableFilmNoir : true; // enable/disable filmnoir

let msgPrinted = false;

function toggleFilmNoir() {
    const tint = document.querySelector('.filmnoir-tint');
    const effects = document.querySelector('.filmnoir-effects');
    if (!tint || !effects) return;

    const videoPlayer = document.querySelector('.videoPlayerContainer');
    const trailerPlayer = document.querySelector('.youtubePlayerContainer');
    const isDashboard = document.body.classList.contains('dashboardDocument');
    const hasUserMenu = document.querySelector('#app-user-menu');

    if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
        tint.style.display = 'none';
        effects.style.display = 'none';
        if (!msgPrinted) {
            console.log('FilmNoir hidden');
            msgPrinted = true;
        }
    } else {
        tint.style.display = 'block';
        effects.style.display = 'block';
        if (msgPrinted) {
            console.log('FilmNoir visible');
            msgPrinted = false;
        }
    }
}

const observer = new MutationObserver(toggleFilmNoir);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createFilmNoir() {
    if (!document.querySelector('.filmnoir-tint')) {
        const tint = document.createElement('div');
        tint.className = 'filmnoir-tint';
        tint.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tint);
    }

    let effects = document.querySelector('.filmnoir-effects');
    if (!effects) {
        effects = document.createElement('div');
        effects.className = 'filmnoir-effects';
        effects.setAttribute('aria-hidden', 'true');
        document.body.appendChild(effects);

        const vignette = document.createElement('div');
        vignette.className = 'filmnoir-vignette';

        const grain = document.createElement('div');
        grain.className = 'filmnoir-grain';

        const scratches = document.createElement('div');
        scratches.className = 'filmnoir-scratches';

        effects.appendChild(grain);
        effects.appendChild(scratches);
        effects.appendChild(vignette);
    }
}


function initializeFilmNoir() {
    if (!filmnoir) return;
    
    createFilmNoir();
    toggleFilmNoir();
}

initializeFilmNoir();

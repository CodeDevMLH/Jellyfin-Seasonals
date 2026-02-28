const config = window.SeasonalsPluginConfig?.Eurovision || {};

const enabled = config.EnableEurovision !== undefined ? config.EnableEurovision : true; // enable/disable eurovision
const elementCount = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of notes
const enableDifferentDuration = config.EnableDifferentDuration !== undefined ? config.EnableDifferentDuration : true; // enable different durations
const enableColorfulNotes = config.EnableColorfulNotes !== undefined ? config.EnableColorfulNotes : true; // enable/disable colorful notes
const eurovisionColorsStr = config.EurovisionColors !== undefined ? config.EurovisionColors : '#ff0026ff, #17a6ffff, #32d432ff, #FFD700, #f0821bff, #f826f8ff'; // colors to use
const glowSize = config.EurovisionGlowSize !== undefined ? config.EurovisionGlowSize : 2; // size of eurovision glow

let msgPrinted = false;

function toggleEurovision() {
  const container = document.querySelector('.eurovision-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('Eurovision hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('Eurovision visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleEurovision);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createElements() {
  const container = document.querySelector('.eurovision-container') || document.createElement('div');

  if (!document.querySelector('.eurovision-container')) {
    container.className = 'eurovision-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  const notesSymbols = ['♪', '♫', '♬', '♭', '♮', '♯', '𝄞', '𝄢'];
  const pColors = eurovisionColorsStr.split(',').map(s => s.trim()).filter(s => s);

  for (let i = 0; i < elementCount; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'music-note-wrapper';
    
    const note = document.createElement('span');
    note.className = 'music-note';
    note.textContent = notesSymbols[Math.floor(Math.random() * notesSymbols.length)];
    wrapper.appendChild(note);

    wrapper.style.top = `${Math.random() * 90}vh`;

    const minMoveDur = 10;
    const maxMoveDur = 25;
    const moveDur = enableDifferentDuration 
        ? minMoveDur + Math.random() * (maxMoveDur - minMoveDur) 
        : (minMoveDur + maxMoveDur) / 2;
    wrapper.style.animationDuration = `${moveDur}s`;
    wrapper.style.animationDelay = `${Math.random() * 15}s`;

    const minSwayDur = 1;
    const maxSwayDur = 3;
    const swayDur = minSwayDur + Math.random() * (maxSwayDur - minSwayDur);
    note.style.animationDuration = `${swayDur}s`;
    note.style.animationDelay = `${Math.random() * 2}s`;

    note.style.fontSize = `${Math.random() * 1.5 + 1.5}rem`;

    if (enableColorfulNotes && pColors.length > 0) {
        note.style.color = pColors[Math.floor(Math.random() * pColors.length)];
        note.style.textShadow = `0 0 ${glowSize}px ${note.style.color}`;
    } else {
        note.style.color = `rgba(255, 255, 255, 0.9)`;
        note.style.textShadow = `0 0 ${glowSize}px rgba(255, 255, 255, 0.6)`;
    }

    container.appendChild(wrapper);
  }
}

function initializeEurovision() {
  if (!enabled) return;
  createElements();
  toggleEurovision();
}

initializeEurovision();

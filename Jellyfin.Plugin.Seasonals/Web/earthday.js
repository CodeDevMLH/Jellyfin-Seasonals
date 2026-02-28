const config = window.SeasonalsPluginConfig?.EarthDay || {};

const enabled = config.EnableEarthDay !== undefined ? config.EnableEarthDay : true; // enable/disable earthday
const vineCount = config.VineCount !== undefined ? config.VineCount : 4; // count of vine

const flowerColors = ['#FF69B4', '#FFD700', '#87CEFA', '#FF4500', '#BA55D3', '#FFA500', '#FF1493'];

let msgPrinted = false;

// Toggle Function
function toggleEarthDay() {
  const container = document.querySelector('.earthday-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('EarthDay hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('EarthDay visible');
      msgPrinted = false;
    }
  }
}

const observer = new MutationObserver(toggleEarthDay);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});


function createElements() {
  const container = document.querySelector('.earthday-container') || document.createElement('div');

  if (!document.querySelector('.earthday-container')) {
    container.className = 'earthday-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  const w = window.innerWidth;
  // MARK: GRASS HEIGHT CONFIGURATION
  // To prevent squishing, hSVG calculation MUST match the height in earthday.css exactly
  // earthday.css uses 8vh, so here it is 0.08
  const hSVG = Math.floor(window.innerHeight * 0.08) || 80;
  let paths = '';
  
  // Generate Grass
  for (let i = 0; i < 400; i++) {
      const x = Math.random() * w;
      const h = hSVG * 0.2 + Math.random() * (hSVG * 0.8);
      const cY = hSVG - h;
      const bend = x + (Math.random() * 15 - 7.5); // curvature
      const color = Math.random() > 0.5 ? '#2E8B57' : '#3CB371';
      const width = 1 + Math.random() * 2;
      paths += `<path d="M ${x} ${hSVG} Q ${bend} ${cY+hSVG*0.2} ${bend} ${cY}" stroke="${color}" stroke-width="${width}" fill="none"/>`;
  }

  // Generate Flowers
  const flowerCount = Math.max(10, vineCount * 15);
  for (let i = 0; i < flowerCount; i++) {
      const x = 10 + Math.random() * (w - 20);
      const y = hSVG * 0.1 + Math.random() * (hSVG * 0.5);
      const col = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      
      paths += `<path d="M ${x} ${hSVG} Q ${x - 5 + Math.random() * 10} ${y+15} ${x} ${y}" stroke="#006400" stroke-width="1.5" fill="none"/>`;
      
      const r = 2 + Math.random() * 1.5;
      paths += `<circle cx="${x-r}" cy="${y-r}" r="${r}" fill="${col}"/>`;
      paths += `<circle cx="${x+r}" cy="${y-r}" r="${r}" fill="${col}"/>`;
      paths += `<circle cx="${x-r}" cy="${y+r}" r="${r}" fill="${col}"/>`;
      paths += `<circle cx="${x+r}" cy="${y+r}" r="${r}" fill="${col}"/>`;
      paths += `<circle cx="${x}" cy="${y}" r="${r*0.7}" fill="#FFF8DC"/>`;
  }

  const svgContent = `
  <svg class="earthday-meadow" viewBox="0 0 ${w} ${hSVG}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <g class="earthday-sway">
          ${paths}
      </g>
  </svg>
  `;

  container.innerHTML = svgContent;
}

// Responsive Resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleResize = debounce(() => {
    const container = document.querySelector('.earthday-container');
    if (container) {
        container.innerHTML = '';
        createElements();
    }
}, 250);

window.addEventListener('resize', handleResize);

function initializeEarthDay() {
  if (!enabled) return;
  createElements();
  toggleEarthDay();
}

initializeEarthDay();

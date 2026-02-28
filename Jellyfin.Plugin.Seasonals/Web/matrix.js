const config = window.SeasonalsPluginConfig?.Matrix || {};

const enabled = config.EnableMatrix !== undefined ? config.EnableMatrix : true; // enable/disable matrix
const maxTrails = config.SymbolCount !== undefined ? config.SymbolCount : 25; // count of max trails on screen
const backgroundMode = config.EnableMatrixBackground !== undefined ? config.EnableMatrixBackground : false; // enable/disable matrix as background
const matrixChars = config.MatrixChars !== undefined ? config.MatrixChars : '0123456789'; // characters to use in the matrix rain, default is '0123456789'

let msgPrinted = false;
let isHidden = false;

// Toggle Function
function toggleMatrix() {
  const container = document.querySelector('.matrix-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    if (!isHidden) {
      container.style.display = 'none';
      isHidden = true;
      if (!msgPrinted) {
        console.log('Matrix hidden');
        msgPrinted = true;
      }
    }
  } else {
    if (isHidden) {
      container.style.display = 'block';
      isHidden = false;
      if (msgPrinted) {
        console.log('Matrix visible');
        msgPrinted = false;
      }
    }
  }
}

const observer = new MutationObserver(toggleMatrix);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

function createElements() {
  const container = document.querySelector('.matrix-container') || document.createElement('div');

  if (!document.querySelector('.matrix-container')) {
    container.className = 'matrix-container';
    container.setAttribute('aria-hidden', 'true');
    if (backgroundMode) container.style.zIndex = '5';
    document.body.appendChild(container);
  }

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
//   const chars = '0123456789πABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const chars = matrixChars.split('');
  const fontSize = 18;

  class Trail {
      constructor() {
          this.reset();
          this.y = Math.random() * -100; // Allow initial staggered start
      }
      reset() {
          const cols = Math.floor(canvas.width / fontSize);
          this.x = Math.floor(Math.random() * cols);
          this.y = -Math.round(Math.random() * 20);
          this.speed = 0.5 + Math.random() * 0.5;
          this.len = 10 + Math.floor(Math.random() * 20);
          this.chars = [];
          for(let i=0; i<this.len; i++) {
              this.chars.push(chars[Math.floor(Math.random() * chars.length)]);
          }
      }
      update() {
          const oldY = Math.floor(this.y);
          this.y += this.speed;
          const newY = Math.floor(this.y);

          // If crossed a full vertical unit, push a new character and pop the old one to preserve screen positions
          if (newY > oldY) {
              this.chars.unshift(chars[Math.floor(Math.random() * chars.length)]);
              this.chars.pop();
          }

          // Randomly mutate some characters (heads mutate faster)
          for (let i = 0; i < this.len; i++) {
              const chance = i < 3 ? 0.90 : 0.98;
              if (Math.random() > chance) {
                  this.chars[i] = chars[Math.floor(Math.random() * chars.length)];
              }
          }
          if (this.y - this.len > Math.ceil(canvas.height / fontSize)) {
              this.reset();
          }
      }
      draw(ctx) {
          const headY = Math.floor(this.y);
          for (let i = 0; i < this.len; i++) {
              const charY = headY - i;
              if (charY < 0 || charY * fontSize > canvas.height + fontSize) continue;
              
              const ratio = i / this.len;
              const alpha = 1 - ratio;

              if (i === 0) {
                  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                  ctx.shadowBlur = 8;
                  ctx.shadowColor = '#0F0';
              } else if (i === 1) {
                  ctx.fillStyle = `rgba(150, 255, 150, ${alpha})`;
                  ctx.shadowBlur = 4;
                  ctx.shadowColor = '#0F0';
              } else {
                  ctx.fillStyle = `rgba(0, 255, 0, ${alpha * 0.8})`;
                  ctx.shadowBlur = 0;
              }
              
              ctx.fillText(this.chars[i], this.x * fontSize + fontSize/2, charY * fontSize);
          }
      }
  }

  const trails = [];
  for(let i=0; i<maxTrails; i++) trails.push(new Trail());

  function loop() {
      if (!document.body.contains(container)) { clearInterval(window.matrixInterval); return; }
      if (isHidden) return; // Pause drawing when hidden
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'bold ' + fontSize + 'px monospace';
      ctx.textAlign = 'center';
      for (const t of trails) {
          t.update();
          t.draw(ctx);
      }
  }

  if (window.matrixInterval) clearInterval(window.matrixInterval);
  window.matrixInterval = setInterval(loop, 50);

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });
}

function initializeMatrix() {
  if (!enabled) return;
  createElements();
  toggleMatrix();
}

initializeMatrix();

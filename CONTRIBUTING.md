# Contributing to Jellyfin Seasonals Plugin

Thank you for your interest in contributing seasonal themes to the Jellyfin Seasonals Plugin! This guide explains how seasonal themes are structured, how to create your own, and how to test them locally before submitting a pull request.

---

## Table of Contents

- [Contributing to Jellyfin Seasonals Plugin](#contributing-to-jellyfin-seasonals-plugin)
  - [Table of Contents](#table-of-contents)
  - [Theme Architecture Overview](#theme-architecture-overview)
  - [Standard Theme File Structure](#standard-theme-file-structure)
  - [JavaScript File Pattern](#javascript-file-pattern)
    - [Key Rules](#key-rules)
  - [CSS File Pattern](#css-file-pattern)
    - [Key Rules](#key-rules-1)
  - [Image Assets (Optional)](#image-assets-optional)
  - [Registering Your Theme](#registering-your-theme)
    - [1. `seasonals.js` — Client-Side Registration](#1-seasonalsjs--client-side-registration)
    - [2. `PluginConfiguration.cs` and `configPage.html` - Server-Side Registration](#2-pluginconfigurationcs-and-configpagehtml---server-side-registration)
  - [Testing Your Theme Locally](#testing-your-theme-locally)
    - [Steps](#steps)
    - [What to Verify](#what-to-verify)
  - [Submitting Your Contribution](#submitting-your-contribution)
    - [Pull Request Checklist](#pull-request-checklist)
    - [PR Description Template](#pr-description-template)
  - [GitHub Issue Template for Theme Ideas](#github-issue-template-for-theme-ideas)
  - [Questions?](#questions)

---

## Theme Architecture Overview

Each seasonal theme consists of **2–3 components** that live in `Jellyfin.Plugin.Seasonals/Web/`:

| Component | File(s) | Purpose |
| :--- | :--- | :--- |
| **JavaScript** | `{themeName}.js` | Animation logic, DOM manipulation, element creation |
| **CSS** | `{themeName}.css` | Container styling, element appearance, keyframe animations |
| **Images** *(optional)* | `{themeName}_images/` | Image assets (PNGs, SVGs) used by the theme |

The orchestrator file `seasonals.js` manages theme loading at runtime. It reads the plugin configuration, determines which theme should be active, and dynamically injects the correct CSS and JS files.

---

## Standard Theme File Structure

Here is a complete file layout for a theme called `mytheme`:

```
Jellyfin.Plugin.Seasonals/
└── Web/
    ├── mytheme.js              # Animation/DOM logic
    ├── mytheme.css             # Styles & animations
    ├── mytheme_images/         # (Optional) image assets
    │   ├── sprite1.png
    │   └── sprite2.png
    └── seasonals.js            # (Existing) Add your theme to ThemeConfigs
```

---

## JavaScript File Pattern

Every theme JS file follows a **consistent skeleton**. Use this as your starting template:

```javascript
// 1. Read Configuration
const config = window.SeasonalsPluginConfig?.MyTheme || {};

const enabled = config.EnableMyTheme !== undefined ? config.EnableMyTheme : true;
const elementCount = config.ElementCount || 25;
// ... add more config options as needed

let msgPrinted = false;

// 2. Toggle Function
// Hides the effect when a video player, trailer (in full width mode), dashboard, or user menu is active.
function toggleMyTheme() {
  const container = document.querySelector('.mytheme-container');
  if (!container) return;

  const videoPlayer = document.querySelector('.videoPlayerContainer');
  const trailerPlayer = document.querySelector('.youtubePlayerContainer');
  const isDashboard = document.body.classList.contains('dashboardDocument');
  const hasUserMenu = document.querySelector('#app-user-menu');

  if (videoPlayer || trailerPlayer || isDashboard || hasUserMenu) {
    container.style.display = 'none';
    if (!msgPrinted) {
      console.log('MyTheme hidden');
      msgPrinted = true;
    }
  } else {
    container.style.display = 'block';
    if (msgPrinted) {
      console.log('MyTheme visible');
      msgPrinted = false;
    }
  }
}

// 3. MutationObserver
// Watches the DOM for changes so the effect can auto-hide/show.
const observer = new MutationObserver(toggleMyTheme);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true
});

// 4. Element Creation
// Create and append your animated elements to the container.
function createElements() {
  const container = document.querySelector('.mytheme-container') || document.createElement('div');

  if (!document.querySelector('.mytheme-container')) {
    container.className = 'mytheme-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  for (let i = 0; i < elementCount; i++) {
    const el = document.createElement('div');
    el.className = 'mytheme-element';

    // Set random position, delay, duration, etc.
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDelay = `${Math.random() * 10}s, ${Math.random() * 4}s`;

    // If using images:
    // const img = document.createElement('img');
    // img.src = '../Seasonals/Resources/mytheme_images/sprite1.png';
    // el.appendChild(img);

    // If using text/emoji:
    // el.textContent = '⭐';

    container.appendChild(el);
  }
}

// 5. Initialization
function initializeMyTheme() {
  if (!enabled) return;
  createElements();
  toggleMyTheme();
}

initializeMyTheme();
```

### Key Rules

- **Always** read config from `window.SeasonalsPluginConfig?.{ThemeName}`.
- **Always** implement the toggle function with the same selectors (`.videoPlayerContainer`, `.youtubePlayerContainer`, `.dashboardDocument`, `#app-user-menu`, just use the above template).
- **Always** use `aria-hidden="true"` on the container for accessibility.
- Call your `initialize` function at the end of the file.
- For **canvas-based** themes (like `snowfall.js`), use a `<canvas>` element with `requestAnimationFrame` instead of CSS animations. Make sure to clean up with `cancelAnimationFrame` when hidden.

---

## CSS File Pattern

Every theme CSS file follows this structure:

```css
/* Container */
/* Full-screen overlay, transparent, non-interactive */
.mytheme-container {
    display: block;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;  /* IMPORTANT: don't block user interaction */
    z-index: 10;
}

/* Animated Element */
.mytheme-element {
    position: fixed;
    z-index: 15;
    user-select: none;
    cursor: default;

    /* Two animations: movement + secondary effect (shake, rotate, etc.) */
    animation-name: mytheme-fall, mytheme-shake;
    animation-duration: 10s, 3s;
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite, infinite;
}

/* Keyframes */
@keyframes mytheme-fall {
    0%   { top: -10%; }
    100% { top: 100%; }
}

@keyframes mytheme-shake {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(80px); }
}

/* Staggered Delays for Base Elements */
/* Spread the initial 12 elements across the screen */
.mytheme-element:nth-of-type(1)  { left: 10%;  animation-delay: 1s, 1s; }
.mytheme-element:nth-of-type(2)  { left: 20%;  animation-delay: 6s, 0.5s; }
.mytheme-element:nth-of-type(3)  { left: 30%;  animation-delay: 4s, 2s; }
/* ... continue for each base element */
```

### Key Rules

- **Container** must be `position: fixed`, full-screen, with `pointer-events: none` and at least `z-index: 10`.
- **Elements** should use `position: fixed` with at least `z-index: 15`.
- Use **animations** (eg. primary movement + secondary effect for natural-looking motion).
- Include **`nth-of-type` rules** for the initial set of base elements to stagger them.
- Include **webkit prefixes** (`-webkit-animation-*`, `@-webkit-keyframes`) for broader compatibility (see existing themes for examples).

---

## Image Assets (Optional)

If your theme uses images (e.g., leaves, ghosts, eggs):

1. Create a folder: `Jellyfin.Plugin.Seasonals/Web/{themeName}_images/`
2. Place your assets inside (PNG recommended, keep files small)
3. Reference them in JS using the production path:
   ```javascript
   img.src = '../Seasonals/Resources/mytheme_images/sprite1.png';
   ```
---

## Registering Your Theme

After creating your JS and CSS files, you need to register the theme in two places:

### 1. `seasonals.js` — Client-Side Registration

Add your theme to the `ThemeConfigs` object:

```javascript
const ThemeConfigs = {
    // ... existing themes ...
    mytheme: {
        css: '../Seasonals/Resources/mytheme.css',
        js: '../Seasonals/Resources/mytheme.js',
        containerClass: 'mytheme-container'
    },
    // ...
};
```

### 2. `PluginConfiguration.cs` and `configPage.html` - Server-Side Registration

> [!NOTE]
> The backend registration is handled by the plugin maintainers. You do **not** need to modify C# files for your theme submission. Just focus on the JS/CSS/images.
>
> However, if you'd like to include full backend integration, add your theme to the enum/configuration in `Configuration/PluginConfiguration.cs` and the selectors in `configPage.html`.

---

## Testing Your Theme Locally

You can test your theme without a Jellyfin server by using the included test site.

### Steps

1. Navigate to the `Jellyfin.Plugin.Seasonals/Web/` directory
2. Open [`test-site.html`](./Jellyfin.Plugin.Seasonals/Web/test-site.html) in your browser (just double-click the file) or vscode or what ever you use...
3. Use the **theme selector dropdown** to pick an existing theme or select **"Custom (Local Files)"** to test your own
4. When "Custom" is selected, enter your theme's JS and CSS filenames (e.g., `mytheme.js` and `mytheme.css` (must be in the same folder as [`test-site.html`](./Jellyfin.Plugin.Seasonals/Web/test-site.html) for this to work))
5. Click **"Load Theme"** to apply. Click **"Clear & Reload"** to reset and try again

### What to Verify

- ✅ The effect is visible on the background
- ✅ The animation runs smoothly
- ✅ Elements are spread across the full viewport
- ✅ The mock header is **not blocked** by the effect (thanks to `pointer-events: none`)
- ✅ No theme related console errors appear (check DevTools → Console)

---

## Submitting Your Contribution

### Pull Request Checklist

- [ ] Created `{themeName}.js` following the [JS pattern](#javascript-file-pattern)
- [ ] Created `{themeName}.css` following the [CSS pattern](#css-file-pattern)
- [ ] (If applicable) Created `{themeName}_images/` with optimized assets
- [ ] Added theme to `ThemeConfigs` in `seasonals.js`
- [ ] Tested locally with [`test-site.html`](./Jellyfin.Plugin.Seasonals/Web/test-site.html)
- [ ] No theme related console errors
- [ ] Effect has `pointer-events: none` (doesn't block the UI)
- [ ] Effect hides during video/trailer playback (toggle function implemented)
- [ ] (Optional) Included a screenshot or short recording of the effect to the readme

### PR Description Template

```
## New Seasonal Theme: {Theme Name}

**Description:** Brief description of the theme and what occasion/season it's for.

**Screenshot / Recording:**
[Attach a screenshot or GIF showcasing the theme in action]

**Testing:**
- Tested locally with test-site-new.html ✅
- No console errors ✅
- pointer-events: none verified ✅
```

---

## GitHub Issue Template for Theme Ideas

If you have an idea for a seasonal theme but don't want to implement it yourself, feel free to open an issue using the following template:

**Title:** `[Theme Idea] {Season/Holiday Name} Theme`

**Body:**
```
## 🎨 Theme Idea: {Season/Holiday Name}

**Occasion/Season:** What time of year is this for?

**Description:** Describe the visual effect you have in mind.

**Visual References:** Links to images, GIFs, or videos that capture the aesthetic.

**Suggested Active Period:** e.g. "March 1 – March 17" for St. Patrick's Day
```

---

## Questions?

If you have any questions about contributing, feel free to open an issue. Happy theming! 🎉

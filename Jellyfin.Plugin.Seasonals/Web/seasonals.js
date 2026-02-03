// theme-configs.js

// theme configurations
const themeConfigs = {
    snowflakes: {
        css: '/Seasonals/Resources/snowflakes.css',
        js: '/Seasonals/Resources/snowflakes.js',
        containerClass: 'snowflakes'
    },
    snowfall: {
        css: '/Seasonals/Resources/snowfall.css',
        js: '/Seasonals/Resources/snowfall.js',
        containerClass: 'snowfall-container'
    },
    snowstorm: {
        css: '/Seasonals/Resources/snowstorm.css',
        js: '/Seasonals/Resources/snowstorm.js',
        containerClass: 'snowstorm-container'
    },
    fireworks: {
        css: '/Seasonals/Resources/fireworks.css',
        js: '/Seasonals/Resources/fireworks.js',
        containerClass: 'fireworks'
    },
    halloween: {
        css: '/Seasonals/Resources/halloween.css',
        js: '/Seasonals/Resources/halloween.js',
        containerClass: 'halloween-container'
    },
    hearts: {
        css: '/Seasonals/Resources/hearts.css',
        js: '/Seasonals/Resources/hearts.js',
        containerClass: 'hearts-container'
    },
    christmas: {
        css: '/Seasonals/Resources/christmas.css',
        js: '/Seasonals/Resources/christmas.js',
        containerClass: 'christmas-container'
    },
    santa: {
        css: '/Seasonals/Resources/santa.css',
        js: '/Seasonals/Resources/santa.js',
        containerClass: 'santa-container'
    },
    autumn: {
        css: '/Seasonals/Resources/autumn.css',
        js: '/Seasonals/Resources/autumn.js',
        containerClass: 'autumn-container'
    },
    easter: {
        css: '/Seasonals/Resources/easter.css',
        js: '/Seasonals/Resources/easter.js',
        containerClass: 'easter-container'
    },
    summer: {
        css: '/Seasonals/Resources/summer.css',
        js: '/Seasonals/Resources/summer.js',
        containerClass: 'summer-container'
    },
    spring: {
        css: '/Seasonals/Resources/spring.css',
        js: '/Seasonals/Resources/spring.js',
        containerClass: 'spring-container'
    },
    none: {
        containerClass: 'none'
    },
};

// determine current theme based on the current month
function determineCurrentTheme() {
    const date = new Date();
    const month = date.getMonth();  // 0-11
    const day = date.getDate();     // 1-31

    if ((month === 11 && day >= 28) || (month === 0 && day <= 5)) return 'fireworks'; //new year fireworks december 28 - january 5

    if (month === 1 && day >= 10 && day <= 18) return 'hearts'; // valentine's day february 10 - 18

    if (month === 11 && day >= 22 && day <= 27) return 'santa'; // christmas december 22 - 27
    // if (month === 11 && day >= 22 && day <= 27) return 'christmas'; // christmas december 22 - 27

    if (month === 11) return 'snowflakes'; // snowflakes december
    if (month === 0 || month === 1) return 'snowfall'; // snow january, february
    // if (month === 0 || month === 1) return 'snowstorm'; // snow january, february

    if ((month === 2 && day >= 25) || (month === 3 && day <= 25)) return 'easter'; // easter march 25 - april 25

    //NOT IMPLEMENTED YET
    //if (month >= 2 && month <= 4) return 'spring';  // spring march, april, may

    //NOT IMPLEMENTED YET
    //if (month >= 5 && month <= 7) return 'summer';  // summer june, july, august

    if ((month === 9 && day >= 24) || (month === 10 && day <= 5)) return 'halloween'; // halloween october 24 - november 5

    if (month >= 8 && month <= 10) return 'autumn'; // autumn september, october, november

    return 'none'; // Fallback (nothing)
}

// helper to resolve paths for local testing vs production
function resolvePath(path) {
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return path.replace('/Seasonals/Resources/', './');
    }
    return path;
}

// load theme csss
function loadThemeCSS(cssPath) {
    if (!cssPath) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    // link.href = resolvePath(cssPath);
    link.href = cssPath;

    link.onerror = () => {
        console.error(`Failed to load CSS: ${cssPath}`);
    };

    document.body.appendChild(link);
    console.log(`CSS file "${cssPath}" loaded.`);
}

// load theme js
function loadThemeJS(jsPath) {
    if (!jsPath) return;

    const script = document.createElement('script');
    script.src = jsPath;
    // script.src = resolvePath(jsPath);
    script.defer = true;

    script.onerror = () => {
        console.error(`Failed to load JS: ${jsPath}`);
    };

    document.body.appendChild(script);
    console.log(`JS file "${jsPath}" loaded.`);
}

// update theme container class name
function updateThemeContainer(containerClass) {
    // Create container if it doesn't exist
    let container = document.querySelector('.seasonals-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'seasonals-container';
        document.body.appendChild(container);
    }

    container.className = `seasonals-container ${containerClass}`;
    console.log(`Seasonals-Container class updated to "${containerClass}".`);
}

// function removeSelf() {
//     const script = document.currentScript;
//     if (script) script.parentNode.removeChild(script);
//     console.log('External script removed:', script);
// }

// initialize theme
async function initializeTheme() {

    // Check local user preference
    const isEnabled = getSavedSetting('seasonals-enabled', 'true') === 'true';
    if (!isEnabled) {
        console.log('Seasonals disabled by user preference.');
        return;
    }

    const forcedTheme = getSavedSetting('seasonals-theme', 'auto');

    let automateThemeSelection = true;
    let defaultTheme = 'none';

    try {
        const response = await fetch('/Seasonals/Config');
        if (response.ok) {
            const config = await response.json();
            automateThemeSelection = config.AutomateSeasonSelection;
            defaultTheme = config.SelectedSeason;
            window.SeasonalsPluginConfig = config;
            console.log('Seasonals Config loaded:', config);
        } else {
            console.error('Failed to fetch Seasonals config');
        }
    } catch (error) {
        console.error('Error fetching Seasonals config:', error);
    }

    let currentTheme;

    if (forcedTheme !== 'auto') {
        currentTheme = forcedTheme;
        console.log(`User forced theme: ${currentTheme}`);
    } else if (automateThemeSelection === false) {
        currentTheme = defaultTheme;
    } else {
        currentTheme = determineCurrentTheme();
    }

    console.log(`Selected theme: ${currentTheme}`);

    if (!currentTheme || currentTheme === 'none') {
        console.log('No theme selected.');
        return;
    }

    const theme = themeConfigs[currentTheme];

    if (!theme) {
        console.error(`Theme "${currentTheme}" not found.`);
        return;
    }
    updateThemeContainer(theme.containerClass);

    if (theme.css) loadThemeCSS(theme.css);
    if (theme.js) loadThemeJS(theme.js);

    console.log(`Theme "${currentTheme}" loaded.`);
}


initializeTheme();


// User UI Seasonal Settings

function getSavedSetting(key, defaultValue) {
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
}

function setSavedSetting(key, value) {
    localStorage.setItem(key, value);
}

function createSettingsIcon() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'paper-icon-button-light headerButton seasonal-settings-button';
    button.title = 'Seasonal Settings';
    // button.innerHTML = '<span class="material-icons">ac_unit</span>';
    button.innerHTML = '<img src="/Seasonals/Resources/assets/logo_SW.svg" style="width: 24px; height: 24px; vertical-align: middle;">';
    button.style.verticalAlign = 'middle';

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSettingsPopup(button);
    });

    return button;
}

function createSettingsPopup(anchorElement) {
    const existing = document.querySelector('.seasonal-settings-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.className = 'seasonal-settings-popup dialog';

    Object.assign(popup.style, {
        position: 'fixed',
        zIndex: '10000',
        backgroundColor: '#202020',
        padding: '1em',
        borderRadius: '0.3em',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        minWidth: '200px',
        color: '#fff',
        maxWidth: '250px'
    });

    const rect = anchorElement.getBoundingClientRect();

    let rightPos = window.innerWidth - rect.right;
    if (window.innerWidth < 450 || (window.innerWidth - rightPos) < 260) {
        popup.style.right = '1rem';
        popup.style.left = 'auto';
    } else {
        popup.style.right = `${rightPos}px`;
        popup.style.left = 'auto';
    }

    popup.style.top = `${rect.bottom + 10}px`;

    popup.innerHTML = `     
        <div class="checkboxContainer checkboxContainer-withDescription" style="margin-bottom: 0.5em;">
            <label class="emby-checkbox-label">
                <input id="seasonal-enable-toggle" type="checkbox" is="emby-checkbox" class="emby-checkbox" />
                <span class="checkboxLabel">Enable Seasonals</span>
            </label>
        </div>

        <div class="selectContainer" style="margin-bottom: 0.5em;">
            <label class="selectLabel" for="seasonal-theme-select" style="margin-bottom: 0.5em; display: block; color: inherit;">Force Theme</label>
            <select id="seasonal-theme-select" class="emby-select" style="width: 100%; padding: 0.5em; background-color: #333; border: 1px solid #444; color: #fff; border-radius: 4px;">
                <option value="auto">Auto (Date Based)</option>
            </select>
        </div>
    `;

    // Populate Select Options
    const themeSelect = popup.querySelector('#seasonal-theme-select');
    Object.keys(themeConfigs).forEach(key => {
        if (key === 'none') return;
        const option = document.createElement('option');
        option.value = key;
        // Capitalize first letter
        option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        themeSelect.appendChild(option);
    });

    // Set Initial Values
    const enabledCheckbox = popup.querySelector('#seasonal-enable-toggle');
    enabledCheckbox.checked = getSavedSetting('seasonals-enabled', 'true') === 'true';

    themeSelect.value = getSavedSetting('seasonals-theme', 'auto');

    enabledCheckbox.addEventListener('change', (e) => {
        setSavedSetting('seasonals-enabled', e.target.checked);
        location.reload();
    });

    themeSelect.addEventListener('change', (e) => {
        setSavedSetting('seasonals-theme', e.target.value);
        location.reload();
    });

    const closeHandler = (e) => {
        if (!popup.contains(e.target) && e.target !== anchorElement && !anchorElement.contains(e.target)) {
            popup.remove();
            document.removeEventListener('click', closeHandler);
        }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 0);

    document.body.appendChild(popup);
}

function toggleSettingsPopup(anchorElement) {
    const existing = document.querySelector('.seasonal-settings-popup');
    if (existing) {
        existing.remove();
    } else {
        createSettingsPopup(anchorElement);
    }
}

function injectSettingsIcon() {
    const observer = new MutationObserver((mutations, obs) => {
        // Check if admin has enabled this feature
        if (window.SeasonalsPluginConfig && window.SeasonalsPluginConfig.EnableClientSideToggle === false) {
            return;
        }

        const headerRight = document.querySelector('.headerRight');
        if (headerRight && !document.querySelector('.seasonal-settings-button')) {
            const icon = createSettingsIcon();
            headerRight.prepend(icon);
            // obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

injectSettingsIcon();

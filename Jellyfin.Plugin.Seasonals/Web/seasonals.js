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

// load theme csss
function loadThemeCSS(cssPath) {
    if (!cssPath) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
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

function removeSelf() {
    const script = document.currentScript;
    if (script) script.parentNode.removeChild(script);
    console.log('External script removed:', script);
}

// initialize theme
async function initializeTheme() {
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
    if (automateThemeSelection === false) {
        currentTheme = defaultTheme;
    } else {
        currentTheme = determineCurrentTheme();
    }

    console.log(`Selected theme: ${currentTheme}`);

    if (!currentTheme || currentTheme === 'none') {
        console.log('No theme selected.');
        removeSelf();
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

    removeSelf();
}


initializeTheme();

// theme-configs.js

const automateThemeSelection = true;    // Set to false to disable automatic theme selection based on current date
const defaultTheme = 'none';       // The theme to use if automatic theme selection is disabled

// theme configurations
const themeConfigs = {
    snowflakes: {
        css: 'seasonals/snowflakes.css',
        js: 'seasonals/snowflakes.js',
        containerClass: 'snowflakes'
    },
    snowfall: {
        css: 'seasonals/snowfall.css',
        js: 'seasonals/snowfall.js',
        containerClass: 'snowfall'
    },
    snowstorm: {
        css: 'seasonals/snowstorm.css',
        js: 'seasonals/snowstorm.js',
        containerClass: 'snowstorm'
    },
    fireworks: {
        css: 'seasonals/fireworks.css',
        js: 'seasonals/fireworks.js',
        containerClass: 'fireworks'
    },
    halloween: {
        css: 'seasonals/halloween.css',
        js: 'seasonals/halloween.js',
        containerClass: 'halloween-container'
    },
    hearts: {
        css: 'seasonals/hearts.css',
        js: 'seasonals/hearts.js',
        containerClass: 'hearts-container'
    },
    christmas: {
        css: 'seasonals/christmas.css',
        js: 'seasonals/christmas.js',
        containerClass: 'christmas-container'
    },
    autumn: {
        css: 'seasonals/autumn.css',
        js: 'seasonals/autumn.js',
        containerClass: 'autumn-container'
    },
    eastern: {
        css: 'seasonals/eastern.css',
        js: 'seasonals/eastern.js',
        containerClass: 'eastern'
    },
    summer: {
        css: 'seasonals/summer.css',
        js: 'seasonals/summer.js',
        containerClass: 'summer'
    },
    spring: {
        css: 'seasonals/spring.css',
        js: 'seasonals/spring.js',
        containerClass: 'spring'
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

    if ((month === 11 && day >= 28) || (month === 0 && day === 5)) return 'fireworks'; //new year fireworks december 28 - january 5
    
    if (month === 1 && (day >= 10 || day <= 18)) return 'hearts'; // valentine's day february 10 - 18

    if ((month === 11 && day >= 23) || ( month === 11 && day <= 27)) return 'christmas'; // christmas december 6 - january 6

    if (month === 11) return 'snowflakes'; // snow december, january, february
    if (month === 0 || month === 1) return 'snowfall'; // snow december, january, february
    // if (month === 0 || month === 1) return 'snowstorm'; // snow december, january, february
    
    if ((month === 2 && day >= 25) || (month === 3 && day <= 25)) return 'eastern'; // eastern march 25 - april 25
    
    if (month >= 2 && month <= 4) return 'spring';  // spring march, april, may

    if (month >= 5 && month <= 7) return 'summer';  // summer june, july, august

    //if (month === 9 && day === 31) return 'halloween'; // halloween
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

    script.onerror = () => {
        console.error(`Failed to load JS: ${jsPath}`);
    };

    document.body.appendChild(script);
    console.log(`JS file "${jsPath}" loaded.`);
}

// update theme container class name
function updateThemeContainer(containerClass) {
    const container = document.querySelector('.seasonals-container');
    if (!container) {
        console.error('No element with the class "seasonals-container" found.');
        return;
    }
    container.className = containerClass;
    console.log(`Seasonals-Container class updated to "${containerClass}".`);
}

function removeSelf() {
    const script = document.currentScript;
    if (script) script.parentNode.removeChild(script);
    console.log('External script removed:', script.src);
}

// initialize theme
function initializeTheme() {
    let currentTheme;
    if (!automateThemeSelection) {
        currentTheme = defaultTheme;
    } else {
        currentTheme = determineCurrentTheme();
    }

    console.log(`Selected theme: ${currentTheme}`);

    if (currentTheme === 'none') {
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


//document.addEventListener('DOMContentLoaded', initializeTheme);
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
});
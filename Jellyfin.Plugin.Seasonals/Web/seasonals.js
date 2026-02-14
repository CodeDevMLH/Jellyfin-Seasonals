/*
 * Seasonals Plugin (Client Side Manager Logic)
 */

const ThemeConfigs = {
    snowflakes: {
        css: '../Seasonals/Resources/snowflakes.css',
        js: '../Seasonals/Resources/snowflakes.js',
        containerClass: 'snowflakes'
    },
    snowfall: {
        css: '../Seasonals/Resources/snowfall.css',
        js: '../Seasonals/Resources/snowfall.js',
        containerClass: 'snowfall-container'
    },
    snowstorm: {
        css: '../Seasonals/Resources/snowstorm.css',
        js: '../Seasonals/Resources/snowstorm.js',
        containerClass: 'snowstorm-container'
    },
    fireworks: {
        css: '../Seasonals/Resources/fireworks.css',
        js: '../Seasonals/Resources/fireworks.js',
        containerClass: 'fireworks'
    },
    halloween: {
        css: '../Seasonals/Resources/halloween.css',
        js: '../Seasonals/Resources/halloween.js',
        containerClass: 'halloween-container'
    },
    hearts: {
        css: '../Seasonals/Resources/hearts.css',
        js: '../Seasonals/Resources/hearts.js',
        containerClass: 'hearts-container'
    },
    christmas: {
        css: '../Seasonals/Resources/christmas.css',
        js: '../Seasonals/Resources/christmas.js',
        containerClass: 'christmas-container'
    },
    santa: {
        css: '../Seasonals/Resources/santa.css',
        js: '../Seasonals/Resources/santa.js',
        containerClass: 'santa-container'
    },
    autumn: {
        css: '../Seasonals/Resources/autumn.css',
        js: '../Seasonals/Resources/autumn.js',
        containerClass: 'autumn-container'
    },
    easter: {
        css: '../Seasonals/Resources/easter.css',
        js: '../Seasonals/Resources/easter.js',
        containerClass: 'easter-container'
    },
    summer: {
        css: '../Seasonals/Resources/summer.css',
        js: '../Seasonals/Resources/summer.js',
        containerClass: 'summer-container'
    },
    spring: {
        css: '../Seasonals/Resources/spring.css',
        js: '../Seasonals/Resources/spring.js',
        containerClass: 'spring-container'
    },
    none: {
        containerClass: 'none'
    },
};

const SeasonalSettingsManager = {
    initialized: false,
    config: null,

    init(config) {
        if (this.initialized) return;
        this.config = config;

        // Only inject settings if enabled on server by admin
        if (this.config && this.config.EnableClientSideToggle !== false) {
            this.injectSettingsIcon();
            this.initialized = true;
            console.log("Seasonals: Client-Side Settings Manager initialized.");
        }
    },

    getSetting(key, defaultValue) {
        const value = localStorage.getItem(`seasonals-${key}`);
        return value !== null ? value : defaultValue;
    },

    setSetting(key, value) {
        localStorage.setItem(`seasonals-${key}`, value);
    },

    createIcon() {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'paper-icon-button-light headerButton seasonal-settings-button';
        button.title = 'Seasonal Settings';
        // button.innerHTML = '<span class="material-icons">ac_unit</span>';
        button.innerHTML = '<img src="../Seasonals/Resources/assets/logo_SW.svg" draggable="false" style="width: 24px; height: 24px; vertical-align: middle; pointer-events: none;">';
        button.style.verticalAlign = 'middle';

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSettingsPopup(button);
        });

        return button;
    },

    injectSettingsIcon() {
        const observer = new MutationObserver((mutations, obs) => {
            const headerRight = document.querySelector('.headerRight');
            if (headerRight && !document.querySelector('.seasonal-settings-button')) {
                const icon = this.createIcon();
                headerRight.prepend(icon);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    createPopup(anchorElement) {
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
        
        // Positioning logic
        let rightPos = window.innerWidth - rect.right;
        if (window.innerWidth < 450 || (window.innerWidth - rightPos) < 260) {
            popup.style.right = '1rem';
            popup.style.left = 'auto';
        } else {
            popup.style.right = `${rightPos}px`;
            popup.style.left = 'auto';
        }
        popup.style.top = `${rect.bottom + 10}px`;

        // Popup HTML
        let html = `
        <h3 style="margin-top:0; margin-bottom:1em; border-bottom:1px solid #444; padding-bottom:0.5em;">Seasonal Settings</h3>
        
        <div class="checkboxContainer checkboxContainer-withDescription" style="margin-bottom: 0.5em;">
            <label class="emby-checkbox-label">
                <input id="seasonal-enable-toggle" type="checkbox" is="emby-checkbox" class="emby-checkbox" />
                <span class="checkboxLabel">Enable Seasonals</span>
            </label>
        </div>

        <div class="selectContainer" style="margin-bottom: 0.5em;">
            <label class="selectLabel" for="seasonal-theme-select" style="margin-bottom: 0.5em; display: block; color: inherit;">Force Theme</label>
            <select id="seasonal-theme-select" class="emby-select" style="width: 100%; padding: 0.5em; background-color: #333; border: 1px solid #444; color: #fff; border-radius: 4px;">
                <option value="auto">Server-Side</option>
            </select>
        </div>
        `;

        popup.innerHTML = html;

        // Populate Select Options
        const themeSelect = popup.querySelector('#seasonal-theme-select');
        Object.keys(ThemeConfigs).forEach(key => {
            if (key === 'none') return;
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            themeSelect.appendChild(option);
        });

        // Set Initial Values
        const enabledCheckbox = popup.querySelector('#seasonal-enable-toggle');
        enabledCheckbox.checked = this.getSetting('enabled', 'true') === 'true';
        themeSelect.value = this.getSetting('theme', 'auto');

        // Event Listeners
        enabledCheckbox.addEventListener('change', (e) => {
            this.setSetting('enabled', e.target.checked);
            location.reload();
        });

        themeSelect.addEventListener('change', (e) => {
            this.setSetting('theme', e.target.value);
            location.reload();
        });

        // Close on outside click
        const closeHandler = (e) => {
            if (!popup.contains(e.target) && e.target !== anchorElement && !anchorElement.contains(e.target)) {
                popup.remove();
                document.removeEventListener('click', closeHandler);
            }
        };
        setTimeout(() => document.addEventListener('click', closeHandler), 0);

        document.body.appendChild(popup);
    },

    toggleSettingsPopup(anchorElement) {
        const existing = document.querySelector('.seasonal-settings-popup');
        if (existing) {
            existing.remove();
        } else {
            this.createPopup(anchorElement);
        }
    }
};

const SeasonalsManager = {
    config: null,

    async init() {
        // Fetch Config
        try {
            const response = await fetch('../Seasonals/Config');
            if (response.ok) {
                this.config = await response.json();
                window.SeasonalsPluginConfig = this.config;
                console.log('Seasonals: Seasonals Config loaded:', this.config);
            }
        } catch (error) {
            console.error('Seasonals: Error fetching Seasonals config:', error);
        }

        // Initialize Settings UI
        SeasonalSettingsManager.init(this.config);

        // User Preference Check
        const isEnabled = SeasonalSettingsManager.getSetting('enabled', 'true') === 'true';
        if (!isEnabled) {
            console.log('Seasonals: Disabled by user preference.');
            return;
        }

        // Determine Theme
        const themeName = this.selectTheme();
        console.log(`Seasonals: Selected theme: ${themeName}`);

        if (!themeName || themeName === 'none') {
            return;
        }

        // Apply Theme
        this.applyTheme(themeName);
    },

    selectTheme() {
        // Check local override
        const forcedTheme = SeasonalSettingsManager.getSetting('theme', 'auto');
        if (forcedTheme !== 'auto') {
            console.log(`Seasonals: User forced theme: ${forcedTheme}`);
            return forcedTheme;
        }

        const automate = this.config ? this.config.AutomateSeasonSelection : true;
        const defaultTheme = this.config ? this.config.SelectedSeason : 'none';

        if (!automate) {
            return defaultTheme;
        }

        return this.determineCurrentThemeDate();
    },

    determineCurrentThemeDate() {
        const date = new Date();
        const month = date.getMonth();  // 0-11
        const day = date.getDate();     // 1-31
    
        if ((month === 11 && day >= 28) || (month === 0 && day <= 5)) return 'fireworks'; //new year fireworks december 28 - january 5
    
        if (month === 1 && day >= 10 && day <= 18) return 'hearts'; // valentine's day february 10 - 18
    
        if (month === 11 && day >= 22 && day <= 27) return 'santa'; // santa december 22 - 27
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
    
        return 'none'; // Fallback (no theme)
    },

    applyTheme(themeName) {
        const theme = ThemeConfigs[themeName];
        if (!theme) {
            console.error(`Seasonals: Theme "${themeName}" not found.`);
            return;
        }

        this.updateThemeContainer(theme.containerClass);

        if (theme.css) this.loadResource('css', theme.css);
        if (theme.js) this.loadResource('js', theme.js);
        
        console.log(`Seasonals: Theme "${themeName}" applied.`);
    },

    updateThemeContainer(containerClass) {
        let container = document.querySelector('.seasonals-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'seasonals-container';
            document.body.appendChild(container);
        }
        container.className = `seasonals-container ${containerClass}`;
    },

    // helper to resolve paths for local testing vs production
    resolvePath(path) {
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return path.replace('../Seasonals/Resources/', './');
        }
        return path;
    },

    loadResource(type, path) {
        if (!path) return;
        
        if (type === 'css') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            // link.href = resolvePath(cssPath);
            link.onerror = () => console.error(`Seasonals: Failed to load CSS: ${path}`);
            document.body.appendChild(link);
        } else if (type === 'js') {
            const script = document.createElement('script');
            script.src = path;
            // script.src = resolvePath(jsPath);
            script.defer = true;
            script.onerror = () => console.error(`Seasonals: Failed to load JS: ${path}`);
            document.body.appendChild(script);
        }
    }
};

SeasonalsManager.init();

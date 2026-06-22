/*
* Seasonals Plugin (Client Side Manager Logic)
*/

(function () {
    if (window.seasonalsLoaded) {
        console.warn("🎬 Seasonals already loaded, skipping duplicate execution.");
        return;
    }
    window.seasonalsLoaded = true;

    const ThemeConfigs = {
        autumn: {
            css: '../Seasonals/Resources/autumn.css',
            js: '../Seasonals/Resources/autumn.js',
            containerClass: 'autumn-container'
        },
        birthday: {
            css: '../Seasonals/Resources/birthday.css',
            js: '../Seasonals/Resources/birthday.js',
            containerClass: 'birthday-container'
        },
        carnival: {
            css: '../Seasonals/Resources/carnival.css',
            js: '../Seasonals/Resources/carnival.js',
            containerClass: 'carnival-container'
        },
        cherryblossom: {
            css: '../Seasonals/Resources/cherryblossom.css',
            js: '../Seasonals/Resources/cherryblossom.js',
            containerClass: 'cherryblossom-container'
        },
        christmas: {
            css: '../Seasonals/Resources/christmas.css',
            js: '../Seasonals/Resources/christmas.js',
            containerClass: 'christmas-container'
        },
        earthday: {
            css: '../Seasonals/Resources/earthday.css',
            js: '../Seasonals/Resources/earthday.js',
            containerClass: 'earthday-container'
        },
        easter: {
            css: '../Seasonals/Resources/easter.css',
            js: '../Seasonals/Resources/easter.js',
            containerClass: 'easter-container'
        },
        eid: {
            css: '../Seasonals/Resources/eid.css',
            js: '../Seasonals/Resources/eid.js',
            containerClass: 'eid-container'
        },
        eurovision: {
            css: '../Seasonals/Resources/eurovision.css',
            js: '../Seasonals/Resources/eurovision.js',
            containerClass: 'eurovision-container'
        },
        filmnoir: {
            css: '../Seasonals/Resources/filmnoir.css',
            js: '../Seasonals/Resources/filmnoir.js',
            containerClass: 'filmnoir-container'
        },
        fireworks: {
            css: '../Seasonals/Resources/fireworks.css',
            js: '../Seasonals/Resources/fireworks.js',
            containerClass: 'fireworks'
        },
        frost: {
            css: '../Seasonals/Resources/frost.css',
            js: '../Seasonals/Resources/frost.js',
            containerClass: 'frost-container'
        },
        friday13: {
            css: '../Seasonals/Resources/friday13.css',
            js: '../Seasonals/Resources/friday13.js',
            containerClass: 'friday13-container'
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
        marioday: {
            css: '../Seasonals/Resources/marioday.css',
            js: '../Seasonals/Resources/marioday.js',
            containerClass: 'marioday-container'
        },
        matrix: {
            css: '../Seasonals/Resources/matrix.css',
            js: '../Seasonals/Resources/matrix.js',
            containerClass: 'matrix-container'
        },
        nightsky: {
            css: '../Seasonals/Resources/nightsky.css',
            js: '../Seasonals/Resources/nightsky.js',
            containerClass: 'nightsky-container'
        },
        oktoberfest: {
            css: '../Seasonals/Resources/oktoberfest.css',
            js: '../Seasonals/Resources/oktoberfest.js',
            containerClass: 'oktoberfest-container'
        },
        olympia: {
            css: '../Seasonals/Resources/olympia.css',
            js: '../Seasonals/Resources/olympia.js',
            containerClass: 'olympia-container'
        },
        oscar: {
            css: '../Seasonals/Resources/oscar.css',
            js: '../Seasonals/Resources/oscar.js',
            containerClass: 'oscar-container'
        },
        pride: {
            css: '../Seasonals/Resources/pride.css',
            js: '../Seasonals/Resources/pride.js',
            containerClass: 'pride-container'
        },
        rain: {
            css: '../Seasonals/Resources/rain.css',
            js: '../Seasonals/Resources/rain.js',
            containerClass: 'rain-container'
        },
        resurrection: {
            css: '../Seasonals/Resources/resurrection.css',
            js: '../Seasonals/Resources/resurrection.js',
            containerClass: 'resurrection-container'
        },
        santa: {
            css: '../Seasonals/Resources/santa.css',
            js: '../Seasonals/Resources/santa.js',
            containerClass: 'santa-container'
        },
        snowfall: {
            css: '../Seasonals/Resources/snowfall.css',
            js: '../Seasonals/Resources/snowfall.js',
            containerClass: 'snowfall-container'
        },
        snowflakes: {
            css: '../Seasonals/Resources/snowflakes.css',
            js: '../Seasonals/Resources/snowflakes.js',
            containerClass: 'snowflakes'
        },
        snowstorm: {
            css: '../Seasonals/Resources/snowstorm.css',
            js: '../Seasonals/Resources/snowstorm.js',
            containerClass: 'snowstorm-container'
        },
        space: {
            css: '../Seasonals/Resources/space.css',
            js: '../Seasonals/Resources/space.js',
            containerClass: 'space-container'
        },
        spooky: {
            css: '../Seasonals/Resources/spooky.css',
            js: '../Seasonals/Resources/spooky.js',
            containerClass: 'spooky-container'
        },
        sports: {
            css: '../Seasonals/Resources/sports.css',
            js: '../Seasonals/Resources/sports.js',
            containerClass: 'sports-container'
        },
        spring: {
            css: '../Seasonals/Resources/spring.css',
            js: '../Seasonals/Resources/spring.js',
            containerClass: 'spring-container'
        },
        starwars: {
            css: '../Seasonals/Resources/starwars.css',
            js: '../Seasonals/Resources/starwars.js',
            containerClass: 'starwars-container'
        },
        storm: {
            css: '../Seasonals/Resources/storm.css',
            js: '../Seasonals/Resources/storm.js',
            containerClass: 'storm-container'
        },
        summer: {
            css: '../Seasonals/Resources/summer.css',
            js: '../Seasonals/Resources/summer.js',
            containerClass: 'summer-container'
        },
        underwater: {
            css: '../Seasonals/Resources/underwater.css',
            js: '../Seasonals/Resources/underwater.js',
            containerClass: 'underwater-container'
        },
        none: {
            containerClass: 'none'
        },
    };

    const CLIENT_MENU_TRANSLATIONS = {
        'en': {
            title: 'Seasonal Settings',
            groupGeneral: 'General',
            groupThemes: 'Force Theme',
            enabledLabel: 'Enable Seasonals',
            enabledDesc: 'Toggle the entire seasonal visual effects.',
            clientMenuLocationLabel: 'Menu Location',
            clientMenuLocationDesc: 'Choose where the settings button is displayed.',
            themeSelectLabel: 'Force Theme',
            themeSelectDesc: 'Select a theme to preview or force it permanently.',
            saveBtn: 'Save & Reload',
            resetBtn: 'Load Server Defaults',
            resetTitle: 'Reset to Server Defaults',
            confirmReset: 'Reset all local seasonal settings to server defaults?'
        },
        'de': {
            title: 'Saisonale Einstellungen',
            groupGeneral: 'Allgemein',
            groupThemes: 'Thema erzwingen',
            enabledLabel: 'Effekte aktivieren',
            enabledDesc: 'Schaltet alle saisonalen visuellen Effekte ein/aus.',
            clientMenuLocationLabel: 'Position des Einstellungs-Symbols',
            clientMenuLocationDesc: 'Wähle aus, wo das Einstellungs-Symbol angezeigt wird.',
            themeSelectLabel: 'Thema erzwingen',
            themeSelectDesc: 'Wähle ein Thema aus, um es dauerhaft zu erzwingen oder als Vorschau anzuzeigen.',
            saveBtn: 'Speichern & Neu laden',
            resetBtn: 'Server-Standardwerte laden',
            resetTitle: 'Auf Server-Standardwerte zurücksetzen',
            confirmReset: 'Alle lokalen saisonalen Einstellungen auf Server-Standardwerte zurücksetzen?'
        },
        'es': {
            title: 'Ajustes de Seasonals',
            groupGeneral: 'General',
            groupThemes: 'Forzar Tema',
            enabledLabel: 'Habilitar Seasonals',
            enabledDesc: 'Activa o desactiva los efectos visuales estacionales.',
            clientMenuLocationLabel: 'Ubicación de ajustes',
            clientMenuLocationDesc: 'Elige dónde se muestra el botón de ajustes.',
            themeSelectLabel: 'Forzar Tema',
            themeSelectDesc: 'Selecciona un tema para previsualizarlo o forzarlo permanentemente.',
            saveBtn: 'Guardar y recargar',
            resetBtn: 'Cargar valores del servidor',
            resetTitle: 'Restablecer a valores del servidor',
            confirmReset: '¿Restablecer todos los ajustes locales de Seasonals a los valores predeterminados del servidor?'
        },
        'fr': {
            title: 'Paramètres de Seasonals',
            groupGeneral: 'Général',
            groupThemes: 'Forcer le Thème',
            enabledLabel: 'Activer Seasonals',
            enabledDesc: 'Activer ou désactiver les effets visuels saisonniers.',
            clientMenuLocationLabel: 'Emplacement des paramètres',
            clientMenuLocationDesc: 'Choisissez où afficher le bouton des paramètres.',
            themeSelectLabel: 'Forcer le Thème',
            themeSelectDesc: 'Sélectionnez un thème pour le prévisualiser ou le forcer de manière permanente.',
            saveBtn: 'Enregistrer et recharger',
            resetBtn: 'Charger les valeurs par défaut',
            resetTitle: 'Réinitialiser aux valeurs du serveur',
            confirmReset: 'Réinitialiser tous les paramètres locaux de Seasonals aux valeurs par défaut du serveur ?'
        },
        'it': {
            title: 'Impostazioni Seasonals',
            groupGeneral: 'Generale',
            groupThemes: 'Forza Tema',
            enabledLabel: 'Abilita Seasonals',
            enabledDesc: 'Attiva o disattiva gli effetti visivi stagionali.',
            clientMenuLocationLabel: 'Posizione impostazioni',
            clientMenuLocationDesc: 'Scegli dove mostrare il pulsante delle impostazioni.',
            themeSelectLabel: 'Forza Tema',
            themeSelectDesc: 'Seleziona un tema per l\'anteprima o forzalo permanentemente.',
            saveBtn: 'Salva e ricarica',
            resetBtn: 'Carica valori del server',
            resetTitle: 'Ripristina valori del server',
            confirmReset: 'Ripristinare tutte le impostazioni locali di Seasonals ai valori predefiniti del server?'
        }
    };

    function getCurrentLocale() {
        let locale = null;
        try {
            if (window.ApiClient && typeof window.ApiClient.deviceId === 'function') {
                const deviceId = window.ApiClient.deviceId();
                if (deviceId) {
                    const deviceKey = `${deviceId}-language`;
                    const val = localStorage.getItem(deviceKey);
                    if (val) locale = val.toLowerCase();
                }
            }
            if (!locale) {
                const val = localStorage.getItem("language");
                if (val) locale = val.toLowerCase();
            }
        } catch (e) {
            console.warn("Seasonals: Could not access localStorage for language:", e);
        }
        if (!locale) {
            const langAttr = document.documentElement.getAttribute("lang");
            if (langAttr) {
                locale = langAttr.toLowerCase();
            }
        }
        if (!locale) {
            const navLang = navigator.language || navigator.userLanguage;
            locale = navLang ? navLang.toLowerCase() : "en";
        }
        return locale.split('-')[0].toLowerCase();
    }

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
            if (value === null) return defaultValue;
            return value;
        },

        setSetting(key, value) {
            localStorage.setItem(`seasonals-${key}`, value);
        },

        createIcon() {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'paper-icon-button-light headerButton seasonal-settings-button';
            button.title = 'Seasonal Settings';
            button.innerHTML = '<img src="../Seasonals/Resources/assets/logo_SW.svg" draggable="false" style="width: 24px; height: 24px; vertical-align: middle; pointer-events: none;">';
            button.style.verticalAlign = 'middle';

            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSettingsPopup(button);
            });

            return button;
        },

        injectSettingsIcon() {
            const menuLocation = this.getSetting('menuLocation', this.config.ClientMenuLocation || this.config.clientMenuLocation || "Navbar");
            let navbarInjected = false;
            let debounceTimer = null;

            const tryInject = () => {
                // 1. Inject to Navbar if "Navbar" or "Both" (skip once injected)
                if (!navbarInjected && (menuLocation === 'Navbar' || menuLocation === 'Both')) {
                    const headerRight = document.querySelector('.headerRight');
                    if (headerRight && !headerRight.querySelector('.seasonal-settings-button')) {
                        const icon = this.createIcon();
                        headerRight.prepend(icon);
                        navbarInjected = true;
                    }
                }

                // 2. Inject to Sidebar if "Sidebar" or "Both"
                if (menuLocation === 'Sidebar' || menuLocation === 'Both') {
                    const containers = document.querySelectorAll('.sidebarLinks, .mainDrawer-scrollContainer');
                    containers.forEach(container => {
                        // Prevent injecting directly into the scroll container if a nested sidebarLinks div exists
                        if (container.classList.contains('mainDrawer-scrollContainer') && container.querySelector('.sidebarLinks')) {
                            return;
                        }

                        if (!container.querySelector('.seasonal-sidebar-settings-link')) {
                            // Add sidebar section header if not present
                            if (!container.querySelector('.seasonal-sidebar-header')) {
                                const header = document.createElement('h3');
                                header.className = 'sidebarHeader seasonal-sidebar-header';
                                header.textContent = 'Seasonals';
                                container.appendChild(header);
                            }

                            const link = document.createElement('a');
                            link.className = 'sidebarLink navMenuOption seasonal-sidebar-settings-link';
                            link.href = '#';

                            // Add logo icon
                            const logoImg = document.createElement('img');
                            logoImg.className = 'sidebarLinkIcon navMenuOptionIcon';
                            logoImg.src = '../Seasonals/Resources/assets/logo_SW.svg';
                            logoImg.draggable = false;
                            Object.assign(logoImg.style, {
                                width: '24px',
                                height: '24px',
                                verticalAlign: 'middle',
                                marginRight: '1.2em',
                                pointerEvents: 'none'
                            });

                            // Add text
                            const textSpan = document.createElement('span');
                            textSpan.className = 'sidebarLinkText navMenuOptionText';

                            const lang = getCurrentLocale();
                            const t = CLIENT_MENU_TRANSLATIONS[lang] || CLIENT_MENU_TRANSLATIONS['en'];

                            // Clean up name to "Settings" or local equivalent
                            let linkText = t.title;
                            if (linkText.includes('Seasonal ')) {
                                linkText = linkText.replace('Seasonal ', '');
                            } else if (linkText.includes('Saisonale ')) {
                                linkText = linkText.replace('Saisonale ', '');
                            }
                            textSpan.textContent = linkText;

                            link.appendChild(logoImg);
                            link.appendChild(textSpan);

                            link.addEventListener('click', (e) => {
                                e.preventDefault();
                                this.toggleSettingsPopup(link);
                            });

                            container.appendChild(link);
                        }
                    });
                }
            };

            const observer = new MutationObserver(() => {
                if (debounceTimer) clearTimeout(debounceTimer);
                debounceTimer = setTimeout(tryInject, 150);
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Initial injection
            tryInject();
        },

        createPopup(anchorElement) {
            const existing = document.querySelector('.seasonal-settings-popup');
            if (existing) existing.remove();

            const existingOverlay = document.querySelector('.seasonal-modal-overlay');
            if (existingOverlay) existingOverlay.remove();

            const isSidebarLink = anchorElement && anchorElement.classList.contains('seasonal-sidebar-settings-link');

            let overlay = null;
            if (isSidebarLink) {
                overlay = document.createElement('div');
                overlay.className = 'seasonal-modal-overlay';
                document.body.appendChild(overlay);
            }

            const popup = document.createElement('div');
            popup.className = `seasonal-settings-popup dialog ${isSidebarLink ? 'seasonal-modal' : 'seasonal-dropdown'}`;

            if (!isSidebarLink) {
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
            }

            const lang = getCurrentLocale();
            const t = CLIENT_MENU_TRANSLATIONS[lang] || CLIENT_MENU_TRANSLATIONS['en'];

            const enabledVal = this.getSetting('enabled', 'true') === 'true';
            const forcedThemeVal = this.getSetting('theme', 'auto');
            const menuLocationVal = this.getSetting('menuLocation', this.config.ClientMenuLocation || this.config.clientMenuLocation || "Navbar");

            let html = `
            <div class="seasonal-settings-header">
                <img src="../Seasonals/Resources/assets/logo_SW.svg" draggable="false" class="seasonal-settings-logo" />
                <h3 class="seasonal-settings-title">${t.title}</h3>
            </div>
            
            <div class="seasonal-client-tabs">
                <button type="button" class="seasonal-client-tab active" data-tab="seasonal-client-tab-general">
                    <svg style="width: 18px; height: 18px; fill: currentColor; flex-shrink: 0;" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                    <span>${t.groupGeneral}</span>
                </button>
                <button type="button" class="seasonal-client-tab" data-tab="seasonal-client-tab-themes">
                    <svg style="width: 18px; height: 18px; fill: currentColor; flex-shrink: 0;" viewBox="0 0 24 24"><path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67 0 1.38-1.12 2.5-2.5 2.5zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"/><circle cx="6.5" cy="11.5" r="1.5"/><circle cx="9.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/><circle cx="17.5" cy="11.5" r="1.5"/></svg>
                    <span>${t.groupThemes}</span>
                </button>
            </div>
            
            <div class="seasonal-settings-body">
                <!-- GENERAL TAB -->
                <div id="seasonal-client-tab-general" class="seasonal-client-tab-content">
                    <div class="seasonal-toggle-container">
                        <div class="seasonal-toggle-info">
                            <span class="seasonal-toggle-label">${t.enabledLabel}</span>
                            <span class="seasonal-toggle-desc">${t.enabledDesc}</span>
                        </div>
                        <label class="seasonal-switch">
                            <input id="seasonal-enable-toggle" type="checkbox" ${enabledVal ? 'checked' : ''} />
                            <span class="seasonal-slider"></span>
                        </label>
                    </div>
                    
                    <div class="seasonal-select-container">
                        <div class="seasonal-select-info">
                            <span class="seasonal-select-label">${t.clientMenuLocationLabel}</span>
                            <span class="seasonal-select-desc">${t.clientMenuLocationDesc}</span>
                        </div>
                        <select id="seasonal-menu-location-select" class="seasonal-select">
                            <option value="Navbar" ${menuLocationVal === 'Navbar' ? 'selected' : ''}>Navbar</option>
                            <option value="Sidebar" ${menuLocationVal === 'Sidebar' ? 'selected' : ''}>Sidebar</option>
                            <option value="Both" ${menuLocationVal === 'Both' ? 'selected' : ''}>Both</option>
                        </select>
                    </div>
                </div>
                
                <!-- THEMES TAB -->
                <div id="seasonal-client-tab-themes" class="seasonal-client-tab-content" style="display: none;">
                    <div class="seasonal-select-container">
                        <div class="seasonal-select-info">
                            <span class="seasonal-select-label">${t.themeSelectLabel}</span>
                            <span class="seasonal-select-desc">${t.themeSelectDesc}</span>
                        </div>
                        <select id="seasonal-theme-select" class="seasonal-select">
                            <option value="auto" ${forcedThemeVal === 'auto' ? 'selected' : ''}>Server-Side / Automated</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="seasonal-settings-buttons">
                <button type="button" class="seasonal-btn seasonal-btn-cancel" id="seasonal-settings-reset" title="${t.resetTitle}">
                    <span>${t.resetBtn}</span>
                </button>
                <button type="button" class="seasonal-btn seasonal-btn-submit" id="seasonal-settings-save">
                    <span>${t.saveBtn}</span>
                </button>
            </div>
            <div class="seasonal-settings-footer">
                <span>Version 3.0.0.1</span>
                <a href="https://github.com/CodeDevMLH/Jellyfin-Seasonals" target="_blank" rel="noopener noreferrer" class="seasonal-github-link">
                    <svg style="width:14px; height:14px; fill:currentColor;" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                    <span>GitHub</span>
                </a>
            </div>
            `;

            popup.innerHTML = html;

            // Populate forced themes list
            const themeSelect = popup.querySelector('#seasonal-theme-select');
            Object.keys(ThemeConfigs).forEach(key => {
                if (key === 'none') return;
                const option = document.createElement('option');
                option.value = key;
                option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                if (key === forcedThemeVal) option.selected = true;
                themeSelect.appendChild(option);
            });

            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'seasonal-settings-close-button';
            closeBtn.setAttribute('aria-label', 'Close');
            closeBtn.innerHTML = '<svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';
            closeBtn.addEventListener('click', () => {
                popup.remove();
                if (overlay) overlay.remove();
                document.removeEventListener('click', closeHandler);
            });
            popup.appendChild(closeBtn);

            // Client tabs switching
            const tabButtons = popup.querySelectorAll('.seasonal-client-tab');
            tabButtons.forEach(tBtn => {
                tBtn.addEventListener('click', () => {
                    tabButtons.forEach(b => b.classList.remove('active'));
                    tBtn.classList.add('active');

                    popup.querySelectorAll('.seasonal-client-tab-content').forEach(c => c.style.display = 'none');
                    const targetId = tBtn.getAttribute('data-tab');
                    const targetContent = popup.querySelector(`#${targetId}`);
                    if (targetContent) {
                        targetContent.style.display = 'flex';
                    }
                });
            });

            // Save & reload
            popup.querySelector('#seasonal-settings-save').addEventListener('click', () => {
                const enabled = popup.querySelector('#seasonal-enable-toggle').checked;
                const menuLoc = popup.querySelector('#seasonal-menu-location-select').value;
                const theme = popup.querySelector('#seasonal-theme-select').value;

                this.setSetting('enabled', enabled ? 'true' : 'false');
                this.setSetting('menuLocation', menuLoc);
                this.setSetting('theme', theme);

                location.reload();
            });

            // Reset settings
            popup.querySelector('#seasonal-settings-reset').addEventListener('click', () => {
                if (confirm(t.confirmReset)) {
                    Object.keys(localStorage).forEach(key => {
                        if (key.startsWith('seasonals-')) {
                            localStorage.removeItem(key);
                        }
                    });
                    location.reload();
                }
            });

            // Click outside to close
            const closeHandler = (e) => {
                if (!popup.contains(e.target) && e.target !== anchorElement && !anchorElement.contains(e.target)) {
                    popup.remove();
                    if (overlay) overlay.remove();
                    document.removeEventListener('click', closeHandler);
                }
            };
            setTimeout(() => document.addEventListener('click', closeHandler), 150);

            if (overlay) {
                overlay.addEventListener('click', () => {
                    popup.remove();
                    overlay.remove();
                    document.removeEventListener('click', closeHandler);
                });
            }

            document.body.appendChild(popup);
        },

        toggleSettingsPopup(anchorElement) {
            const existing = document.querySelector('.seasonal-settings-popup');
            if (existing) {
                existing.remove();
                const overlay = document.querySelector('.seasonal-modal-overlay');
                if (overlay) overlay.remove();
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

                    if (this.config.IsEnabled === false) {
                        console.log('Seasonals: Plugin is disabled globally.');
                        return;
                    }

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

            const automate = (this.config && this.config.AutomateSeasonSelection !== undefined) ? this.config.AutomateSeasonSelection : true;
            const defaultTheme = (this.config && this.config.SelectedSeason) ? this.config.SelectedSeason : 'none';

            if (!automate) {
                return defaultTheme;
            }

            return this.determineCurrentThemeDate();
        },

        determineCurrentThemeDate() {
            var rules = [];
            try {
                const rulesStr = (this.config && this.config.SeasonalRules) ? this.config.SeasonalRules : "[]";
                rules = JSON.parse(rulesStr);
                if (!Array.isArray(rules)) {
                    rules = [];
                }
            } catch (e) {
                console.error("Seasonals: Error parsing SeasonalRules", e);
            }

            if (rules.length === 0) {
                // Fallback to empty/none if no rules are defined (though default should exist)
                console.log("Seasonals: No auto-selection rules found.");
                return 'none';
            }

            const date = new Date();
            const month = date.getMonth() + 1;  // 1-12
            const day = date.getDate();     // 1-31

            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if (this.isDateInRange(day, month, rule.StartDay, rule.StartMonth, rule.EndDay, rule.EndMonth)) {
                    console.log(`Seasonals: Match found for rule "${rule.Name}" (${rule.Theme})`);
                    return rule.Theme;
                }
            }

            return 'none'; // No rule matched
        },

        isDateInRange: function (day, month, startDay, startMonth, endDay, endMonth) {
            if (startMonth > endMonth) {
                // Wrapping year (e.g. Dec to Jan)
                return this.isDateAfterOrEqual(day, month, startDay, startMonth) ||
                    this.isDateBeforeOrEqual(day, month, endDay, endMonth);
            } else {
                // Normal range
                return this.isDateAfterOrEqual(day, month, startDay, startMonth) &&
                    this.isDateBeforeOrEqual(day, month, endDay, endMonth);
            }
        },

        isDateAfterOrEqual: function (day, month, targetDay, targetMonth) {
            if (month > targetMonth) return true;
            if (month === targetMonth && day >= targetDay) return true;
            return false;
        },

        isDateBeforeOrEqual: function (day, month, targetDay, targetMonth) {
            if (month < targetMonth) return true;
            if (month === targetMonth && day <= targetDay) return true;
            return false;
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
                return path.replace('/Seasonals/Resources/', './');
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
})();

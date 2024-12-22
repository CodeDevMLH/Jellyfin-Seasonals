# Jellyfin Seasonals

Jellyfin Seasonals is a simple modification that adds seasonal themes to your Jellyfin web interface. Depending on the configuration, it automatically selects a theme based on the current date or allows you to manually set a default theme.

This mod is based and builds up on the awesome work of [BobHasNoSoul-jellyfin-mods](https://github.com/BobHasNoSoul/jellyfin-mods)

---
## Table of Contents
- [Jellyfin Seasonals](#jellyfin-seasonals)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Additional Directory: Separate Single Seasonals](#additional-directory-separate-single-seasonals)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)

---

## Features

- **Automatic Theme Selection**: Dynamically updates the theme based on the date (e.g., snowflakes in December, hearts for Valentine's Day).
- **Custom Themes**: Add your own seasonal themes by extending the `themeConfigs` object.
- **Easy Integration**: Lightweight and requires minimal changes to your Jellyfin setup.


## Overview
**Autumn**
![autumn](readmeMedia/autumn.gif)

**Christmas**
![christmas](readmeMedia/christmas.gif)

**Fireworks**
![fireworks](readmeMedia/fireworks.gif)

**Halloween**
![halloween](readmeMedia/halloween.gif)

**Hearts**
![hearts](readmeMedia/hearts.gif)

**Snowfall**
![snowfall](readmeMedia/snowfall.gif)

**Snowflakes**
![snowflakes](readmeMedia/snowflakes.gif)

**Snowstorm**
![snowstorm](readmeMedia/snowstorm.gif)

## Installation

1. **Add Seasonal Container to `index.html`**  
   Edit the `index.html` file of your Jellyfin web instance. Add the following code inside the `<body>` tag:

   ```html
   <div class="seasonals-container"></div>
   <script src="seasonals/seasonals.js"></script>
    ```
2. **Deploy Files**  
    Place the seasonals folder (including seasonals.js, CSS, and additional JavaScript files for each theme) inside the Jellyfin web server directory (labeld with "web").

3. **Configure Themes**  
    Customize the theme-configs.js file to modify or add new themes. The default configuration is shown below:

    ```javascript
    const automateThemeSelection = true; // Set to false to disable automatic theme selection based on current date
    const defaultTheme = 'none';    // Default theme if automatic selection is off

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
        
        // more configs...

        none: {
            containerClass: 'none'
        },
    };
    ```

4. **Restart Jellyfin Web Interface**  
    After making these changes, restart your Jellyfin web server or refresh the interface to see the changes.

## Theme Settings
Each theme's JavaScript file contains additional settings to customize its behavior. Here are examples for the `autumn` and `snowflakes` themes:

**Autumn Theme Settings**
```javascript
const leaves = true; // Enable/disable leaves
const randomLeaves = true; // Enable random leaves
const randomLeavesMobile = false; // Enable random leaves on mobile devices
const enableDiffrentDuration = true; // Enable different animation duration for random leaves
const leafCount = 25; // Number of random extra leaves
```

**Snowflakes Theme Settings**
```javascript
const snowflakes = true; // Enable/disable snowflakes
const randomSnowflakes = true; // Enable random snowflakes
const randomSnowflakesMobile = false; // Enable random snowflakes on mobile devices
const enableColoredSnowflakes = true; // Enable colored snowflakes on mobile devices
const enableDiffrentDuration = true; // Enable different animation duration for random snowflakes
const snowflakeCount = 25; // Number of random extra snowflakes
```

## Usage
**Automatic Theme Selection**  
By default, the theme is automatically selected based on the date. For example:

    Snowfall: January
    Hearts: February (Valentine's Day)
    Halloween: October

Modify the determineCurrentTheme() function in seasonals.js to adjust date-based logic.

**Manual Theme Selection**  
To use a fixed theme, set automateThemeSelection to false in the theme-configs.js file and specify a defaultTheme.

**Custom Themes**  
1. Add your CSS and JavaScript files to the seasonals folder.
   
2. Extend the themeConfigs object with your theme details:
    ```javascript
    myTheme: {
        css: 'seasonals/my-theme.css',
        js: 'seasonals/my-theme.js',
        containerClass: 'my-theme-container',
    }
    ```


## Additional Directory: Separate Single Seasonals
For users who prefer not to use the automatic seasonal theme selection, individual seasonals are available in the `separate single seasonals` folder. Each seasonal theme can be independently loaded and used without relying on the main automatic selection system.

but this requires to the modify of the `index.html` with adding the html in `add_to_index_html`.

To use a single seasonal theme, include its specific CSS and JS files in your `index.html` inside the `<body> </body>` tags provided by `add_to_index_html.html` in the sub-theme-folders as shown below:

```html
<div class="seasonalsname-container"></div>
<script src="separate single seasonals/snowflakes.js"></script>
<link rel="stylesheet" href="separate single seasonals/snowflakes.css">
```

## Troubleshooting
- **No Theme Appears:** Ensure the `<div class="seasonals-container"></div>` and `<script src="seasonals/seasonals.js"></script>` element exists in your index.html inside the `<body> </body>` tags.
- **Missing Files:** Verify that the paths in themeConfigs point to the correct files in the seasonals folder.
- **Errors in Console:** Check browser developer tools for logs or errors related to the seasonal scripts.

## Contributing

Feel free to contribute to this project by creating pull requests or reporting issues.
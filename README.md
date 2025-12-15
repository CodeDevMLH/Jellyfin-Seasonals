# Jellyfin Seasonals Plugin

Jellyfin Seasonals is a plugin that adds seasonal themes to your Jellyfin web interface. Depending on the configuration, it automatically selects a theme based on the current date or allows you to manually set a default theme.

This plugin is based on my manual mod (see the [legacy branch](https://github.com/CodeDevMLH/Jellyfin-Seasonals/tree/legacy)), which builds up on the awesome work of [BobHasNoSoul-jellyfin-mods](https://github.com/BobHasNoSoul/jellyfin-mods).

---

## Table of Contents
- [Jellyfin Seasonals Plugin](#jellyfin-seasonals-plugin)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Build Process](#build-process)
  - [Contributing](#contributing)
  - [Legacy Manual Installation](#legacy-manual-installation)
    - [Installation](#installation-1)
    - [Theme Settings](#theme-settings)
    - [Additional Directory: Separate Single Seasonals](#additional-directory-separate-single-seasonals)
    - [Troubleshooting](#troubleshooting)

---

## Features

- **Automatic Theme Selection**: Dynamically updates the theme based on the date (e.g., snowflakes in December, fireworks for new year's eve).
- **Easy Integration**: No manual file editing required. The plugin injects everything automatically.
- **Configuration UI**: Configure settings directly in the Jellyfin Dashboard (very basic for now, needs some work in the future).

## Overview

**Easter**
![easter](https://github.com/user-attachments/assets/63665099-5c3c-4209-be6e-dda3686b2a49)

**Autumn**
![autumn](https://github.com/user-attachments/assets/df27d61c-d2d6-4776-82d7-89bf789a7462)

**Santa**
![Santa-10](https://github.com/user-attachments/assets/a69b0aa3-537d-4463-b6bc-166f0a316c37)

**Christmas**
![christmas](https://github.com/user-attachments/assets/e70a425d-866f-4617-bbfe-3c03e3654717)

**Fireworks**
![fireworks](https://github.com/user-attachments/assets/6c8b629e-b338-4dde-910b-c832aa29d77d)

**Halloween**
![halloween](https://github.com/user-attachments/assets/221a1390-847e-45a4-b8eb-dc5b45d5df5c)

**Hearts**
![hearts](https://github.com/user-attachments/assets/e084cb0c-246e-4234-b6dd-d561923c6c91)

**Snowfall**
![snowfall](https://github.com/user-attachments/assets/24bfdd84-f354-4129-933c-bb29b4180517)

**Snowflakes**
![snowflakes](https://github.com/user-attachments/assets/78f2e925-8cf6-4a0b-8a25-f05594de4efd)

**Snowstorm**
![snowstorm](https://github.com/user-attachments/assets/6fd726d2-34d1-4f80-8ed6-2f482155059f)

## Installation

To install this plugin, you will first need to add the repository in Jellyfin.

1.  Open your Jellyfin Dashboard.
2.  Navigate to **Plugins** > **Repositories**.
3.  Click the **+** sign to add a new repository.
4.  Enter a name (e.g., "Seasonals") and paste the following URL into the 'Repository URL' field:
   ```bash
   https://raw.githubusercontent.com/CodeDevMLH/Jellyfin-Seasonals/refs/heads/main/manifest.json
   ```
5.  Click **Save**.
6.  Go to the **Catalog** tab at the top.
7.  Under **General**, find the **Seasonals** plugin.
8.  Click on it and select **Install**.
9.  **Restart your Jellyfin server.**
10. **You may need to refresh your browser page** (F5 or Ctrl+R) to see the changes. 

## Usage

After installation and restart:

1.  Go to **Dashboard** > **Plugins** > **Seasonals**.
2.  **Enable Seasonals**: Toggle the plugin on or off.
3.  **Automatic Selection**:
    *   If enabled, the plugin selects the theme based on the current date (e.g., Snow in Winter, Hearts in February).
    *   If disabled, you can manually select a theme from the dropdown list.
4.  **Save** your settings.
5.  **Reload your browser page** (F5 or Ctrl+R) to see the changes.

## Build Process

If you want to build the plugin yourself:

1.  Clone the repository.
2.  Ensure you have the .NET SDK installed (NET 8 or 9 depending on your Jellyfin version).
3.  Run the build command:
    ```powershell
    dotnet build Jellyfin.Plugin.Seasonals/Jellyfin.Plugin.Seasonals.csproj --configuration Release --output bin/Publish
    ```
4.  The compiled DLL and resources will be in bin/Publish.

## Contributing

Feel free to contribute to this project by creating pull requests or reporting issues.

---

## Legacy Manual Installation

<details>
<summary>Click to expand instructions for the old manual installation method (without plugin)</summary>

### Installation

> [!TIP]
> Take a look at [CodeDevMLH/Jellyfin-Mods-Automated-Script](https://github.com/CodeDevMLH/Jellyfin-Mods-Automated-Script)

1. **Add Seasonal Container to `index.html`**  
   Edit the `index.html` file of your Jellyfin web instance. Add the following code inside the `<body>` tag:

   ```html
   <div class="seasonals-container"></div>
   <script src="seasonals/seasonals.js"></script>
    ```
2. **Deploy Files**  
    Place the seasonals folder (including seasonals.js, CSS, and additional JavaScript files for each theme [this one](https://github.com/CodeDevMLH/Jellyfin-Seasonals/tree/legacy/seasonals)) inside the Jellyfin web server directory (labeld with "web").

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
            containerClass: 'snowfall-container'
        },
        
        // more configs...

        none: {
            containerClass: 'none'
        },
    };
    ```

4. **Reload the web interface**  
    After making these changes, restart your Jellyfin server and/or refresh the web interface (ctrl+F5, sometimes you need to clear the browsers temp files/cache (every time with firefox ;-()) to see the changes.

### Theme Settings
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

### Usage
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


### Additional Directory: Separate Single Seasonals
For users who prefer not to use the automatic seasonal theme selection, individual seasonals are available in the `separate single seasonals` folder. Each seasonal theme can be independently loaded and used without relying on the main automatic selection system.

but this requires to the modify of the `index.html` with adding the html in `add_to_index_html`.

To use a single seasonal theme, include its specific CSS and JS files in your `index.html` inside the `<body> </body>` tags provided by `add_to_index_html.html` in the sub-theme-folders as shown below:

```html
<div class="seasonalsname-container"></div>
<script src="separate single seasonals/snowflakes.js"></script>
<link rel="stylesheet" href="separate single seasonals/snowflakes.css">

</details>

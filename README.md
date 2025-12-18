# Jellyfin Seasonals Plugin

Jellyfin Seasonals is a plugin that adds seasonal themes to your Jellyfin web interface. Depending on the configuration, it automatically selects a theme based on the current date or allows you to manually set a default theme.

This plugin is based on my manual mod (see the [legacy branch](https://github.com/CodeDevMLH/Jellyfin-Seasonals/tree/legacy)), which builds up on the awesome work of [BobHasNoSoul-jellyfin-mods](https://github.com/BobHasNoSoul/jellyfin-mods).

![logo](https://raw.githubusercontent.com/CodeDevMLH/Jellyfin-Seasonals/refs/heads/main/logo.png)

---

## Table of Contents
- [Jellyfin Seasonals Plugin](#jellyfin-seasonals-plugin)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Automatic Theme Selection](#automatic-theme-selection)
  - [Theme Settings](#theme-settings)
  - [Build Process](#build-process)
  - [Troubleshooting](#troubleshooting)
    - [Effects Not Showing](#effects-not-showing)
    - [Docker Permission Issues](#docker-permission-issues)
  - [Contributing](#contributing)
  - [Legacy Manual Installation](#legacy-manual-installation)
    - [Installation](#installation-1)
    - [Usage](#usage)
    - [Additional Directory: Separate Single Seasonals](#additional-directory-separate-single-seasonals)

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

This plugin is based on Jellyfin Version `10.11.x`

To install this plugin, you will first need to add the repository in Jellyfin.

1.  Open your Jellyfin Dashboard.
2.  Navigate to **Plugins** > **Manage Repositories**.
3.  Click the **+ New Repository** button to add a new repository.
4.  Enter a name (e.g., "Seasonals") and paste the following URL into the 'Repository URL' field:
   ```bash
   https://raw.githubusercontent.com/CodeDevMLH/Jellyfin-Seasonals/refs/heads/main/manifest.json
   ```
5.  Click **Add**.
6.  Go to the **Available** tab at the top.
7.  Find the **Seasonals** plugin (Under **General**)
8.  Click on it and select **Install**.
9.  **Restart your Jellyfin server.**
10. **You may need to refresh your browser page** (F5 or Ctrl+R) to see the changes. 

## Configuration

After installation and restart:

1.  Go to **Dashboard** > **Plugins** > **Seasonals**.
2.  **Enable Seasonals**: Toggle the plugin on or off.
3.  **Automatic Selection**:
    *   If enabled, the plugin selects the theme based on the current date (e.g., Snow in Winter, Hearts in February). See the table below for details.
    *   If disabled, you can manually select a theme from the dropdown list.
4.  **Save** your settings.
5.  **Reload your browser page** (F5 or Ctrl+R) to see the changes.

## Automatic Theme Selection
If automatic selection is enabled, the following themes are applied based on the date. Specific holiday events take precedence over general seasonal themes.:

| Theme | Active Period | Description |
| :--- | :--- | :--- |
| **`santa`** | Dec 22 – Dec 27 | Christmas theme |
| **`fireworks`** | Dec 28 – Jan 05 | New Year's celebration |
| **`hearts`** | Feb 10 – Feb 18 | Valentine's Day |
| **`easter`** | Mar 25 – Apr 25 | Easter theme |
| **`halloween`** | Oct 24 – Nov 05 | Halloween theme |
| **`snowflakes`** | December (Remainder) | General December winter theme |
| **`snowfall`** | January & February | General winter theme (outside of holidays) |
| **`autumn`** | Sep, Oct, Nov | Fall theme (when not Halloween) |
| **`none`** | All other dates | Default appearance |

> **Note:** Holiday themes (like `santa` or `fireworks`) override monthly seasonal themes (like `snowflakes`).

## Theme Settings
Each theme contains additional settings to customize its behavior. Expand the advanced configuration section to configure each theme, adjust parameters like particle count, animation speed etc.

## Build Process

If you want to build the plugin yourself:

1.  Clone the repository.
2.  Ensure you have the .NET SDK installed (NET 8 or 9 depending on your Jellyfin version).
3.  Run the build command:
    ```powershell
    dotnet build Jellyfin.Plugin.Seasonals/Jellyfin.Plugin.Seasonals.csproj --configuration Release --output bin/Publish
    ```
4.  The compiled DLL and resources will be in bin/Publish.

## Troubleshooting

### Effects Not Showing
1. **Verify plugin installation**:
   - Check that the plugin appears in the jellyfin admin panel
   - Ensure that the plugin is enabled and active

2. **Clear browser cache**:
   - Force refresh browser (Ctrl+F5)
   - Clear jellyfin web client cache (--> mostly you have to clear the whole browser cache)

### Docker Permission Issues
If you encounter the message `Access was denied when attempting to inject script into index.html. Automatic direct injection failed. Automatic direct insertion failed. The system will now attempt to use the File Transformation plugin.` in the log or similar permission errors in Docker:

**Option 1: Use File Transformation Plugin (Recommended)**

Seasonals now automatically detects and uses the [File Transformation](https://github.com/IAmParadox27/jellyfin-plugin-file-transformation) plugin (v2.5.0.0+) if it's installed. This eliminates permission issues by transforming content at runtime without modifying files on disk.

**Installation Steps:**
1. Install the File Transformation plugin from the Jellyfin plugin catalog
2. Restart Jellyfin
3. Seasonals will automatically detect and use it (no configuration needed)
4. Check logs to confirm: Look for "Successfully registered transformation with File Transformation plugin"

**Benefits:**
- No file permission issues in Docker environments
- Works with read-only web directories
- Survives Jellyfin updates without re-injection
- No manual file modifications required

**Option 2: Fix File Permissions**
```bash
# Find the actual index.html location
docker exec -it jellyfin find / -name index.html

# Fix ownership (replace 'jellyfin' with your container name and adjust user:group if needed)
docker exec -it --user root jellyfin chown jellyfin:jellyfin /jellyfin/jellyfin-web/index.html

# Restart container
docker restart jellyfin
```

**Option 3: Manual Volume Mapping**
```bash
# Extract index.html from container
docker cp jellyfin:/jellyfin/jellyfin-web/index.html /path/to/jellyfin/config/index.html

# Add to docker-compose.yml volumes section:
volumes:
  - /path/to/jellyfin/config/index.html:/jellyfin/jellyfin-web/index.html
```

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

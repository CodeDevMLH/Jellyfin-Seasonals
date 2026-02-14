# Jellyfin Seasonals Plugin

Jellyfin Seasonals is a plugin that adds seasonal themes to your Jellyfin web interface. Depending on the configuration, it automatically selects a theme based on the current date or allows you to manually set a default theme.

This plugin is based on my manual mod (see the [legacy branch](https://github.com/bioflash257-git/Jellyfin-Seasonals/tree/legacy)), which builds up on the awesome work of [BobHasNoSoul-jellyfin-mods](https://github.com/BobHasNoSoul/jellyfin-mods).

![logo](https://raw.githubusercontent.com/bioflash257-git/Jellyfin-Seasonals/refs/heads/main/logo.png)

---

## Table of Contents
- [Jellyfin Seasonals Plugin](#jellyfin-seasonals-plugin)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Overview](#overview)
  - [Ideas for additional seasonals](#ideas-for-additional-seasonals)
  - [Installation](#installation)
  - [Client Compatibility](#client-compatibility)
  - [Configuration](#configuration)
  - [Automatic Theme Selection](#automatic-theme-selection)
  - [Theme Settings](#theme-settings)
  - [Build the plugin by yourself](#build-the-plugin-by-yourself)
  - [Troubleshooting](#troubleshooting)
    - [Effects Not Showing](#effects-not-showing)
    - [Docker Permission Issues](#docker-permission-issues)
  - [Contributing](#contributing)

---

## Features

- **Automatic Theme Selection**: Dynamically updates the theme based on the date (e.g., snowflakes in December, fireworks for new year's eve).
- **Easy Integration**: No manual file editing required. The plugin injects everything automatically.
- **Configuration UI**: Configure settings directly in the Jellyfin Dashboard.
    <details>
    <summary>Have a look:</summary>
    <img width="852" height="782" alt="Admin-Settings" src="https://github.com/user-attachments/assets/03d04ea8-7dd9-418e-88f8-9ae2937c06bb" />
    </details>
- **User Toggle**: Optionally allow users to enable/disable seasonal effects from their client.
    <details>
    <summary>Have a look:</summary>
    <img width="467" height="263" alt="Client-Settings" src="https://github.com/user-attachments/assets/a8dfc90a-16c8-409c-9133-4139f6527b0b" />
    </details>

## Overview
Click on the following themes to expand them and see the theme in action:

<details>
<summary>Easter</summary>

![easter](https://github.com/user-attachments/assets/63665099-5c3c-4209-be6e-dda3686b2a49)
</details>

<details>
<summary>Autumn</summary>

![autumn](https://github.com/user-attachments/assets/df27d61c-d2d6-4776-82d7-89bf789a7462)
</details>

<details>
<summary>Santa</summary>

![Santa-10](https://github.com/user-attachments/assets/a69b0aa3-537d-4463-b6bc-166f0a316c37)
</details>

<details>
<summary>Christmas</summary>

![christmas](https://github.com/user-attachments/assets/e70a425d-866f-4617-bbfe-3c03e3654717)
</details>

<details>
<summary>Fireworks</summary>

![fireworks](https://github.com/user-attachments/assets/6c8b629e-b338-4dde-910b-c832aa29d77d)
</details>

<details>
<summary>Halloween</summary>

![halloween](https://github.com/user-attachments/assets/221a1390-847e-45a4-b8eb-dc5b45d5df5c)
</details>

<details>
<summary>Hearts</summary>

![hearts](https://github.com/user-attachments/assets/e084cb0c-246e-4234-b6dd-d561923c6c91)
</details>

<details>
<summary>Snowfall</summary>

![snowfall](https://github.com/user-attachments/assets/24bfdd84-f354-4129-933c-bb29b4180517)
</details>

<details>
<summary>Snowflakes</summary>

![snowflakes](https://github.com/user-attachments/assets/78f2e925-8cf6-4a0b-8a25-f05594de4efd)
</details>

<details>
<summary>Snowstorm</summary>

![snowstorm](https://github.com/user-attachments/assets/6fd726d2-34d1-4f80-8ed6-2f482155059f)
</details>


## Ideas for additional seasonals
If you have any (specific) ideas for additional seasonals, feel free to open an issue or create a pull request.

## Installation

This plugin is based on Jellyfin Version `10.11.x`

To install this plugin, you will first need to add the repository in Jellyfin.

1.  Open your Jellyfin Dashboard.
2.  Navigate to **Plugins** > **Manage Repositories**.
3.  Click the **+ New Repository** button to add a new repository.
4.  Enter a name for the repo and paste the following URL into the 'Repository URL' field:
   ```bash
   https://raw.githubusercontent.com/bioflash257-git/jellyfin-plugin-manifest/refs/heads/main/manifest.json
   ```
5.  Click **Add**.
6.  Go to the **Available** tab at the top.
7.  Find the **Seasonals** plugin (Under **General**)
8.  Click on it and select **Install**.
9.  **Restart your Jellyfin server.**
10. **You may need to refresh your browser page** (F5 or Ctrl+R) to see the changes. 

## Client Compatibility

Since this plugin relies on modifying the web interface (CSS/JS injection), it only works on clients that use the web wrapper. Native clients that use their own UI rendering engine are not supported.

| Client Platform | Status | Notes |
| :--- | :---: | :--- |
| **Web Browsers** (Firefox, Chrome etc.) | ✅ | Direct JS injection |
| **Jellyfin Media Player** (Windows/Linux/macOS) | ✅ | Uses jellyfin web |
| **Android App** | ✅ | Uses a web wrapper |
| **iOS App** | ✅ | Uses a web wrapper |
| **Android TV / Fire TV** | ❌ | **Not supported.** Uses a native Java/Kotlin UI. |
| **Roku** | ❌ | **Not supported.** Uses a native UI. |
| **Swiftfin** (iOS/tvOS) | ❌ | **Not supported.** Uses a native Swift UI. |
| **Kodi** (via Jellyfin Addon) | ❌ | **Not supported.** Uses Kodi's native skinning engine. |

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

## Build the plugin by yourself

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


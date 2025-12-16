using System;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.Logging;
using MediaBrowser.Common.Configuration;

namespace Jellyfin.Plugin.Seasonals;

/// <summary>
/// Handles the injection of the Seasonals script into the Jellyfin web interface.
/// </summary>
public class ScriptInjector
{
    private readonly IApplicationPaths _appPaths;
    private readonly ILogger<ScriptInjector> _logger;
    private const string ScriptTag = "<script src=\"Seasonals/Resources/seasonals.js\"></script>";
    private const string Marker = "</body>";

    /// <summary>
    /// Initializes a new instance of the <see cref="ScriptInjector"/> class.
    /// </summary>
    /// <param name="appPaths">The application paths.</param>
    /// <param name="logger">The logger.</param>
    public ScriptInjector(IApplicationPaths appPaths, ILogger<ScriptInjector> logger)
    {
        _appPaths = appPaths;
        _logger = logger;
    }

    /// <summary>
    /// Injects the script tag into index.html if it's not already present.
    /// </summary>
    public void Inject()
    {
        try
        {
            var webPath = GetWebPath();
            if (string.IsNullOrEmpty(webPath))
            {
                _logger.LogWarning("Could not find Jellyfin web path. Script injection skipped.");
                return;
            }

            var indexPath = Path.Combine(webPath, "index.html");
            if (!File.Exists(indexPath))
            {
                _logger.LogWarning("index.html not found at {Path}. Script injection skipped.", indexPath);
                return;
            }

            var content = File.ReadAllText(indexPath);
            if (content.Contains(ScriptTag, StringComparison.Ordinal))
            {
                _logger.LogInformation("Seasonals script already injected.");
                return;
            }

            // Insert before the closing body tag
            var newContent = content.Replace(Marker, $"{ScriptTag}\n{Marker}", StringComparison.Ordinal);
            if (string.Equals(newContent, content, StringComparison.Ordinal))
            {
                _logger.LogWarning("Could not find closing body tag in index.html. Script injection skipped.");
                return;
            }

            File.WriteAllText(indexPath, newContent);
            _logger.LogInformation("Successfully injected Seasonals script into index.html.");
        }
        catch (UnauthorizedAccessException)
        {
            _logger.LogWarning("Permission denied when attempting to inject script into index.html. Automatic injection failed. Please ensure the Jellyfin web directory is writable by the process, or manually add the script tag: {ScriptTag}", ScriptTag);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error injecting Seasonals script.");
        }
    }

    /// <summary>
    /// Removes the script tag from index.html.
    /// </summary>
    public void Remove()
    {
        try
        {
            var webPath = GetWebPath();
            if (string.IsNullOrEmpty(webPath))
            {
                return;
            }

            var indexPath = Path.Combine(webPath, "index.html");
            if (!File.Exists(indexPath))
            {
                return;
            }

            var content = File.ReadAllText(indexPath);
            if (!content.Contains(ScriptTag, StringComparison.Ordinal))
            {
                return;
            }

            // Try to remove with newline first, then just the tag to ensure clean removal
            var newContent = content.Replace($"{ScriptTag}\n", "", StringComparison.Ordinal)
                                    .Replace(ScriptTag, "", StringComparison.Ordinal);
            
            File.WriteAllText(indexPath, newContent);
            _logger.LogInformation("Successfully removed Seasonals script from index.html.");
        }
        catch (UnauthorizedAccessException)
        {
            _logger.LogWarning("Permission denied when attempting to remove script from index.html.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing Seasonals script.");
        }
    }

    /// <summary>
    /// Retrieves the path to the Jellyfin web interface directory.
    /// </summary>
    /// <returns>The path to the web directory, or null if not found.</returns>
    private string? GetWebPath()
    {
        // Use reflection to access WebPath property to ensure compatibility across different Jellyfin versions
        var prop = _appPaths.GetType().GetProperty("WebPath", BindingFlags.Instance | BindingFlags.Public);
        return prop?.GetValue(_appPaths) as string;
    }
}

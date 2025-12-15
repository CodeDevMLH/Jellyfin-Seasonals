using System;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Jellyfin.Plugin.Seasonals.Api;

/// <summary>
/// Controller for serving seasonal resources and configuration.
/// </summary>
[ApiController]
[Route("Seasonals")]
public class SeasonalsController : ControllerBase
{
    /// <summary>
    /// Gets the current plugin configuration.
    /// </summary>
    /// <returns>The configuration object.</returns>
    [HttpGet("Config")]
    [Produces("application/json")]
    public ActionResult<object> GetConfig()
    {
        var config = Plugin.Instance?.Configuration;
        return new
        {
            selectedSeason = config?.SelectedSeason ?? "none",
            automateSeasonSelection = config?.AutomateSeasonSelection ?? true
        };
    }

    /// <summary>
    /// Serves embedded resources.
    /// </summary>
    /// <param name="path">The path to the resource.</param>
    /// <returns>The resource file.</returns>
    [HttpGet("Resources/{*path}")]
    public ActionResult GetResource(string path)
    {
        // Sanitize path
        if (string.IsNullOrWhiteSpace(path) || path.Contains("..", StringComparison.Ordinal))
        {
            return BadRequest();
        }

        var assembly = Assembly.GetExecutingAssembly();
        // Convert path to resource name
        var resourcePath = path.Replace('/', '.').Replace('\\', '.');
        var resourceName = $"Jellyfin.Plugin.Seasonals.Web.{resourcePath}";

        var stream = assembly.GetManifestResourceStream(resourceName);
        if (stream == null)
        {
            return NotFound($"Resource not found: {resourceName}");
        }

        string contentType = GetContentType(path);
        return File(stream, contentType);
    }

    private static string GetContentType(string path)
    {
        if (path.EndsWith(".js", StringComparison.OrdinalIgnoreCase)) return "application/javascript";
        if (path.EndsWith(".css", StringComparison.OrdinalIgnoreCase)) return "text/css";
        if (path.EndsWith(".png", StringComparison.OrdinalIgnoreCase)) return "image/png";
        if (path.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)) return "image/jpeg";
        if (path.EndsWith(".gif", StringComparison.OrdinalIgnoreCase)) return "image/gif";
        return "application/octet-stream";
    }
}

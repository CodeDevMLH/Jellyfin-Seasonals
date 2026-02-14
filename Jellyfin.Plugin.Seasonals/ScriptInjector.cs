using System;
using System.IO;
using System.Reflection;
using System.Runtime.Loader;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using MediaBrowser.Common.Configuration;
using Jellyfin.Plugin.Seasonals.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace Jellyfin.Plugin.Seasonals;

/// <summary>
/// Handles the injection of the Seasonals script into the Jellyfin web interface.
/// </summary>
public class ScriptInjector
{
    private readonly IApplicationPaths _appPaths;
    private readonly ILogger<ScriptInjector> _logger;
    public const string ScriptTag = "<script src=\"../Seasonals/Resources/seasonals.js\" defer></script>";
    public const string LegacyScriptTag = "<script src=\"/Seasonals/Resources/seasonals.js\" defer></script>";
    public const string Marker = "</body>";

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
                _logger.LogWarning("Could not find Jellyfin web path. Script injection skipped. Attempting fallback.");
                RegisterFileTransformation();
                return;
            }

            var indexPath = Path.Combine(webPath, "index.html");
            if (!File.Exists(indexPath))
            {
                _logger.LogWarning("index.html not found at {Path}. Script injection skipped. Attempting fallback.", indexPath);
                RegisterFileTransformation();
                return;
            }

            var content = File.ReadAllText(indexPath);
            if (!content.Contains(ScriptTag, StringComparison.Ordinal) && !content.Contains(LegacyScriptTag, StringComparison.Ordinal))
            {
                var index = content.IndexOf(Marker, StringComparison.OrdinalIgnoreCase);
                if (index != -1)
                {
                    content = content.Insert(index, ScriptTag + Environment.NewLine);
                    File.WriteAllText(indexPath, content);
                    _logger.LogInformation("Successfully injected Seasonals script into index.html.");
                }
                else
                {
                    _logger.LogWarning("Script already present in index.html. Or could not be injected.");
                }
            }
        }
        catch (UnauthorizedAccessException)
        {
            _logger.LogWarning("Unauthorized access when attempting to inject script into index.html. Automatic injection failed. Attempting fallback now...");
            RegisterFileTransformation();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error injecting Seasonals script. Attempting fallback.");
            RegisterFileTransformation();
        }
    }

    /// <summary>
    /// Removes the script tag from index.html.
    /// </summary>
    public void Remove()
    {
        UnregisterFileTransformation();

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
            if (content.Contains(ScriptTag, StringComparison.Ordinal) || content.Contains(LegacyScriptTag, StringComparison.Ordinal))
            {
                content = content
                    .Replace(ScriptTag + Environment.NewLine, "", StringComparison.Ordinal)
                    .Replace(ScriptTag, "", StringComparison.Ordinal)
                    .Replace(LegacyScriptTag + Environment.NewLine, "", StringComparison.Ordinal)
                    .Replace(LegacyScriptTag, "", StringComparison.Ordinal);
                File.WriteAllText(indexPath, content);
                _logger.LogInformation("Successfully removed Seasonals script from index.html.");
            } else {
                _logger.LogInformation("Seasonals script tag not found in index.html. No removal necessary.");
            }
        }
        catch (UnauthorizedAccessException)
        {
            _logger.LogWarning("Unauthorized access when attempting to remove script from index.html.");
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

    private void RegisterFileTransformation()
    {
        _logger.LogInformation("Seasonals Fallback. Registering file transformations.");
        
        List<JObject> payloads = new List<JObject>();

        {
            JObject payload = new JObject();
            payload.Add("id", "ef1e863f-cbb0-4e47-9f23-f0cbb1826ad4"); 
            payload.Add("fileNamePattern", "index.html");
            payload.Add("callbackAssembly", GetType().Assembly.FullName);
            payload.Add("callbackClass", typeof(TransformationPatches).FullName);
            payload.Add("callbackMethod", nameof(TransformationPatches.IndexHtml));
            
            payloads.Add(payload);
        }

        Assembly? fileTransformationAssembly =
            AssemblyLoadContext.All.SelectMany(x => x.Assemblies).FirstOrDefault(x =>
                x.FullName?.Contains(".FileTransformation") ?? false);

        if (fileTransformationAssembly != null)
        {
            Type? pluginInterfaceType = fileTransformationAssembly.GetType("Jellyfin.Plugin.FileTransformation.PluginInterface");

            if (pluginInterfaceType != null)
            {
                foreach (JObject payload in payloads)
                {
                    pluginInterfaceType.GetMethod("RegisterTransformation")?.Invoke(null, new object?[] { payload });
                }
                _logger.LogInformation("File transformations registered successfully.");
            }
            else
            {
                _logger.LogWarning("FileTransformation plugin found but PluginInterface type missing.");
            }
        }
        else
        {
                _logger.LogWarning("FileTransformation plugin assembly not found. Fallback injection skipped.");
        }
    }
    
    private void UnregisterFileTransformation()
    {
        try 
        {
            Assembly? fileTransformationAssembly =
                AssemblyLoadContext.All.SelectMany(x => x.Assemblies).FirstOrDefault(x =>
                    x.FullName?.Contains(".FileTransformation") ?? false);

            if (fileTransformationAssembly != null)
            {
                Type? pluginInterfaceType = fileTransformationAssembly.GetType("Jellyfin.Plugin.FileTransformation.PluginInterface");

                if (pluginInterfaceType != null)
                {
                    Guid id = Guid.Parse("ef1e863f-cbb0-4e47-9f23-f0cbb1826ad4");
                    pluginInterfaceType.GetMethod("RemoveTransformation")?.Invoke(null, new object?[] { id });
                    _logger.LogInformation("File transformation unregistered successfully.");
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error attempting to unregister file transformation. It might not have been registered.");
        }
    }
}

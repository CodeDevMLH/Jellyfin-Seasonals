using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using Jellyfin.Plugin.Seasonals.Configuration;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Plugins;
using MediaBrowser.Model.Plugins;
using MediaBrowser.Model.Serialization;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Jellyfin.Plugin.Seasonals;

/// <summary>
/// The main plugin.
/// </summary>
public class SeasonalsPlugin : BasePlugin<PluginConfiguration>, IHasWebPages
{
    private readonly ScriptInjector _scriptInjector;
    private readonly ILoggerFactory _loggerFactory;

    /// <summary>
    /// Initializes a new instance of the <see cref="Plugin"/> class.
    /// </summary>
    /// <param name="applicationPaths">Instance of the <see cref="IApplicationPaths"/> interface.</param>
    /// <param name="xmlSerializer">Instance of the <see cref="IXmlSerializer"/> interface.</param>
    /// <param name="loggerFactory">Instance of the <see cref="ILoggerFactory"/> interface.</param>
    public SeasonalsPlugin(IApplicationPaths applicationPaths, IXmlSerializer xmlSerializer, ILoggerFactory loggerFactory)
        : base(applicationPaths, xmlSerializer)
    {
        Instance = this;
        _loggerFactory = loggerFactory;
        _scriptInjector = new ScriptInjector(applicationPaths, loggerFactory.CreateLogger<ScriptInjector>());
        
        if (Configuration.IsEnabled)
        {
            if (!_scriptInjector.Inject())
            {
                TryRegisterFallback(loggerFactory.CreateLogger("FileTransformationFallback"));
            }
        }
        else
        {
            if (!_scriptInjector.Remove()) {
                TryRemoveFallback(loggerFactory.CreateLogger("FileTransformationFallback"));
            }
        }
    }

    /// <inheritdoc />
    public override void UpdateConfiguration(BasePluginConfiguration configuration)
    {
        var oldConfig = Configuration;
        base.UpdateConfiguration(configuration);

        if (Configuration.IsEnabled != oldConfig.IsEnabled)
        {
            if (Configuration.IsEnabled)
            {
                if (!_scriptInjector.Inject())
                {
                    TryRegisterFallback(_loggerFactory.CreateLogger("FileTransformationFallback"));
                }
            }
            else
            {
                if (!_scriptInjector.Remove()) {
                    TryRemoveFallback(_loggerFactory.CreateLogger("FileTransformationFallback"));
                }
            }
        }
    }

    /// <inheritdoc />
    public override string Name => "Seasonals";

    /// <inheritdoc />
    public override Guid Id => Guid.Parse("ef1e863f-cbb0-4e47-9f23-f0cbb1826ad4");

    /// <summary>
    /// Gets the current plugin instance.
    /// </summary>
    public static SeasonalsPlugin? Instance { get; private set; }

    /// <summary>
    /// Callback method for FileTransformation plugin.
    /// </summary>
    /// <param name="payload">The payload containing the file contents.</param>
    /// <returns>The modified file contents.</returns>
    public static string TransformIndexHtml(JObject payload)
    {
        // CRITICAL: Always return original content if something fails or is null
        string? originalContents = payload?["contents"]?.ToString();
        
        if (string.IsNullOrEmpty(originalContents))
        {
            return originalContents ?? string.Empty;
        }

        try
        {
            var html = originalContents;
            const string scriptTag = "<script src=\"/Seasonals/Resources/seasonals.js\" defer></script>";
            // MARK: Remember me to remove legacy script tag support in future versions...
            const string legacyScriptTag = "<script src=\"/Seasonals/Resources/seasonals.js\"></script>";

            if (Instance?.Configuration.IsEnabled != true)
            {
                // Remove script if present
                if (html.Contains("seasonals.js", StringComparison.Ordinal))
                {
                    return html.Replace(scriptTag, "", StringComparison.OrdinalIgnoreCase)
                               .Replace(legacyScriptTag, "", StringComparison.OrdinalIgnoreCase);
                }
                return html;
            }

            if (!html.Contains("seasonals.js", StringComparison.Ordinal))
            {
                var inject = $"{scriptTag}\n<body";
                return html.Replace("<body", inject, StringComparison.OrdinalIgnoreCase);
            }
            
            return html;
        }
        catch
        {
            // On error, return original content to avoid breaking the UI
            return originalContents;
        }
    }

    private void TryRegisterFallback(ILogger logger)
    {
        try
        {
            // Find the FileTransformation assembly across all load contexts
            var assembly = AssemblyLoadContext.All
                .SelectMany(x => x.Assemblies)
                .FirstOrDefault(x => x.FullName?.Contains(".FileTransformation") ?? false);

            if (assembly == null)
            {
                logger.LogWarning("FileTransformation plugin not found. Fallback injection skipped.");
                return;
            }

            var type = assembly.GetType("Jellyfin.Plugin.FileTransformation.PluginInterface");
            if (type == null)
            {
                logger.LogWarning("Jellyfin.Plugin.FileTransformation.PluginInterface not found.");
                return;
            }

            var method = type.GetMethod("RegisterTransformation");
            if (method == null)
            {
                logger.LogWarning("RegisterTransformation method not found.");
                return;
            }

            // Create JObject payload directly using Newtonsoft.Json
            var payload = new JObject
            {
                { "id", Id.ToString() },
                { "fileNamePattern", "index.html" },
                { "callbackAssembly", this.GetType().Assembly.FullName },
                { "callbackClass", this.GetType().FullName },
                { "callbackMethod", nameof(TransformIndexHtml) }
            };

            // Invoke RegisterTransformation with the JObject payload
            method.Invoke(null, new object[] { payload });
            logger.LogInformation("Successfully registered fallback transformation via FileTransformation plugin.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error attempting to register fallback transformation.");
        }
    }

    private void TryRemoveFallback(ILogger logger)
    {
        try
        {
            var assembly = AssemblyLoadContext.All
                .SelectMany(x => x.Assemblies)
                .FirstOrDefault(x => x.FullName?.Contains(".FileTransformation") ?? false);
    
            if (assembly == null)
            {
                logger.LogWarning("FileTransformation plugin not found. Fallback removal skipped.");
                return;
            }
    
            var type = assembly.GetType("Jellyfin.Plugin.FileTransformation.PluginInterface");
            if (type == null)
            {
                logger.LogWarning("Jellyfin.Plugin.FileTransformation.PluginInterface not found.");
                return;
            }
    
            var method = type.GetMethod("RemoveTransformation");
            if (method == null)
            {
                logger.LogWarning("RemoveTransformation method not found.");
                return;
            }
    
            Guid pluginId = Id is Guid g ? g : Guid.Parse(Id.ToString());
            method.Invoke(null, new object[] { pluginId });
            logger.LogInformation("Successfully unregistered fallback transformation via FileTransformation plugin.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error attempting to unregister fallback transformation.");
        }
    }

    /// <inheritdoc />
    public IEnumerable<PluginPageInfo> GetPages()
    {
        return new[]
        {
            new PluginPageInfo
            {
                Name = Name,
                EnableInMainMenu = true,
                EmbeddedResourcePath = string.Format(CultureInfo.InvariantCulture, "{0}.Configuration.configPage.html", GetType().Namespace)
            }
        };
    }
}

using System;
using System.Collections.Generic;
using System.Globalization;
using Jellyfin.Plugin.Seasonals.Configuration;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Plugins;
using MediaBrowser.Model.Plugins;
using MediaBrowser.Model.Serialization;
using Microsoft.Extensions.Logging;

namespace Jellyfin.Plugin.Seasonals;

/// <summary>
/// The main plugin.
/// </summary>
public class Plugin : BasePlugin<PluginConfiguration>, IHasWebPages
{
    private readonly ScriptInjector _scriptInjector;

    /// <summary>
    /// Initializes a new instance of the <see cref="Plugin"/> class.
    /// </summary>
    /// <param name="applicationPaths">Instance of the <see cref="IApplicationPaths"/> interface.</param>
    /// <param name="xmlSerializer">Instance of the <see cref="IXmlSerializer"/> interface.</param>
    /// <param name="loggerFactory">Instance of the <see cref="ILoggerFactory"/> interface.</param>
    public Plugin(IApplicationPaths applicationPaths, IXmlSerializer xmlSerializer, ILoggerFactory loggerFactory)
        : base(applicationPaths, xmlSerializer)
    {
        Instance = this;
        _scriptInjector = new ScriptInjector(applicationPaths, loggerFactory.CreateLogger<ScriptInjector>());
        _scriptInjector.Inject();
    }

    /// <inheritdoc />
    public override string Name => "Seasonals";

    /// <inheritdoc />
    public override Guid Id => Guid.Parse("ef1e863f-cbb0-4e47-9f23-f0cbb1826ad4");

    /// <summary>
    /// Gets the current plugin instance.
    /// </summary>
    public static Plugin? Instance { get; private set; }

    /// <inheritdoc />
    public IEnumerable<PluginPageInfo> GetPages()
    {
        return
        [
            new PluginPageInfo
            {
                Name = Name,
                EmbeddedResourcePath = string.Format(CultureInfo.InvariantCulture, "{0}.Configuration.configPage.html", GetType().Namespace)
            }
        ];
    }
}

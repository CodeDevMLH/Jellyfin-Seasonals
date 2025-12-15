using MediaBrowser.Model.Plugins;

namespace Jellyfin.Plugin.Seasonals.Configuration;

/// <summary>
/// Plugin configuration.
/// </summary>
public class PluginConfiguration : BasePluginConfiguration
{
    /// <summary>
    /// Initializes a new instance of the <see cref="PluginConfiguration"/> class.
    /// </summary>
    public PluginConfiguration()
    {
        SelectedSeason = "none";
        AutomateSeasonSelection = true;
    }

    /// <summary>
    /// Gets or sets the selected season.
    /// </summary>
    public string SelectedSeason { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether to automate season selection.
    /// </summary>
    public bool AutomateSeasonSelection { get; set; }
}

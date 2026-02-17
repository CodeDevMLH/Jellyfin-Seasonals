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
        IsEnabled = true;
        SelectedSeason = "none";
        AutomateSeasonSelection = true;
        EnableClientSideToggle = true;
        
        Autumn = new AutumnOptions();
        Snowflakes = new SnowflakesOptions();
        Snowfall = new SnowfallOptions();
        Snowstorm = new SnowstormOptions();
        Fireworks = new FireworksOptions();
        Halloween = new HalloweenOptions();
        Hearts = new HeartsOptions();
        Christmas = new ChristmasOptions();
        Santa = new SantaOptions();
        Easter = new EasterOptions();
        Resurrection = new ResurrectionOptions();
    }

    /// <summary>
    /// Gets or sets a value indicating whether the plugin is enabled.
    /// </summary>
    public bool IsEnabled { get; set; }

    /// <summary>
    /// Gets or sets the selected season.
    /// </summary>
    public string SelectedSeason { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether to automate season selection.
    /// </summary>
    public bool AutomateSeasonSelection { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether to enable client-side toggle for users.
    /// </summary>
    public bool EnableClientSideToggle { get; set; }

    /// <summary>
    /// Gets or sets the seasonal rules configuration as JSON.
    /// </summary>
    public string SeasonalRules { get; set; } = "[{\"Name\":\"New Year Fireworks\",\"StartDay\":28,\"StartMonth\":12,\"EndDay\":5,\"EndMonth\":1,\"Theme\":\"fireworks\"},{\"Name\":\"Valentine's Day\",\"StartDay\":10,\"StartMonth\":2,\"EndDay\":18,\"EndMonth\":2,\"Theme\":\"hearts\"},{\"Name\":\"Santa\",\"StartDay\":22,\"StartMonth\":12,\"EndDay\":27,\"EndMonth\":12,\"Theme\":\"santa\"},{\"Name\":\"Snowflakes (December)\",\"StartDay\":1,\"StartMonth\":12,\"EndDay\":31,\"EndMonth\":12,\"Theme\":\"snowflakes\"},{\"Name\":\"Snowfall (January)\",\"StartDay\":1,\"StartMonth\":1,\"EndDay\":31,\"EndMonth\":1,\"Theme\":\"snowfall\"},{\"Name\":\"Snowfall (February)\",\"StartDay\":1,\"StartMonth\":2,\"EndDay\":29,\"EndMonth\":2,\"Theme\":\"snowfall\"},{\"Name\":\"Easter\",\"StartDay\":25,\"StartMonth\":3,\"EndDay\":25,\"EndMonth\":4,\"Theme\":\"easter\"},{\"Name\":\"Halloween\",\"StartDay\":24,\"StartMonth\":10,\"EndDay\":5,\"EndMonth\":11,\"Theme\":\"halloween\"},{\"Name\":\"Autumn\",\"StartDay\":1,\"StartMonth\":9,\"EndDay\":30,\"EndMonth\":11,\"Theme\":\"autumn\"}]";

    /// <summary>
    /// Gets or sets the Seasonals options.
    /// </summary>
    public AutumnOptions Autumn { get; set; }
    public SnowflakesOptions Snowflakes { get; set; }
    public SnowfallOptions Snowfall { get; set; }
    public SnowstormOptions Snowstorm { get; set; }
    public FireworksOptions Fireworks { get; set; }
    public HalloweenOptions Halloween { get; set; }
    public HeartsOptions Hearts { get; set; }
    public ChristmasOptions Christmas { get; set; }
    public SantaOptions Santa { get; set; }
    public EasterOptions Easter { get; set; }
    public ResurrectionOptions Resurrection { get; set; }
}

public class AutumnOptions
{
    public int LeafCount { get; set; } = 25;
    public bool EnableAutumn { get; set; } = true;
    public bool EnableRandomLeaves { get; set; } = true;
    public bool EnableRandomLeavesMobile { get; set; } = false;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableRotation { get; set; } = false;
}

public class SnowflakesOptions
{
    public int SnowflakeCount { get; set; } = 25;
    public bool EnableSnowflakes { get; set; } = true;
    public bool EnableRandomSnowflakes { get; set; } = true;
    public bool EnableRandomSnowflakesMobile { get; set; } = false;
    public bool EnableColoredSnowflakes { get; set; } = true;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class SnowfallOptions
{
    public int SnowflakesCount { get; set; } = 500;
    public int SnowflakesCountMobile { get; set; } = 250;
    public double Speed { get; set; } = 3;
    public bool EnableSnowfall { get; set; } = true;
}

public class SnowstormOptions
{
    public int SnowflakesCount { get; set; } = 500;
    public int SnowflakesCountMobile { get; set; } = 250;
    public double Speed { get; set; } = 6;
    public bool EnableSnowstorm { get; set; } = true;
    public double HorizontalWind { get; set; } = 4;
    public double VerticalVariation { get; set; } = 2;
}

public class FireworksOptions
{
    public int ParticleCount { get; set; } = 50;
    public int LaunchInterval { get; set; } = 3200;
    public bool EnableFireworks { get; set; } = true;
    public bool ScrollFireworks { get; set; } = true;
    public int MinFireworks { get; set; } = 3;
    public int MaxFireworks { get; set; } = 6;
}

public class HalloweenOptions
{
    public int SymbolCount { get; set; } = 25;
    public bool EnableHalloween { get; set; } = true;
    public bool EnableRandomSymbols { get; set; } = true;
    public bool EnableRandomSymbolsMobile { get; set; } = false;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class HeartsOptions
{
    public int SymbolCount { get; set; } = 25;
    public bool EnableHearts { get; set; } = true;
    public bool EnableRandomSymbols { get; set; } = true;
    public bool EnableRandomSymbolsMobile { get; set; } = false;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class ChristmasOptions
{
    public int SymbolCount { get; set; } = 25;
    public bool EnableChristmas { get; set; } = true;
    public bool EnableRandomChristmas { get; set; } = true;
    public bool EnableRandomChristmasMobile { get; set; } = false;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class SantaOptions
{
    public int SnowflakesCount { get; set; } = 500;
    public int SnowflakesCountMobile { get; set; } = 250;
    public double SantaSpeed { get; set; } = 10;
    public double SantaSpeedMobile { get; set; } = 8;
    public bool EnableSanta { get; set; } = true;
    public double SnowFallSpeed { get; set; } = 3;
    public double MaxSantaRestTime { get; set; } = 8;
    public double MinSantaRestTime { get; set; } = 3;
    public double MaxPresentFallSpeed { get; set; } = 5;
    public double MinPresentFallSpeed { get; set; } = 2;
}

public class EasterOptions
{
    public int EggCount { get; set; } = 20;
    public bool EnableEaster { get; set; } = true;
    public bool EnableRandomEaster { get; set; } = true;
    public bool EnableRandomEasterMobile { get; set; } = false;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableBunny { get; set; } = true;
    public int BunnyDuration { get; set; } = 12000;
    public int HopHeight { get; set; } = 12;
    public int MinBunnyRestTime { get; set; } = 2000;
    public int MaxBunnyRestTime { get; set; } = 5000;
}

public class ResurrectionOptions
{
    public int SymbolCount { get; set; } = 12;
    public bool EnableResurrection { get; set; } = true;
    public bool EnableRandomSymbols { get; set; } = true;
    public bool EnableRandomSymbolsMobile { get; set; } = false;
    public bool EnableDifferentDuration { get; set; } = true;
}

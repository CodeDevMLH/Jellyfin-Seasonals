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
        Birthday = new BirthdayOptions();
        Carnival = new CarnivalOptions();
        CherryBlossom = new CherryBlossomOptions();
        Christmas = new ChristmasOptions();
        EarthDay = new EarthDayOptions();
        Easter = new EasterOptions();
        Eid = new EidOptions();
        Eurovision = new EurovisionOptions();
        FilmNoir = new FilmNoirOptions();
        Fireworks = new FireworksOptions();
        Friday13 = new Friday13Options();
        Frost = new FrostOptions();
        Halloween = new HalloweenOptions();
        Hearts = new HeartsOptions();
        MarioDay = new MarioDayOptions();
        Matrix = new MatrixOptions();
        Oktoberfest = new OktoberfestOptions();
        Olympia = new OlympiaOptions();
        Oscar = new OscarOptions();
        Rain = new RainOptions();
        Pride = new PrideOptions();
        Resurrection = new ResurrectionOptions();
        Santa = new SantaOptions();
        Snowfall = new SnowfallOptions();
        Snowflakes = new SnowflakesOptions();
        Snowstorm = new SnowstormOptions();
        Space = new SpaceOptions();
        Spooky = new SpookyOptions();
        Sports = new SportsOptions();
        Spring = new SpringOptions();
        StarWars = new StarWarsOptions();
        Storm = new StormOptions();
        Summer = new SummerOptions();
        Underwater = new UnderwaterOptions();
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
    public string SeasonalRules { get; set; } = "[" +
        "{\"Name\":\"New Year Fireworks\",\"StartDay\":28,\"StartMonth\":12,\"EndDay\":5,\"EndMonth\":1,\"Theme\":\"fireworks\"}," +
        "{\"Name\":\"Snowfall (January)\",\"StartDay\":1,\"StartMonth\":1,\"EndDay\":31,\"EndMonth\":1,\"Theme\":\"snowfall\"}," +
        "{\"Name\":\"Snowfall (February)\",\"StartDay\":1,\"StartMonth\":2,\"EndDay\":29,\"EndMonth\":2,\"Theme\":\"snowfall\"}," +
        "{\"Name\":\"Valentine's Day\",\"StartDay\":10,\"StartMonth\":2,\"EndDay\":18,\"EndMonth\":2,\"Theme\":\"hearts\"}," +
        "{\"Name\":\"Carnival\",\"StartDay\":19,\"StartMonth\":2,\"EndDay\":28,\"EndMonth\":2,\"Theme\":\"carnival\"}," +
        "{\"Name\":\"Oscar Awards\",\"StartDay\":23,\"StartMonth\":2,\"EndDay\":5,\"EndMonth\":3,\"Theme\":\"oscar\"}," +
        "{\"Name\":\"Mario Day\",\"StartDay\":10,\"StartMonth\":3,\"EndDay\":10,\"EndMonth\":3,\"Theme\":\"marioday\"}," +
        "{\"Name\":\"Film Noir Day\",\"StartDay\":17,\"StartMonth\":3,\"EndDay\":17,\"EndMonth\":3,\"Theme\":\"filmnoir\"}," +
        "{\"Name\":\"Spring\",\"StartDay\":1,\"StartMonth\":3,\"EndDay\":31,\"EndMonth\":5,\"Theme\":\"spring\"}," +
        "{\"Name\":\"Cherry Blossom\",\"StartDay\":1,\"StartMonth\":4,\"EndDay\":30,\"EndMonth\":4,\"Theme\":\"cherryblossom\"}," +
        "{\"Name\":\"Easter\",\"StartDay\":25,\"StartMonth\":3,\"EndDay\":25,\"EndMonth\":4,\"Theme\":\"easter\"}," +
        "{\"Name\":\"Earth Day\",\"StartDay\":22,\"StartMonth\":4,\"EndDay\":22,\"EndMonth\":4,\"Theme\":\"earthday\"}," +
        "{\"Name\":\"Space Day\",\"StartDay\":12,\"StartMonth\":4,\"EndDay\":12,\"EndMonth\":4,\"Theme\":\"space\"}," +
        "{\"Name\":\"Star Wars Day\",\"StartDay\":4,\"StartMonth\":5,\"EndDay\":5,\"EndMonth\":5,\"Theme\":\"starwars\"}," +
        "{\"Name\":\"Eurovision\",\"StartDay\":6,\"StartMonth\":5,\"EndDay\":12,\"EndMonth\":5,\"Theme\":\"eurovision\"}," +
        "{\"Name\":\"Pride Month\",\"StartDay\":1,\"StartMonth\":6,\"EndDay\":30,\"EndMonth\":6,\"Theme\":\"pride\"}," +
        "{\"Name\":\"Summer\",\"StartDay\":1,\"StartMonth\":6,\"EndDay\":31,\"EndMonth\":8,\"Theme\":\"summer\"}," +
        "{\"Name\":\"Underwater\",\"StartDay\":1,\"StartMonth\":7,\"EndDay\":31,\"EndMonth\":8,\"Theme\":\"underwater\"}," +
        "{\"Name\":\"Autumn\",\"StartDay\":1,\"StartMonth\":9,\"EndDay\":30,\"EndMonth\":11,\"Theme\":\"autumn\"}," +
        "{\"Name\":\"Oktoberfest\",\"StartDay\":20,\"StartMonth\":9,\"EndDay\":5,\"EndMonth\":10,\"Theme\":\"oktoberfest\"}," +
        "{\"Name\":\"Halloween\",\"StartDay\":24,\"StartMonth\":10,\"EndDay\":5,\"EndMonth\":11,\"Theme\":\"halloween\"}," +
        "{\"Name\":\"Spooky (Pre-Halloween)\",\"StartDay\":1,\"StartMonth\":10,\"EndDay\":23,\"EndMonth\":10,\"Theme\":\"spooky\"}," +
        "{\"Name\":\"Snowflakes (December)\",\"StartDay\":1,\"StartMonth\":12,\"EndDay\":31,\"EndMonth\":12,\"Theme\":\"snowflakes\"}," +
        "{\"Name\":\"Santa\",\"StartDay\":22,\"StartMonth\":12,\"EndDay\":27,\"EndMonth\":12,\"Theme\":\"santa\"}" +
        "]";

    /// <summary>
    /// Gets or sets the Seasonals options.
    /// </summary>
    public AutumnOptions Autumn { get; set; }
    public BirthdayOptions Birthday { get; set; }
    public CarnivalOptions Carnival { get; set; }
    public CherryBlossomOptions CherryBlossom { get; set; }
    public ChristmasOptions Christmas { get; set; }
    public EarthDayOptions EarthDay { get; set; }
    public EasterOptions Easter { get; set; }
    public EidOptions Eid { get; set; }
    public EurovisionOptions Eurovision { get; set; }
    public FilmNoirOptions FilmNoir { get; set; }
    public FireworksOptions Fireworks { get; set; }
    public Friday13Options Friday13 { get; set; }
    public FrostOptions Frost { get; set; }
    public HalloweenOptions Halloween { get; set; }
    public HeartsOptions Hearts { get; set; }
    public MarioDayOptions MarioDay { get; set; }
    public MatrixOptions Matrix { get; set; }
    public OktoberfestOptions Oktoberfest { get; set; }
    public OlympiaOptions Olympia { get; set; }
    public OscarOptions Oscar { get; set; }
    public PrideOptions Pride { get; set; }
    public RainOptions Rain { get; set; }
    public ResurrectionOptions Resurrection { get; set; }
    public SantaOptions Santa { get; set; }
    public SnowfallOptions Snowfall { get; set; }
    public SnowflakesOptions Snowflakes { get; set; }
    public SnowstormOptions Snowstorm { get; set; }
    public SpaceOptions Space { get; set; }
    public SpookyOptions Spooky { get; set; }
    public SportsOptions Sports { get; set; }
    public SpringOptions Spring { get; set; }
    public StarWarsOptions StarWars { get; set; }
    public StormOptions Storm { get; set; }
    public SummerOptions Summer { get; set; }
    public UnderwaterOptions Underwater { get; set; }
}

public class AutumnOptions {
    public bool EnableAutumn { get; set; } = true;
    public int LeafCount { get; set; } = 35;
    public int LeafCountMobile { get; set; } = 10;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableRotation { get; set; } = false;
}

public class BirthdayOptions {
    public bool EnableBirthday { get; set; } = true;
    public int SymbolCount { get; set; } = 12;
    public int SymbolCountMobile { get; set; } = 5;
    public bool EnableDifferentDuration { get; set; } = true;
    public int ConfettiCount { get; set; } = 60;
}

public class CarnivalOptions {
    public bool EnableCarnival { get; set; } = true;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableCarnivalSway { get; set; } = true;
    public int ObjectCount { get; set; } = 120;
    public int ObjectCountMobile { get; set; } = 60;
}

public class CherryBlossomOptions {
    public bool EnableCherryBlossom { get; set; } = true;
    public int PetalCount { get; set; } = 25;
    public int PetalCountMobile { get; set; } = 15;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class ChristmasOptions {
    public bool EnableChristmas { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public int SymbolCountMobile { get; set; } = 10;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class EarthDayOptions {
    public bool EnableEarthDay { get; set; } = true;
    public int FlowersCount { get; set; } = 60;
    public int FlowersCountMobile { get; set; } = 20;
}

public class EasterOptions {
    public bool EnableEaster { get; set; } = true;
    public bool EnableBunny { get; set; } = true;
    public int MinBunnyRestTime { get; set; } = 2000;
    public int MaxBunnyRestTime { get; set; } = 5000;
    public int EggCount { get; set; } = 15;
}

public class EidOptions {
    public bool EnableEid { get; set; } = true;
    public int LanternCount { get; set; } = 8;
    public int LanternCountMobile { get; set; } = 3;
}

public class EurovisionOptions {
    public bool EnableEurovision { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableColorfulNotes { get; set; } = true;
    public string EurovisionColors { get; set; } = "#ff0026ff,#17a6ffff,#32d432ff,#FFD700,#f0821bff,#f826f8ff";
    public int EurovisionGlowSize { get; set; } = 2;
}

public class FilmNoirOptions {
    public bool EnableFilmNoir { get; set; } = true;
}

public class FireworksOptions {
    public bool EnableFireworks { get; set; } = true;
    public bool ScrollFireworks { get; set; } = true;
    public int ParticleCount { get; set; } = 50;
    public int MinFireworks { get; set; } = 3;
    public int MaxFireworks { get; set; } = 6;
    public int LaunchInterval { get; set; } = 3200;
}

public class Friday13Options {
    public bool EnableFriday13 { get; set; } = true;
}

public class FrostOptions {
    public bool EnableFrost { get; set; } = true;
}

public class HalloweenOptions {
    public bool EnableHalloween { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public int SymbolCountMobile { get; set; } = 10;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableSpiders { get; set; } = true;
    public bool EnableMice { get; set; } = true;
}

public class HeartsOptions {
    public bool EnableHearts { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public int SymbolCountMobile { get; set; } = 10;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class MarioDayOptions {
    public bool EnableMarioDay { get; set; } = true;
    public bool LetMarioJump { get; set; } = true;
}

public class MatrixOptions {
    public bool EnableMatrix { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public bool EnableMatrixBackground { get; set; } = false;
    public string MatrixChars { get; set; } = "0123456789";
}

public class OktoberfestOptions {
    public bool EnableOktoberfest { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public int SymbolCountMobile { get; set; } = 10;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class OlympiaOptions {
    public bool EnableOlympia { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public int SymbolCountMobile { get; set; } = 10;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class OscarOptions {
    public bool EnableOscar { get; set; } = true;
}

public class PrideOptions {
    public bool EnablePride { get; set; } = true;
    public int HeartCount { get; set; } = 20;
    public double HeartSize { get; set; } = 1.5;
    public bool ColorHeader { get; set; } = true;
}

public class RainOptions {
    public bool EnableRain { get; set; } = true;
    public int RaindropCount { get; set; } = 300;
    public int RaindropCountMobile { get; set; } = 150;
    public double RainSpeed { get; set; } = 1.0;
}

public class ResurrectionOptions {
    public bool EnableResurrection { get; set; } = true;
    public int SymbolCount { get; set; } = 12;
    public int SymbolCountMobile { get; set; } = 5;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class SantaOptions {
    public bool EnableSanta { get; set; } = true;
    public int SnowflakesCount { get; set; } = 500;
    public int SnowflakesCountMobile { get; set; } = 250;
    public double SnowFallSpeed { get; set; } = 3;
    public double SantaSpeed { get; set; } = 10;
    public double SantaSpeedMobile { get; set; } = 8;
    public double MaxSantaRestTime { get; set; } = 8;
    public double MinSantaRestTime { get; set; } = 3;
    public double MaxPresentFallSpeed { get; set; } = 5;
    public double MinPresentFallSpeed { get; set; } = 2;
}

public class SnowfallOptions {
    public bool EnableSnowfall { get; set; } = true;
    public int SnowflakesCount { get; set; } = 500;
    public int SnowflakesCountMobile { get; set; } = 250;
    public double Speed { get; set; } = 3;
}

public class SnowflakesOptions {
    public bool EnableSnowflakes { get; set; } = true;
    public int SnowflakeCount { get; set; } = 25;
    public int SnowflakeCountMobile { get; set; } = 10;
    public bool EnableColoredSnowflakes { get; set; } = true;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class SnowstormOptions {
    public bool EnableSnowstorm { get; set; } = true;
    public int SnowflakesCount { get; set; } = 500;
    public int SnowflakesCountMobile { get; set; } = 250;
    public double Speed { get; set; } = 6;
    public double HorizontalWind { get; set; } = 4;
    public double VerticalVariation { get; set; } = 2;
}

public class SpaceOptions {
    public bool EnableSpace { get; set; } = true;
    public int PlanetCount { get; set; } = 6;
    public int AstronautCount { get; set; } = 1;
    public int SatelliteCount { get; set; } = 4;
    public int IssCount { get; set; } = 1;
    public int RocketCount { get; set; } = 1;
    public bool EnableDifferentDuration { get; set; } = true;
    public int SymbolCountMobile { get; set; } = 2;
}

public class SpookyOptions {
    public bool EnableSpooky { get; set; } = true;
    public int SymbolCount { get; set; } = 25;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableSpookySway { get; set; } = true;
    public int SpookySize { get; set; } = 20;
    public int SpookyGlowSize { get; set; } = 2;
}

public class SportsOptions {
    public bool EnableSports { get; set; } = true;
    public int SymbolCount { get; set; } = 5;
    public bool EnableDifferentDuration { get; set; } = true;
    public string TurfColor { get; set; } = "#228b22";
    public string SportsBalls { get; set; } = "football,basketball,tennis,volleyball";
    public bool EnableTrophy { get; set; } = false;
    public string ConfettiColors { get; set; } = "#000000,#FF0000,#FFCC00";
}

public class SpringOptions {
    public bool EnableSpring { get; set; } = true;
    public int PollenCount { get; set; } = 30;
    public bool EnableSpringSunbeams { get; set; } = true;
    public int SunbeamCount { get; set; } = 5;
    public int BirdCount { get; set; } = 3;
    public int ButterflyCount { get; set; } = 4;
    public int BeeCount { get; set; } = 2;
    public int LadybugCount { get; set; } = 2;
    public int SymbolCountMobile { get; set; } = 2;
}

public class StarWarsOptions {
    public bool EnableStarWars { get; set; } = true;
}

public class StormOptions {
    public bool EnableStorm { get; set; } = true;
    public int RaindropCount { get; set; } = 300;
    public int RaindropCountMobile { get; set; } = 150;
    public bool EnableLightning { get; set; } = true;
    public double RainSpeed { get; set; } = 1.0;
}

public class SummerOptions {
    public bool EnableSummer { get; set; } = true;
    public int BubbleCount { get; set; } = 30;
    public int DustCount { get; set; } = 50;
    public int SymbolCountMobile { get; set; } = 2;
    public bool EnableDifferentDuration { get; set; } = true;
}

public class UnderwaterOptions {
    public bool EnableUnderwater { get; set; } = true;
    public int SymbolCountMobile { get; set; } = 2;
    public bool EnableDifferentDuration { get; set; } = true;
    public bool EnableLightRays { get; set; } = true;
    public int SeaweedCount { get; set; } = 50;
    public int CrabCount { get; set; } = 2;
    public int StarfishCount { get; set; } = 2;
    public int ShellCount { get; set; } = 2;
    public int FishCount { get; set; } = 15;
    public int SeahorseCount { get; set; } = 3;
    public int JellyfishCount { get; set; } = 3;
    public int TurtleCount { get; set; } = 1;
}
using System.Text.Json.Serialization;

namespace Jellyfin.Plugin.Seasonals.Model
{
    public class PatchRequestPayload
    {
        [JsonPropertyName("contents")]
        public string? Contents { get; set; }
    }
}

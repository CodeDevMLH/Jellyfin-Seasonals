using System;
using Jellyfin.Plugin.Seasonals.Model;

namespace Jellyfin.Plugin.Seasonals.Helpers
{
    public static class TransformationPatches
    {
        public static string IndexHtml(PatchRequestPayload payload)
        {
            // Always return original content if something fails or is null
            string? originalContents = payload?.Contents;
            
            if (string.IsNullOrEmpty(originalContents))
            {
                return originalContents ?? string.Empty;
            }

            try
            {
                
                // Safety Check: If plugin is disabled, do nothing
                if (SeasonalsPlugin.Instance?.Configuration.IsEnabled != true)
                {
                    return originalContents;
                }

                // Use StringBuilder for efficient modification
                var builder = new System.Text.StringBuilder(originalContents);

                // Inject Script if missing
                if (!originalContents.Contains("seasonals.js", StringComparison.Ordinal))
                {
                    var scriptIndex = originalContents.LastIndexOf(ScriptInjector.Marker, StringComparison.OrdinalIgnoreCase);
                    if (scriptIndex != -1)
                    {
                        builder.Insert(scriptIndex, ScriptInjector.ScriptTag + Environment.NewLine);
                    }
                }
                
                return builder.ToString();
            }
            catch
            {
                // On error, return original content to avoid breaking the UI
                return originalContents;
            }
        }
    }
}

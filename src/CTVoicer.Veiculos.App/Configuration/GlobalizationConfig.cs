using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;


namespace CTVoicer.Veiculos.App.Configuration
{
    public static class GlobalizationConfig
    {
        public static IApplicationBuilder UseGlobalizationConfig(this IApplicationBuilder app)
        {
            CultureInfo defaultCuture = new CultureInfo("pt-BR");

            RequestLocalizationOptions localizationOptions = new RequestLocalizationOptions()
            {
                DefaultRequestCulture = new RequestCulture(defaultCuture),
                SupportedCultures = new List<CultureInfo>() { defaultCuture },
                SupportedUICultures = new List<CultureInfo>() { defaultCuture }
            };

            app.UseRequestLocalization(localizationOptions);

            return app;
        }
    }
}

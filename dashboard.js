function wmo(code, i18n) {

    const l = i18n.weatherLabels;

    if (code === 0)                      return { label: l["0"],       iconKey: "sun" };
    if (code === 1 || code === 2)        return { label: l["1"],       iconKey: "partlyCloudy" };
    if (code === 3)                      return { label: l["3"],       iconKey: "cloud" };
    if (code >= 51 && code <= 67)        return { label: l["51"],      iconKey: "rain" };
    if (code >= 80)                      return { label: l["80"],      iconKey: "storm" };

    return { label: l["default"], iconKey: "cloud" };

}

window.render = function(data) {

    const i18n = data.i18n;
    const current = wmo(data.weather.code, i18n);

    document.getElementById("hello").innerHTML = i18n.hello.replace('\n', '<br>');

    document.getElementById("place").textContent = data.city;
    document.getElementById("date").textContent  = data.today;

    document.getElementById("heroIcon").innerHTML = ICONS[current.iconKey];
    document.getElementById("temp").textContent   = data.weather.temp + "°";

    document.getElementById("cond").textContent        = current.label;
    document.getElementById("subFeels").textContent    = i18n.feels + " " + data.weather.feels + "°";
    document.getElementById("subHumidity").textContent = i18n.humidity + " " + data.weather.humidity + "%";
    document.getElementById("subWind").textContent     = i18n.wind + " " + data.weather.wind + " " + i18n.windUnit;

    let forecastHtml = "";

    data.weather.forecast.forEach(f => {

        const icon = wmo(f.code, i18n);

        forecastHtml += `
<div class="fc">
    <div class="fc-day">${f.label}</div>
    <div class="fc-icon">${ICONS[icon.iconKey]}</div>
    <div class="fc-hi">${f.max}°</div>
    <div class="fc-lo">${f.min}°</div>
    <div class="fc-rain">
        <span class="drop">${ICONS.drop}</span>
        ${f.pop}%
    </div>
</div>`;

    });

    document.getElementById("forecast").innerHTML = forecastHtml;

    if (data.stay.occupied) {

        const days = data.stay.daysLeft;
        const dayWord      = days === 1 ? i18n.daySingular      : i18n.dayPlural;
        const remainingWord = days === 1 ? i18n.remainingSingular : i18n.remainingPlural;

        document.getElementById("stayIcon").innerHTML = ICONS.luggage;

        document.getElementById("stayMain").innerHTML =
            `<div class="stay-eyebrow">${i18n.stayEyebrow}</div>
             <div class="stay-days-row">
                 <span class="stay-days">${days} ${dayWord}</span>
                 <span class="stay-days-label">${remainingWord}</span>
             </div>`;

        document.getElementById("stayRight").innerHTML =
            `${i18n.checkout}<br><strong>${data.stay.checkout}</strong>`;

    } else {

        document.getElementById("stayIcon").innerHTML = ICONS.luggage;

        document.getElementById("stayMain").innerHTML =
            `<div class="stay-eyebrow">${i18n.vacantEyebrow}</div>`;

        const next = data.stay.daysUntilNext;
        if (next !== null && next !== undefined) {
            const dayWord = next === 1 ? i18n.daySingular : i18n.dayPlural;
            document.getElementById("stayRight").innerHTML =
                `${i18n.nextBooking}<br><strong>${i18n.inDays} ${next} ${dayWord}</strong>`;
        } else {
            document.getElementById("stayRight").style.display = "none";
        }

    }

    document.getElementById("wifiIcon").innerHTML  = ICONS.wifi;
    document.getElementById("wifiQr").innerHTML    = data.wifi.qr;
    document.getElementById("wifiTitle").textContent = i18n.wifiTitle;
    document.getElementById("wifiBody").textContent  = i18n.wifiBody;

    document.getElementById("whatsappIcon").innerHTML   = ICONS.whatsapp;
    document.getElementById("whatsappQr").innerHTML     = data.whatsapp.qr;
    document.getElementById("whatsappTitle").textContent = i18n.whatsappTitle;
    document.getElementById("whatsappBody").textContent  = i18n.whatsappBody;

    document.getElementById("updated").textContent = i18n.updatedAt + " " + data.updatedAt;

};

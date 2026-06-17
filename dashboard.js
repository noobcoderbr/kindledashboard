function wmo(code) {

    if (code === 0)
        return { label: "Céu limpo", iconKey: "sun" };

    if (code === 1 || code === 2)
        return { label: "Parcialmente nublado", iconKey: "partlyCloudy" };

    if (code === 3)
        return { label: "Nublado", iconKey: "cloud" };

    if (code >= 51 && code <= 67)
        return { label: "Chuva", iconKey: "rain" };

    if (code >= 80)
        return { label: "Tempestade", iconKey: "storm" };

    return { label: "Tempo variável", iconKey: "cloud" };

}

window.render = function(data) {

    const current = wmo(data.weather.code);

    document.getElementById("place").textContent = data.city;
    document.getElementById("date").textContent  = data.today;

    document.getElementById("heroIcon").innerHTML = ICONS[current.iconKey];
    document.getElementById("temp").textContent   = data.weather.temp + "°";

    document.getElementById("cond").textContent        = current.label;
    document.getElementById("subFeels").textContent    = "Sensação " + data.weather.feels + "°";
    document.getElementById("subHumidity").textContent = "Umidade " + data.weather.humidity + "%";
    document.getElementById("subWind").textContent     = "Vento " + data.weather.wind + " km/h";

    let forecastHtml = "";

    data.weather.forecast.forEach(f => {

        const icon = wmo(f.code);

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
        const plural = days === 1 ? "restante" : "restantes";

        document.getElementById("stayIcon").innerHTML = ICONS.luggage;

        document.getElementById("stayMain").innerHTML =
            `<div class="stay-eyebrow">SUA ESTADIA</div>
             <div class="stay-days-row">
                 <span class="stay-days">${days} ${days === 1 ? "dia" : "dias"}</span>
                 <span class="stay-days-label">${plural}</span>
             </div>`;

        document.getElementById("stayRight").innerHTML =
            `Check-out<br><strong>${data.stay.checkout}</strong>`;

    } else {

        document.getElementById("stayIcon").style.display = "none";
        document.getElementById("stayRight").style.display = "none";
        document.getElementById("stayMain").innerHTML =
            `<div class="stay-vacant-text">Apartamento disponível.</div>`;

    }

    document.getElementById("wifiIcon").innerHTML = ICONS.wifi;
    document.getElementById("wifiQr").innerHTML   = data.wifi.qr;

    document.getElementById("whatsappIcon").innerHTML = ICONS.whatsapp;
    document.getElementById("whatsappQr").innerHTML   = data.whatsapp.qr;

    document.getElementById("updated").textContent = "Atualizado às " + data.updatedAt;

};

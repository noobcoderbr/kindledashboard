function wmo(code) {

    if (code === 0)
        return {
            label: "Céu limpo",
            iconKey: "sun"
        };

    if (code === 1 || code === 2)
        return {
            label: "Parcialmente nublado",
            iconKey: "partlyCloudy"
        };

    if (code === 3)
        return {
            label: "Nublado",
            iconKey: "cloud"
        };

    if (code >= 51 && code <= 67)
        return {
            label: "Chuva",
            iconKey: "rain"
        };

    if (code >= 80)
        return {
            label: "Tempestade",
            iconKey: "storm"
        };

    return {
        label: "Tempo variável",
        iconKey: "cloud"
    };

}

window.render = function(data) {

    const current = wmo(
        data.weather.code
    );

    document.getElementById(
        "place"
    ).textContent =
        data.city;

    document.getElementById(
        "date"
    ).textContent =
        data.today;

    document.getElementById(
        "heroIcon"
    ).innerHTML =
        ICONS[current.iconKey];

    document.getElementById(
        "temp"
    ).textContent =
        data.weather.temp;

    document.getElementById(
        "cond"
    ).textContent =
        current.label;

    document.getElementById(
        "sub"
    ).innerHTML =
        "Sensação " +
        data.weather.feels +
        "° • Umidade " +
        data.weather.humidity +
        "% • Vento " +
        data.weather.wind +
        " km/h";

    let forecastHtml = "";

    data.weather.forecast.forEach(

        f => {

            const icon =
                wmo(
                    f.code
                );

            forecastHtml += `

<div class="fc">

    <div class="fc-day">

        ${f.label}

    </div>

    <div class="fc-icon">

        ${ICONS[icon.iconKey]}

    </div>

    <div class="fc-hi">

        ${f.max}°

    </div>

    <div class="fc-lo">

        ${f.min}°

    </div>

    <div class="fc-rain">

        <span class="drop">

            ${ICONS.drop}

        </span>

        ${f.pop}%

    </div>

</div>

`;

        }

    );

    document.getElementById(
        "forecast"
    ).innerHTML =
        forecastHtml;

    if (data.stay.occupied) {

        const days = data.stay.daysLeft;

        const daysLabel =
            days === 1
                ? "1 dia restante"
                : days + " dias restantes";

        document.getElementById(
            "stayIconLeft"
        ).innerHTML = ICONS.luggage;

        document.getElementById(
            "stayContent"
        ).innerHTML =

            `<div class="stay-days">

                ${daysLabel}

            </div>

            <div class="stay-checkout">

                Check-out ${data.stay.checkout}

            </div>

            <div class="stay-until">

                Até ${data.house.checkoutTime}

            </div>`;

    } else {

        document.getElementById(
            "stayGrid"
        ).classList.add(
            "stay-vacant"
        );

        document.getElementById(
            "stayContent"
        ).innerHTML =

            `<div class="stay-checkout">

                Apartamento disponível.

            </div>`;

    }

    document.getElementById("iconWifi").innerHTML   = ICONS.wifi;
    document.getElementById("iconLock").innerHTML   = ICONS.lock;
    document.getElementById("iconClock").innerHTML  = ICONS.clock;

    document.getElementById("wifi").textContent         = data.house.wifiName;
    document.getElementById("password").textContent     = data.house.wifiPassword;
    document.getElementById("checkoutTime").textContent = data.house.checkoutTime;

    document.getElementById("whatsappIcon").innerHTML = ICONS.whatsapp;

    if (data.whatsapp.hasPhone) {

        document.getElementById("whatsappQr").innerHTML = data.whatsapp.qr;

    } else {

        document.getElementById("whatsappGrid").style.display = "none";

    }

    document.getElementById(
        "updated"
    ).textContent =

        "Atualizado às " +
        data.updatedAt;

};

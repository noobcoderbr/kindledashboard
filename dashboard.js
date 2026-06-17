function wmo(code) {

    if (code === 0)
        return {
            label: "Céu limpo",
            icon: "☀"
        };

    if (code === 1 || code === 2)
        return {
            label: "Parcialmente nublado",
            icon: "☁"
        };

    if (code === 3)
        return {
            label: "Nublado",
            icon: "☁"
        };

    if (code >= 51 && code <= 67)
        return {
            label: "Chuva",
            icon: "🌧"
        };

    if (code >= 80)
        return {
            label: "Tempestade",
            icon: "⛈"
        };

    return {
        label: "Tempo variável",
        icon: "☁"
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
        "° • " +
        data.weather.rainChance +
        "% de chuva • Vento " +
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

        ${icon.icon}

    </div>

    <div class="fc-hi">

        ${f.max}°

    </div>

    <div class="fc-lo">

        ${f.min}°

    </div>

    <div class="fc-rain">

        <span class="drop">

            💧

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

    if (
        data.stay.occupied
    ) {

        document.getElementById(
            "stayLine"
        ).innerHTML =

            `
            Check-out

            <br><br>

            <b>

            ${data.stay.checkout}

            </b>

            <br><br>

            Até ${data.house.checkoutTime}
            `;

    }

    else {

        document.getElementById(
            "stayLine"
        ).innerHTML =

            data.house.welcome;

    }

    document.getElementById(
        "wifi"
    ).textContent =

        data.house.wifiName;

    document.getElementById(
        "password"
    ).textContent =

        data.house.wifiPassword;

    document.getElementById(
        "checkoutTime"
    ).textContent =

        data.house.checkoutTime;

    document.getElementById(
        "updated"
    ).textContent =

        "Atualizado às " +
        data.updatedAt;

};

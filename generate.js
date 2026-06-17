const fs = require('fs');

function traduzClima(code) {
    const mapa = {
        0: '☀️ Ensolarado',
        1: '🌤️ Predominantemente ensolarado',
        2: '⛅ Parcialmente nublado',
        3: '☁️ Nublado',
        45: '🌫️ Neblina',
        48: '🌫️ Neblina',
        51: '🌦️ Garoa',
        61: '🌧️ Chuva',
        63: '🌧️ Chuva moderada',
        65: '🌧️ Chuva forte',
        71: '❄️ Neve',
        80: '🌦️ Pancadas de chuva',
        95: '⛈️ Tempestade'
    };

    return mapa[code] || '🌤️ Tempo variável';
}

function diaSemana(data) {
    const dias = [
        'DOM',
        'SEG',
        'TER',
        'QUA',
        'QUI',
        'SEX',
        'SAB'
    ];

    return dias[new Date(data).getDay()];
}

async function run() {

    const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-22.95&longitude=-43.18&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=4'
    );

    const data = await response.json();

    const temperaturaAtual =
        Math.round(data.current.temperature_2m);

    const clima =
        traduzClima(data.current.weather_code);

    const maxHoje =
        Math.round(data.daily.temperature_2m_max[0]);

    const minHoje =
        Math.round(data.daily.temperature_2m_min[0]);

    let proximosDias = '';

    for (let i = 1; i <= 3; i++) {

        const dia =
            diaSemana(data.daily.time[i]);

        const max =
            Math.round(data.daily.temperature_2m_max[i]);

        const min =
            Math.round(data.daily.temperature_2m_min[i]);

        proximosDias += `
            <li>
                ${dia}: ${max}° / ${min}°
            </li>
        `;
    }

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
<meta charset="UTF-8">
<title>Kindle Concierge</title>
</head>

<body>

<h1>Olá, hóspede.</h1>

<h2>Clima agora</h2>

<p><strong>${temperaturaAtual}°C</strong></p>

<p>${clima}</p>

<p>
Máxima: ${maxHoje}°C
<br>
Mínima: ${minHoje}°C
</p>

<h2>Próximos 3 dias</h2>

<ul>
${proximosDias}
</ul>

</body>

</html>
`;

    fs.writeFileSync('index.html', html);

    console.log('Página criada.');
}

run();

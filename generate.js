const fs = require('fs');

async function run() {

    const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-22.95&longitude=-43.18&current=temperature_2m'
    );

    const data = await response.json();

    const temperatura = Math.round(
        data.current.temperature_2m
    );

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

        <p>${temperatura}°C</p>

    </body>
    </html>
    `;

    fs.writeFileSync('index.html', html);

    console.log('Página criada');
}

run();

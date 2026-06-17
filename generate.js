const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {

    const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-22.95&longitude=-43.18&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=4' 
    );

    const data = await response.json();

    const temperatura =
        Math.round(data.current.temperature_2m);

    const maxHoje =
        Math.round(
            data.daily.temperature_2m_max[0]
    );

    const minHoje =
        Math.round(
            data.daily.temperature_2m_min[0]
    );

    let clima = 'Tempo variável';

    if (data.current.weather_code === 0) {
        clima = 'Ensolarado';
    }

    let html =
        fs.readFileSync(
            'template.html',
            'utf8'
        );

    html =
        html.replace(
            '{{TEMP}}',
            `${temperatura}°`
        );

    html =
        html.replace(
            '{{CONDITION}}',
            clima
        );

    fs.writeFileSync(
        'index.html',
        html
    );

    const browser =
        await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });

    const page =
        await browser.newPage();

    await page.setViewport({
        width: 1072,
        height: 1448
    });

    await page.goto(
        'file://' +
        process.cwd() +
        '/index.html'
    );

    await page.screenshot({
        path: 'concierge.png'
    });

    await browser.close();

    console.log('PNG criado');
}

run();

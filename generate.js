const fs = require('fs');
const puppeteer = require('puppeteer');

function diaSemana(data) {

    const dias = [
        'DOMINGO',
        'SEGUNDA-FEIRA',
        'TERÇA-FEIRA',
        'QUARTA-FEIRA',
        'QUINTA-FEIRA',
        'SEXTA-FEIRA',
        'SÁBADO'
    ];

    return dias[
        new Date(data).getDay()
    ];
}

function traduzClima(code) {

    if (code === 0) {
        return 'Ensolarado';
    }

    if (code === 1 || code === 2) {
        return 'Parcialmente nublado';
    }

    if (code === 3) {
        return 'Nublado';
    }

    if (code >= 51 && code <= 67) {
        return 'Chuva';
    }

    if (code >= 80 && code <= 99) {
        return 'Tempestade';
    }

    return 'Tempo variável';
}

async function run() {

    const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-22.95&longitude=-43.18&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=4'
    );

    const data = await response.json();

    const temperatura =
        Math.round(
            data.current.temperature_2m
        );

    const maxHoje =
        Math.round(
            data.daily.temperature_2m_max[0]
        );

    const minHoje =
        Math.round(
            data.daily.temperature_2m_min[0]
        );

    const clima =
        traduzClima(
            data.current.weather_code
        );

    const hoje = new Date();

    const dataAtual =
        hoje.toLocaleDateString(
            'pt-BR',
            {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
        );

    let forecastHtml = '';

    for (let i = 1; i <= 3; i++) {

        const dia =
            ['DOM','SEG','TER','QUA','QUI','SEX','SAB']
            [
                new Date(
                    data.daily.time[i]
                ).getDay()
            ];

        const max =
            Math.round(
                data.daily.temperature_2m_max[i]
            );

        const min =
            Math.round(
                data.daily.temperature_2m_min[i]
            );

        forecastHtml += `
            <div class="forecast-row">
                ${dia} — ${max}° / ${min}°
            </div>
        `;
    }

    let html =
        fs.readFileSync(
            'template.html',
            'utf8'
        );

    html =
        html.replace(
            '{{DAY}}',
            diaSemana(
                new Date()
            )
        );

    html =
        html.replace(
            '{{DATE}}',
            dataAtual
        );

    html =
        html.replace(
            '{{MESSAGE}}',
            `Hoje o tempo está ${clima.toLowerCase()}.`
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

    html =
        html.replace(
            '{{MAX}}',
            maxHoje
        );

    html =
        html.replace(
            '{{MIN}}',
            minHoje
        );

    html =
        html.replace(
            '{{FORECAST}}',
            forecastHtml
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

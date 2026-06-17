const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const ical = require('node-ical');

async function run() {

    const phone = process.env.WHATSAPP_PHONE || '';
    const whatsappTarget = phone ? 'https://wa.me/' + phone : 'https://wa.me';
    const whatsappQr = await QRCode.toString(
        whatsappTarget,
        { type: 'svg', margin: 0, color: { dark: '#111', light: '#fff' } }
    );

    const wifiSsid = process.env.WIFI_SSID || 'APE_BOTAFOGO';
    const wifiPass = process.env.WIFI_PASSWORD || 'rio2026';
    const wifiQr = await QRCode.toString(
        `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};;`,
        { type: 'svg', margin: 0, color: { dark: '#111', light: '#fff' } }
    );


    const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-22.95&longitude=-43.18&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=4'
    );

    const meteo = await response.json();

    const now = new Date();

    const data = {

        city: "Botafogo, Rio de Janeiro",

        today: now.toLocaleDateString(
            'pt-BR',
            {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            }
        ),

        updatedAt: now.toLocaleTimeString(
            'pt-BR',
            {
                hour: '2-digit',
                minute: '2-digit'
            }
        ),

        house: {

            welcome: "Bem-vindo ao seu apê no Rio",

            wifiName: "APE_BOTAFOGO",

            wifiPassword: "rio2026",

            checkoutTime: "11h"

        },

        stay: await (async () => {

            const icalUrl = process.env.AIRBNB_ICAL_URL;

            if (!icalUrl) {
                return { occupied: false, checkout: null, daysLeft: null };
            }

            let events;
            try {
                events = await ical.async.fromURL(icalUrl);
            } catch (e) {
                console.error('iCal fetch failed:', e.message);
                return { occupied: false, checkout: null, daysLeft: null };
            }

            const today = new Date(now);
            today.setHours(0, 0, 0, 0);

            let current = null;

            for (const ev of Object.values(events)) {
                if (ev.type !== 'VEVENT') continue;
                const start = new Date(ev.start);
                const end   = new Date(ev.end);
                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);
                if (start <= today && today < end) {
                    current = ev;
                    break;
                }
            }

            if (!current) {
                return { occupied: false, checkout: null, daysLeft: null };
            }

            const checkoutDate = new Date(current.end);
            checkoutDate.setHours(0, 0, 0, 0);

            const msPerDay = 1000 * 60 * 60 * 24;
            const daysLeft = Math.ceil((checkoutDate - today) / msPerDay);

            const checkoutFormatted = checkoutDate.toLocaleDateString('pt-BR', {
                weekday: 'long', day: 'numeric', month: 'long'
            });

            return { occupied: true, checkout: checkoutFormatted, daysLeft };

        })(),

        whatsapp: {
            qr: whatsappQr
        },

        wifi: {
            qr: wifiQr,
            name: wifiSsid
        },

        weather: {

            temp:
                Math.round(
                    meteo.current.temperature_2m
                ),

            rainChance:
                meteo.daily.precipitation_probability_max[0],
            
            feels:
                Math.round(
                    meteo.current.apparent_temperature
                ),

            humidity:
                meteo.current.relative_humidity_2m,

            wind:
                Math.round(
                    meteo.current.wind_speed_10m
                ),

            code:
                meteo.current.weather_code,

            forecast: []

        }

    };

    const labels = ['Hoje', 'Qui', 'Sex', 'Sab'];

    for (let i = 0; i < 4; i++) {

        data.weather.forecast.push({

            label: labels[i],

            max:
                Math.round(
                    meteo.daily.temperature_2m_max[i]
                ),

            min:
                Math.round(
                    meteo.daily.temperature_2m_min[i]
                ),

            code:
                meteo.daily.weather_code[i],

            pop:
                meteo.daily.precipitation_probability_max[i]

        });

    }

    const browser =
        await puppeteer.launch({

            headless: true,

            args: [

                '--no-sandbox',

                '--allow-file-access-from-files'

            ]

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
        '/template.html',

        {

            waitUntil: 'networkidle0'

        }

    );

    await page.evaluate(() => document.fonts.ready);

    await page.evaluate(

        (data) => {

            window.render(data);

        },

        data

    );

    await page.screenshot({

        path: 'concierge.png'

    });

    await browser.close();

    console.log('PNG criado');

}

run();

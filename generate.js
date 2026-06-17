const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

async function run() {

    const phone = process.env.WHATSAPP_PHONE || '';
    const whatsappQr = phone
        ? await QRCode.toString(
            'https://wa.me/' + phone,
            { type: 'svg', margin: 0, color: { dark: '#111', light: '#fff' } }
          )
        : '';


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

        stay: (() => {

            const occupied = true;

            if (!occupied) {

                return {
                    occupied: false,
                    checkout: null,
                    daysLeft: null,
                    nextCheckIn: null
                };

            }

            const checkoutDate = new Date(now);
            checkoutDate.setDate(now.getDate() + 1);

            const msPerDay = 1000 * 60 * 60 * 24;
            const daysLeft = Math.ceil(
                (checkoutDate - now) / msPerDay
            );

            const checkoutFormatted =
                checkoutDate.toLocaleDateString(
                    'pt-BR',
                    {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                    }
                );

            return {
                occupied: true,
                checkout: checkoutFormatted,
                daysLeft,
                nextCheckIn: null
            };

        })(),

        whatsapp: {
            qr: whatsappQr,
            hasPhone: !!phone
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

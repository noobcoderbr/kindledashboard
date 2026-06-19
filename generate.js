const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const ical = require('node-ical');

const locales = {
    pt: require('./locales/pt.json'),
    en: require('./locales/en.json')
};

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

    // midnight of today in BRT, as UTC timestamp (matches date-only iCal events)
    const brtDateStr = now.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
    const today = new Date(brtDateStr + 'T00:00:00Z');

    const stay = await (async () => {

        const icalUrl = process.env.AIRBNB_ICAL_URL;

        if (!icalUrl) {
            return { occupied: false, checkout: null, daysLeft: null, daysUntilNext: null };
        }

        let events;
        try {
            events = await ical.async.fromURL(icalUrl);
        } catch (e) {
            console.error('iCal fetch failed:', e.message);
            return { occupied: false, checkout: null, daysLeft: null, daysUntilNext: null };
        }

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

        const msPerDay = 1000 * 60 * 60 * 24;

        if (!current) {

            const allEvents = Object.values(events).filter(ev => ev.type === 'VEVENT');
            let nextStart = null;
            for (const ev of allEvents) {
                const start = new Date(ev.start);
                start.setHours(0, 0, 0, 0);
                if (start > today) {
                    if (!nextStart || start < nextStart) nextStart = start;
                }
            }

            const daysUntilNext = nextStart
                ? Math.ceil((nextStart - today) / msPerDay)
                : null;

            return { occupied: false, checkout: null, daysLeft: null, daysUntilNext };
        }

        const checkoutDate = new Date(current.end);
        checkoutDate.setHours(0, 0, 0, 0);
        const daysLeft = Math.ceil((checkoutDate - today) / msPerDay);

        // checkout date formatted per locale — done per language below
        return { occupied: true, checkoutDate, daysLeft };

    })();

    const weather = {

        temp:     Math.round(meteo.current.temperature_2m),
        feels:    Math.round(meteo.current.apparent_temperature),
        humidity: meteo.current.relative_humidity_2m,
        wind:     Math.round(meteo.current.wind_speed_10m),
        code:     meteo.current.weather_code,
        forecast: []

    };

    for (let i = 0; i < 4; i++) {
        weather.forecast.push({
            max:  Math.round(meteo.daily.temperature_2m_max[i]),
            min:  Math.round(meteo.daily.temperature_2m_min[i]),
            code: meteo.daily.weather_code[i],
            pop:  meteo.daily.precipitation_probability_max[i]
        });
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--allow-file-access-from-files']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1072, height: 1448 });

    await page.goto('file://' + process.cwd() + '/template.html', { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    for (const [lang, locale] of Object.entries(locales)) {

        // format dates in this locale's language
        const todayFormatted = now.toLocaleDateString(locale.dateLocale, {
            weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Sao_Paulo'
        });

        const updatedAtFormatted = now.toLocaleTimeString(locale.dateLocale, {
            hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo'
        });

        // format checkout date in this locale
        let stayLocalized = { ...stay };
        if (stay.occupied && stay.checkoutDate) {
            stayLocalized.checkout = stay.checkoutDate.toLocaleDateString(locale.dateLocale, {
                weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Sao_Paulo'
            });
        }

        // generate forecast labels in this locale
        const forecastWithLabels = weather.forecast.map((f, i) => ({
            ...f,
            label: i === 0
                ? locale.today
                : (() => {
                    const d = new Date(now);
                    d.setDate(d.getDate() + i);
                    return d.toLocaleDateString(locale.dateLocale, {
                        weekday: 'short', timeZone: 'America/Sao_Paulo'
                    }).replace('.', '').toUpperCase();
                })()
        }));

        const data = {
            city:      "Botafogo, Rio de Janeiro",
            today:     todayFormatted,
            updatedAt: updatedAtFormatted,
            stay:      stayLocalized,
            whatsapp:  { qr: whatsappQr },
            wifi:      { qr: wifiQr },
            weather:   { ...weather, forecast: forecastWithLabels },
            i18n:      locale
        };

        await page.evaluate((data) => window.render(data), data);

        await page.screenshot({ path: `concierge-${lang}.png` });

        console.log(`concierge-${lang}.png criado`);
    }

    await browser.close();

}

run();

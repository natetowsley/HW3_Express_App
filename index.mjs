import express from 'express';
import 'dotenv/config';

const cities = (await import('cities')).default;
const app = express();
const KEY = process.env.OPENWEATHER_KEY; // Looked into this to hide my API key

app.set("view engine", "ejs");
app.use(express.static("public"));

// root route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// weather route
app.get('/weather', async(req, res) => {
    let zip = req.query.zip;
    let city = cities.zip_lookup(zip);
    if (city == undefined) {
        res.redirect(`/invalid`); // stack overflow
    }
    console.log(city);
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely,alerts,hourly&units=imperial&appid=${KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.current.weather);
    res.render('weather.ejs', {city, data});
});

app.get('/invalid', (req, res) => {
    res.render('invalid.ejs');
});

app.get('/majorCities', async(req, res) => {
    let majorZips = ["90005", "10001", "94102", "77030", "75220", "33134", "19111", "02222", "98101"];
    let names = [];
    let forecasts = [];
    for (let i of majorZips) {
        let city = cities.zip_lookup(i);

        if (!city) {
            console.log(`Failed to find a city for ${zip}`);
            continue;
        }
        names.push(city);
    }

    for (let city of names) {
       let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=current,minutely,alerts,hourly&units=imperial&appid=${KEY}`;
        let response = await fetch(url);
        let data = await response.json();
        forecasts.push(data); 
    }

    res.render('majorCities.ejs', {names, forecasts});
});

// start web server
app.listen(3000, () => {
    console.log('server started');
});
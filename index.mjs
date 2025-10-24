import express from 'express';

const KEY = "1615e43df7fb9f0e01249749512bfd86";
const cities = (await import('cities')).default;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// root route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// weather route
app.get('/weather', async(req, res) => {
    let zip = req.query.zip;
    console.log(zip);
    let city = cities.zip_lookup(zip);
    if (city == undefined) {
        res.redirect(`/invalid`); // stack overflow
    }
    console.log(city);
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely,alerts,hourly&units=imperial&appid=${KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    console.log(data.current.weather);
    res.render('weather.ejs', {city, data});
});

app.get('/invalid', (req, res) => {
    res.render('invalid.ejs');
});

// start web server
app.listen(3000, () => {
    console.log('server started');
});
import express from 'express';

const KEY = "1615e43df7fb9f0e01249749512bfd86"
const cities = (await import('cities')).default;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// root route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/weather', async(req, res) => {
    let zip = req.query.zip;
    let city = cities.zip_lookup(zip);
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${KEY}`;
    res.render('weather.ejs', {city, zip});
    console.log(city.city);
    console.log(zip);
});

// start web server
app.listen(3000, () => {
    console.log('server started');
});
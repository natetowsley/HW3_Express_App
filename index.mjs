import express from 'express';

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

    res.render('weather.ejs', {city, zip});
    console.log(city.city);
    console.log(zip);
});

// start web server
app.listen(3000, () => {
    console.log('server started');
});
import express from 'express';

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// root route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// start web server
app.listen(3000, () => {
    console.log('server started');
});
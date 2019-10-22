const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const port = process.env.PORT || 3000

const app = express();

const staticDirectory = path.join(__dirname, '../public'); 
const viewDirectory = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

//static directory where the user will hav access
app.use(express.static(staticDirectory));
hbs.registerPartials(partials);

//Set up the view 
app.set('view engine','hbs');
app.set('views', viewDirectory);

app.get('', (req,res) => {
    res.render('index', {title: "Weather", name: "Rafael"});
});

app.get('/about', (req, res) => {
    res.render('about', {title: "About", name: "Rafael"});
});

app.get('/help', (req, res) => {
    res.render('help', {title: "Help", name: "Rafael"});
});

/* app.get('/products', (req, res) => {
    console.log(req);
    res.send({
        products: []
    })
});
 */
app.get('/weather', (req,res) => {
    if(!req.query.address)
        return res.send({error: "Any arguments were provided"});

     geocode(req.query.address, (error, geoLocation) => {
        if(error)
            return res.send({error: error});
        
        weather(geoLocation, (erro, forecast) => {
            if(erro)
                return res.send({error: erro});
                
            const {location} = geoLocation;
            return res.send({forecast: forecast, location: location});    
        }) 
    });
});

app.listen(port);
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
console.log(publicDirectoryPath)
// app.use(express.static(publicDirectoryPath))


// app.get('', (req, res) => {
//     res.send('Hello express')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: '50 degree',
//         location: 'Noida'
//     })
// })

//With hbs
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

const viewsDirectoryPath = path.join(__dirname, '../templates/views')
console.log("viewsDirectoryPath", viewsDirectoryPath)
app.set('views', viewsDirectoryPath)

const partialsPath = path.join(__dirname, '../templates/partials')
console.log("partialsPath", partialsPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sandeep Kharbanda'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sandeep Kharbanda'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Welcome to help page',
        name: 'Sandeep Kharbanda'
    })
})

app.get('/help/*', (req, res) => {
    //res.send('<h1>Help article not found</h1>')
    res.render('page404', {
        title: '404 error',
        message: 'Help article not found',
        name: 'Sandeep Kharbanda'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
        if(error){
            return res.send({
                error: error.message
            })
        }
        else {
            forecast(latitude, longitude, (forecastError, {forecast, location}) => {
                if(forecastError){
                    return res.send({
                        error: error.message
                    })
                }
                else {
                    return res.send({
                        forecast,
                        location,
                        address: req.query.address
                    })
                }
            })
        }

    })
    
})

app.get('*', (req, res) => {
    // res.send('<h1>404 error</h1>')
    res.render('page404', {
        title: '404 error',
        message: 'Page not found',
        name: 'Sandeep Kharbanda'
    })
})



app.listen(3000, () => {
    console.log('Server is up o port 3000')
})
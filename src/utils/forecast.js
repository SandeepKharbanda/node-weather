const fetch = require('node-fetch');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=30460eb61a5a2149136442e2831a57b4&query=' + latitude + ',' + longitude
    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log('JS', json)
            const current = json.current
            const location = json.location

            const{
                temperature,
                precip
            } = current

            const { 
                name,
                country
            } = location

            const forecast ='It is currently '+ temperature + ' degrees out. There is ' + precip + '% chance of rain'
            const _location = name + ' , ' + country
            const data = {
                forecast,
                location: _location
            }

            callback(undefined, data)
        })
        .catch(err => {
            callback(err, undefined)
        })
}

module.exports = forecast
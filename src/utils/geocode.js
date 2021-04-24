const fetch = require('node-fetch');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FuZGVlcC1raGFyYmFuZGEiLCJhIjoiY2puYzRkd3g2MGU0czNsbzd4dGZpbXd2dCJ9.SlWfoJjUKk-tGSYl1vjh5w&limit=1'
    fetch(url)
        .then(res => res.json())
        .then(json => {
            const {
                features
            } = json
            console.log(json)
            if (features.length > 0) {
                const center = features[0].center
                console.log('Longitude ' + center[0] + ' Latitude ' + center[1])
                const data = {
                    latitude: center[1],
                    longitude: center[0]
                }
                callback(undefined, data)
            }
            else {
                const err = new Error('Unable to find location')
                callback(err, undefined)
                console.log('Unable to find location')
            }
        })
        .catch(err => {
            callback(err, undefined)
            console.log('Unable to connect with weather service!')
        })
}

module.exports = geoCode
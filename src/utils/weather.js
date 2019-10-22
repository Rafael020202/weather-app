const request = require('request');

const weather = (geocode, callback) => {
    const {latitude, longitude} = geocode;
    const url = `https://api.darksky.net/forecast/f051b7dd8a10bec01f7fc89dd61f0d27/${latitude},${longitude}?units=auto&lang=pt`

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connet with the service", undefined);
        } else if(response.body.error){
            callback("Unable to find the lacation", undefined);
        } else{
            const {daily, currently} = response.body;
            callback(undefined, {
                daily: daily.data[0].summary,
                temperature: currently.temperature,
                rainProbability: currently.precipProbability
            });
        }
    });
}

module.exports = weather;
const request = require('request');

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoicmFmYWVsY2hvY29sYXRlbHkiLCJhIjoiY2sxeHVlYzA0MGdqcDNobnRzZHg2c2o3byJ9.Hi7RRHsqoZfEsc0skQndEg&limit=1`;
    
    request({url:url, json:true}, (error, response)=>{   
        
        if(error) {
            callback("Unable to connect with the service", undefined);
        } else if(response.body.features.length === 0) {
            callback("Unable to find the city", undefined);
        } else {
            const {features} = response.body;
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
}

module.exports = geocode;
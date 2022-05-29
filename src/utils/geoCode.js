const request  = require('request')

const geoCode = (address, callback) => {
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmFsYmVyeHoyMSIsImEiOiJjbDNpenJzd24wMXYyM2JwcXJxN2JvdWpwIn0.BTsHyAe3QydyF9tjFskCVA'
    
    request({url: urlGeo, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }else{
            
            callback(undefined,{
                lati: response.body.features[0].center[0],
                longi: response.body.features[0].center[1],
                loca: response.body.features[0].place_name         
            })    
        }
    })
}
const forecast = (log,lat, callback) => {
    const urlCast = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&'+'lon='+log+'&appid=a90b216b02e924aa34ffe8e51a0501f4'

    request({url:urlCast,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.length === 0){
            callback('Coordinate is wrong',undefined)
        }else{
            callback(undefined,{
               main:response.body.weather[0].main,
               descri:response.body.weather[0].description

            })
        }
    })
}

module.exports = {
    geoCode:geoCode,
    forecast:forecast
}
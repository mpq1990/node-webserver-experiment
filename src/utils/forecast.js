const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=${latitude},${longitude}&units=f`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
         } else if (body.error){
            callback('Unable to find location', undefined)
         } else {
             callback(undefined, {
                placeName: body.location.name,
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelsLike :  body.current.feelslike,
                localtime: body.location.localtime,
                timezone: body.location.timezone_id,
                icons: body.current.weather_icons
            })
        }
    })
}

module.exports = { forecast }
var bodyParser = require("body-parser");
var path = require("path");
var weather = require("weather-js");

module.exports = function (app) {
  // ----- INDEX.HTML ROUTE ----- //
  app.get('/', function(req, res) {
    res.sendFile('/index.html');
  });

  // ----- LOCAL-WEATHER API CALL ----- //
  app.post('/api/location', function(req, res) {
    var location = req.body.location;
    weather.find({ search: location, degreeType: 'F' },
      function (err, result) {
        if(err){ throw err };
        var direction = result[0].current.winddisplay.toString();
        direction = direction.split(" ");
        var weatherData = {
          current: {
            name: result[0].location.name,
            todaysdate: result[0].current.date,
            temp: result[0].current.temperature,
            day: result[0].current.day,
            high: result[0].forecast[1].high,
            low: result[0].forecast[1].low,
            skytext: result[0].current.skytext,
            feelslike: result[0].current.feelslike,
            windDirection: direction[2],
            windSpeed: result[0].current.windspeed,
            rain: result[0].forecast[1].precip,
          },
          forecast1: {
            high: result[0].forecast[2].high,
            low: result[0].forecast[2].low,
            skytext: result[0].forecast[2].skytextday,
            date: result[0].forecast[2].date,
            day: result[0].forecast[2].day,
            rain: result[0].forecast[2].precip,
          },
          forecast2: {
            high: result[0].forecast[3].high,
            low: result[0].forecast[3].low,
            skytext: result[0].forecast[3].skytextday,
            date: result[0].forecast[3].date,
            day: result[0].forecast[3].day,
            rain: result[0].forecast[3].precip,
          },
          forecast3: {
            high: result[0].forecast[4].high,
            low: result[0].forecast[4].low,
            skytext: result[0].forecast[4].skytextday,
            date: result[0].forecast[4].date,
            day: result[0].forecast[4].day,
            rain: result[0].forecast[4].precip,
          }
        };
        // console.log(JSON.stringify(weatherData, null, 2));
        return weatherData;
      }
    )
  });
}
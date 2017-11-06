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
                // console.log(JSON.stringify(result, null, 2));
                for (var key in result) {
                    console.log(result[key].current.observationpoint);
                }
            }
        )
    });
}
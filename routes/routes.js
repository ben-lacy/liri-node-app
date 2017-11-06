var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");
var apitoken = "";

module.exports = function (app) {
    // ----- INDEX.HTML ROUTE ----- //
    app.get('/', function(req, res) {
        res.sendFile('/index.html');
    });

    // ----- LOCAL-WEATHER API CALL ----- //
    app.post('/api/choices', function(req, res) {
        var zip = req.body;
        

        
        var triviaRequestURL = "https://opentdb.com/api.php?amount=10&category=" + cat + "&token=" + apitoken;
        request(triviaRequestURL, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var obj = JSON.parse(body);
                res.json(obj.results);
            }
        });
    });
}
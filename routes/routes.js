var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");
var apitoken = "";

module.exports = function (app) {
    // ----- INDEX.HTML ROUTE ----- //
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/index.html'));
    });

    // ----- OPEN TRIVIA DB API CALL ----- //
    app.post('/api/choices', function(req, res) {
        var choices = req.body;
        var cat = choices.cat;
        
        if (!apitoken) {        // If no token has been generated, get one
            var tokenRequestURL = "https://opentdb.com/api_token.php?command=request";
            request(tokenRequestURL, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    var obj = JSON.parse(body);
                    apitoken = obj.token;
                }
            });
        }
        
        var triviaRequestURL = "https://opentdb.com/api.php?amount=10&category=" + cat + "&token=" + apitoken;
        request(triviaRequestURL, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var obj = JSON.parse(body);
                res.json(obj.results);
            }
        });
    });
}
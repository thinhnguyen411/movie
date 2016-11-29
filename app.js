var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("search");
});

app.get("/results", function (req, res) {
    var query = req.query.search;

    var url = "http://www.omdbapi.com/?s=" + query;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {
                data: data
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
//xac dinh thu muc de dat server la public

app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static('public'));
//start sever takes 2 argument:port and function when it done
app.listen(PORT, function() {
    console.log('Express sever is up on port ' + PORT);
});
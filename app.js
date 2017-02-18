var express = require('express');
var app = express();
var path = require("path");
var request = require("request");

app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/index.html'));
});

app.get('/birds', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/birds.html'));
});

app.get('/team', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/team.html'));
});

app.get('/competitions', function (req, res) {
  request({
    url: "http://api.football-data.org/v1/competitions/?season=2016",
    headers: {'X-Auth-Token': '88c3ec8611944ce2a1a7bdc430665def'},
    json: true
  }, function (error, response, body) {
    var competitions = JSON.parse(body);
    for(var key in competitions){
        if(currentObject.hasOwnProperty(key)) {
          console.info(key + ': ' + currentObject[key]);
        }
   }
  })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

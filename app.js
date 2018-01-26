/* Load NodeJS Modules */
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('public'));

/* Load Local Modules */
var sl = require('./modules/serviceLayer');
var slSession = null;
var output = {};

sl.Connect(function (error, resp) {
  if (error) {
    console.error("Can't Connect to Service Layer");
    console.error(error);
    return; // Abort Execution
  } else{
    slSession = resp; 
  }
});

app.get('/GetItems', function (req, res) {
  var options = { headers: { 'Cookie': slSession.cookie } };

  sl.GetItems(options, function (error, resp) {
    if (error) {
      console.error("Can't get Items from Service Layer - "+error);
      res.send(error);
    }else {
      res.setHeader('Content-Type', 'application/json');
      res.send(resp);
    }
  });
});

app.get('/GetEnv', function (req, res) {
  output.sl = slSession
  res.send(output);
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
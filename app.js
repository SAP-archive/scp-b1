/* Load NodeJS Modules */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));

//To Support body on post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Load Local Modules */
var sl = require('./modules/serviceLayer');
var db = require('./modules/persist');
var slSession = null;
var output = {};

//First Thing, coonect to SL and store a SessionID
sl.Connect(function (error, resp) {
  if (error) {
    console.error("Can't Connect to Service Layer");
    console.error(error);
    return; // Abort Execution
  } else {
    slSession = resp;
  }
});

db.Connect(function (error) {
  if (error) {
    console.error("Can't Connect to CF Database");
    console.error(error);
  }
})

//Endpoint to POST items to Service Layer
app.post('/InsertItem', function (req, res) {
  db.Insert(req.body, function (error, resp) {
    res.redirect('views/index.html');
  });
});

//Endpoint to POST items to Service Layer
app.get('/SelectItems', function (req, res) {
  db.Select(function (error, resp) {
    if (error) {
      console.log('Cant Select rows')
      console.log(error);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(resp);
    }
  });
});


//EndPoint To retrieve Items from Service Layer
app.get('/GetItems', function (req, res) {
  var options = { headers: { 'Cookie': slSession.cookie } };

  sl.GetItems(options, function (error, resp) {
    if (error) {
      console.error("Can't get Items from Service Layer - " + error);
      res.send(error);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(resp);
    }
  });
});

//EndPoint to Retrieve Environment Variables
app.get('/GetEnv', function (req, res) {
  output.sl = slSession
  output.instance = 0;
  output.instance = (process.env.CF_INSTANCE_INDEX * 1) + 1
  output.env = process.env.HOME;
  res.send(output);
});

//Synchronize Local DB with B1 SL
app.post('/Synchronize', function (req, res) {
  var options = { headers: { 'Cookie': slSession.cookie } };

  db.Select(function (error, resp) {
    if (error) {
      console.log('Cant Select rows')
      console.log(error);
    } else {
      for (var i = 0; i < resp.length; i++) {
        var body = { ItemCode: resp.code, ItemName: resp.name }
        console.log("Sync Item "+ resp.code)
        sl.PostItems(options, body, function (err, resp) {
          if (!err) {
            db.Update(body.ItemCode, function (err, resp) {
              if (!err) {
                console.log("Item Synchronized");
              } else {
                console.error(err);
              }
            })
          }
        })
      }
    }
  });
});


// Root path to retrieve Index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
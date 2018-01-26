var express = require('express');
var app = express();

var sl = require('./modules/ServiceLayer'); 
var slSession = null;
var output = null;

sl.Connect(function(error, resp){
  if (error){
    console.error("Can't Connect to Service Layer");
    console.error(error);
    return; // Abort Execution
  } 
  else{
      slSession = resp;
      slSession = slSession;
  }
});

app.get('/GetItems', function (req, res) {
  var options ={headers: {'Cookie': slSession.cookie}};   

  sl.GetItems(options, function(error, resp){
    if (error){
      console.error("Can't get Items from Service Layer");
      console.error(error);
      return; // Abort Execution
    } 
    else{
      res.send(resp);
    }
  });
});




app.get('/', function (req, res) {
  output = 'Hello B1 Summit!! \n'
  if (slSession)
    output += JSON.stringify(slSession);
 
  res.send(output);
});

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
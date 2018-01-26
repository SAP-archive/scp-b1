var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello B1 Summit!! ');
});

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
const PORT = process.env.PORT || 8080;

const express = require('express');
//var firebase = require("firebase"); 
const app = express();

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html');
  res.status(200).send("hi there");
});

module.exports = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});



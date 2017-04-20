const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});



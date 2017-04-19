const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
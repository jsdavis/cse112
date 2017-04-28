const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app.listen(PORT, () => {
  app.emit('listening', null);
  console.log('Example app listening on port ' + PORT);
});



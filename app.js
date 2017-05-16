const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./server/config/config');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

/*
 *  Connect to MongoDB
 */
mongoose.connect(config.mongoLabUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongodb');
});

app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Connect to all of the api routes
require('./server/routes')(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;

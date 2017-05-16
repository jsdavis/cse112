const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const config = require('./server/config/config');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

/*
 *  Connect to MongoDB
 */

if(process.env.NODE_ENV === 'production')
  mongoose.connect('mongodb://unluckygeniuses:password@ds137891.mlab.com:37891/unluckygeniuses');
else
	mongoose.connect(config.mongoDBUrl);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongodb');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;

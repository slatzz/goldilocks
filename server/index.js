const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/index.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());

app.get('/register', (req, res) => {
  res.send('success');
});

app.get('/login', (req, res) => {
  res.send('success');
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send('You have successfully logged out.')
})

app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});

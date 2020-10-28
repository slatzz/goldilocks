//////////////////////////// REQUIRED VARIABLES ////////////////////////////
require('dotenv').config();
const { db } = require('./db/index.js');
const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { User } = require('./db/index.js');
const { default: e } = require('express');


//////////////////////////// MIDDLEWARE ////////////////////////////
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  session({
    secret: 'secretssss',
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


//////////////////////////// ROUTES ////////////////////////////

app.post("/register", async (req, res) => {
  let { name, email, password } = req.body;

  let errors = [];

  if (!name || !email || !password) {
    errors.push({ message: "Please enter the required fields." });
  }

  if (req.body.password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (errors.length > 0) {
    res.render("register", { name, email, password });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedBrown: ', hashedPassword);
    // Validation passed
    let check = [];
    db.query(
      `SELECT * FROM users2`
    ).then(data => {
      for (let i = 0; i < data[0].length; i++) {
        let existingEmail = data[0][i].email;
        // console.log(existingEmail)
        if (email === existingEmail) {
          check.push(email);
        }
      }
      console.log(check);
      if (check.length < 1) {
        db.query(
          `INSERT INTO users2 (name, email, password)
          VALUES ('${name}', '${email}', '${hashedPassword}');`
        )
        res.send('New user registered!')
      } else {
        res.send('Email address is already registered!')
      }

    }).catch(err => { console.error('Error registering new user!', err) })
  }
})

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

//////////////////////////// CONFIRM DATABASE CONNECTION ////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});

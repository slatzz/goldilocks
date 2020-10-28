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
    db.query(
      `SELECT * FROM users2`
    ).then(data => {
      const results = data[0].map(user => {
        console.log(user.email)

        if (email === user.email) {
          return email;
        } else {
          return user.email;
        }
      });
      console.log(results)
      if (results.length > 0) {
        res.send('This email is already registered.')
      } else {
        db.query(
          `INSERT INTO users2 (name, email, password)
          VALUES ('${name}', '${email}', '${password}');`
        )
        res.send('New user registered!')
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

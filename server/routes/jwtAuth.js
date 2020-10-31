const router = require("express").Router();
const { db, User } = require("../db/index.js");
const bcrypt = require("bcryptjs");
const validEmail = require("../utils/validEmail");
const generateToken = require("../utils/jsonWebToken");
const authorization = require("../utils/authorize");

// Signup/Register
router.post("/register", async (req, res) => {
  try {
    //1. Destructure the req.body (name, email, password)
    // Change back to camel case
    const { first_name, last_name, email, password } = req.body;
    //2. Check if user exists
    console.log("Entered variables", first_name, last_name, email, password);
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser === null) {
      //2.a. If not, bcrypt user's password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      // Insert user into database
      // Change back to camel case
      await db.query(`INSERT INTO users (first_name, last_name, email, password) 
            VALUES ('${first_name}', '${last_name}', '${email}', '${hashedPassword}');`);
      res.status(200).send("User successfully added!");
    } else {
      // 2.b. If user already exists, throw error
      res.status(401).send("Already registered");
    }

    // 3. Generate JWT
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Verify (login) registered user
router.post("/login", validEmail, async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      return res.status(401).send("Invalid credentials, line 53");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).send("Invalid Password, line 58");
    }
    const jwtToken = generateToken(user.id);
    return res.send({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error logging in line 64 jwtAuth.js");
  }
});

router.get("/is-verified", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error verifying user token.");
  }
});

router.get("/", (req, res) => {
  res.json({ message: "👽" });
});
module.exports = router;

const router = require("express").Router();
const authorize = require("../utils/authorize");
const { db, User } = require("../db/index");

router.post("/", authorize, async (req, res) => {
  const { email } = req.headers;
  // console.log(req, 'body in post route from dashboard.js');
  try {
    const user = await User.findAll({
      where: {
        email,
      },
    });
    res.json(user[0].dataValues);
    // res.status(200).send(user[0].dataValues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error authorizing user to dashboard, ln 16");
  }
});
module.exports = router;

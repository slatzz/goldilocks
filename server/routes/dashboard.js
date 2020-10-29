const router = require("express").Router();
const authorize = require("../utils/authorize");
const { db, User } = require("../db/index");

router.post("/", authorize, async (req, res) => {
  const { first_name, email } = req.body;
  console.log(req.user.id);
  console.log(first_name, email);
  try {
    const user = await User.findOne({
      where: {
        first_name: first_name,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error authorizing user to dashboard, ln 16");
  }
});
module.exports = router;

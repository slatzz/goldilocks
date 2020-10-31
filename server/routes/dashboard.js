const router = require("express").Router();
const authorize = require("../utils/authorize");
const { db, User } = require("../db/index");

router.post("/dashboard", authorize, async (req, res) => {
  const { id } = req.body;
  // console.log(req.user.id);
  // console.log(first_name, email);
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    res.send(user.first_name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error authorizing user to dashboard, ln 16");
  }
});
module.exports = router;

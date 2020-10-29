const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user_id) => {
  const payload = {
    user: {
      id: user_id,
    },
  };
  return jwt.sign(payload, process.env.webTokenSecret, { expiresIn: "1h" });
};

module.exports = generateToken;

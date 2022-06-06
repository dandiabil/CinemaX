const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = (user_id) => {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "2h" });
};

module.exports = generateJWT;

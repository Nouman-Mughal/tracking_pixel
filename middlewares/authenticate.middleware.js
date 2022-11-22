const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    return res
      .status(500)
      .send({ message: "AN unhandled server exception occured" });
  }
  return next();
};

module.exports = verifyToken;

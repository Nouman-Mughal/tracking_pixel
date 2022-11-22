const express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  logoutUser,
} = require("../controllers/users.controlers");

router.get("/login", getUser);
router.post("/signup", createUser);
router.post("/logout", logoutUser);

module.exports = router;

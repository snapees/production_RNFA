const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/userController");

// router. object
const router = express.Router();

// routes
// register || post
router.post("/register", registerController);

// login || post
router.post("/login", loginController);

// update || put
router.put("/update-user", requireSignIn, updateUserController);

// exports
module.exports = router;

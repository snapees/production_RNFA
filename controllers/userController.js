const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModal = require("../models/userModel");

// middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name || !email || !password || password.length < 6) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill in all fields" });
    }
    // existing user
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res
        .status(500)
        .send({ success: false, message: "Email already exists" });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    // save user
    const user = await userModal({
      name,
      email,
      password: hashedPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Registration Successfully Done. Please Login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error in Registration",
      error,
    });
  }
};

// login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res
        .status(500)
        .send({ success: false, message: "Please fill in all fields" });
    }
    // find user
    const user = await userModal.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .send({ success: false, message: "Email not found" });
    }
    // compare password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(500)
        .send({ success: false, message: "Invalid username or password!" });
    }
    // token JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undefined password
    user.password = undefined;
    res
      .status(200)
      .send({ success: true, message: "Login Successfully!", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// update user
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // find user
    const user = await userModal.findOne({ email });
    //  validate password
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be atleast 6 charachters",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    // updated user
    const updatedUser = await userModal.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile updated please login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in USer update API",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
};

require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../modeles/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

//SignUp route
router.post(
  "/register",
  [
    body("fullName").not().isEmpty().withMessage("Full name is required."),
    body("email").isEmail().withMessage("Email invalid."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be longer than 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ msg: "Password must be longer than 6 characters." });

    const { fullName, email, password } = req.body;

    try {
      //New user verification
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be longer than 6 characters." });
      //Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPswd = await bcrypt.hash(password, salt);

      //Save user
      user = new User({ fullName, email, password: hashedPswd });
      await user.save();
      res.json({ msg: "Registration successfully!" });
    } catch (err) {
      res.status(500).json({ msg: "An unexpected Server Error." });
    }
  }
);

//Login route
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      //User verification
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User not found." });

      //Password verification
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Enter a valid password." });

      //Generate token
      const token = jwt.sign(
        { id: user._id },
        process.env.ACCESS_SECRET_TOKEN,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ msg: "An unexpected Server Error!" });
    }
  }
);

module.exports = router;

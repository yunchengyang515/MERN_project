const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

//@route GET api/user
//@desc register user
//@access Public
//with auth, the route is protected with the token
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //return everything expect password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/auth
//@desc  authenticate user and get token
//@access Public
router.post(
  "/",
  [
    check("email", "A valid Email is required").isEmail(),
    check("password", "Password is required").exists() //check password exist
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //indicating erros does exist
      return res.status(400).json({ errors: errors.array() });
      //If errors occur it will send back a message;
    }
    //Deconstruct body
    const { email, password } = req.body;

    try {
      //make request to the database, find the user by email
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
        //check if user does not exist, return the error message
      }

      //Use compare method of bcrypt, which compares plain text password
      //and encrypted password
      const isMatch = await bcrypt.compare(password, user.password);
      //password is the plain text password entered by the user

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
        //check if password matchs, return the error message
      }
      //Note: for security, do not indicate if the user exist in the error message

      
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("token"),
        {
          expiresIn: 36000
        }, //expiration time
        (err, token) => {
          if (err) {
            throw err;
          } else res.json({ token });
        } // a callback that we either get an error or token
      );
    } catch (err) {
      console.error(err.messgae);
      res.status(500).send("Something wrong with the server");
    }
  }
);

module.exports = router;

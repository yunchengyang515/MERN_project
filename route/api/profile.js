const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../Models/Profile");
const User = require("../../Models/User");
const { check, validationResult } = require("express-validator");
//@route GET api/profile/me
//@desc Get the user profile
//@access Private by using auth
//auth to protect the route
router.get("/me", auth, async (req, res) => {
  try {
    //get the profile by user id
    //populate the information with another model
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private
//Also need validation middleware
router.post(
  "/",
  [
    //only status is required, skills are required
    //check in the middleware functions

    check("status", "status is required")
      .not()
      .isEmpty(),
    check("skills", "skills is required")
      .not()
      .isEmpty(),
    check("handle", "hanlde is required")
      .not()
      .isEmpty(),
    auth
  ],
  async (req, res) => {
    //add validation errors in the call back
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //build profile object
    const profileObject = {};
    profileObject.user = req.user.id;
    console.log(req.user.id);
    //user will be the user id in the request
    //Note: to access user, auth is needed in the middleware chain
    //the company in the profileObject is equal to the company in the request body
    if (req.body.company) profileObject.company = req.body.company;
    if (req.body.handle) profileObject.handle = req.body.handle;
    if (req.body.website) profileObject.website = req.body.website;
    if (req.body.location) profileObject.location = req.body.location;
    if (req.body.status) profileObject.status = req.body.status;
    if (req.body.bio) profileObject.bio = req.body.bio;
    if (req.body.githubusername)
      profileObject.githubusername = req.body.githubusername;
    //Skills need to be split into an array
    if (req.body.skills != undefined) {
      profileObject.skills = req.body.skills.split(",").map(x => x.trim());
      //trim the string to igonre the space
    }
    profileObject.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    //Insert data into mongo
    try {
      //find profile by the user, use findOne()
      let profile = await Profile.findOne({ user: req.user.id });
      //If the profile is found, update use findOneAndUpdate()
      console.log(req.user.id);
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileObject },
          { new: true }
        );
        //update need to be pass user-> user id, $set -> profile object, new -> boolean

        //return profile in json format
        return res.json(profile);
      }
      //create profile if it is a new profile
      //construct a new object
      //save the profile
      //return profile in json format
      profile = new Profile(profileObject);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile
//@desc get all profiles
//@access Public
router.get("/", async (req,res)=>{
try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    //populate from users collection to get name and avatar
    return res.json(profile);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error")
}
});

//@route GET api/profile/user/:user_id
//@desc get profile for specific user
//@access Public
router.get("/user/:user_id", async (req,res)=>{
    try {
        //use findOne to find the user
        const profile = await Profile.findOne().populate("user", ["name", "avatar"]);
        //populate from users collection to get name and avatar
        if(!profile) return res.status(400).json({msg:"The user has no profile"});
        return res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
    });
    
module.exports = router;

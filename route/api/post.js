const express = require("express");
require("dotenv").config();
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../Models/Post");
const Profile = require("../../Models/Profile");
const User = require("../../Models/User");
//@route POST api/post
//@desc Create a new post
//@access Private
//Also need validation middleware
router.post(
  "/",
  [
    //only status is required, skills are required
    //check in the middleware functions
    auth,
    check("description", "Description is required")
      .not()
      .isEmpty(),
    check("title", "title is required")
      .not()
      .isEmpty(),
    check("address", "address is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //add validation errors in the call back
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Insert data into mongo
    try {
      let retData = {};
      //findById is just a convenience function that does exactly
      //the same thing as the findOne call you show
      userObject = User.findById(req.user.id).select("-password");
      const newPost = new Post({
        description: req.body.description,
        title: req.body.title,
        avatar: userObject.avatar,
        user: req.user.id,
        location: {
          address: req.body.address,
          geometry: {
            lat:null,
            lng:null
          }
        }
      });

      const apiKey = process.env.API_KEY;
      var request = require("request");
      //1.Sub the space in addressString to "+" sign
      let addressString = req.body.address;
      addressString = addressString.replace(" ", "+");
      //2. Make request to the api
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${apiKey}`;
      request(url, async function(error, response, body) {
        retData = JSON.parse(body);

        if (retData.status !== "ZERO_RESULTS") {
          newPost.location.address =
            retData.results[0].formatted_address;
          let geometry =
            retData.results[0].geometry.location;
          newPost.location.geometry = geometry;
        }
        const post = await newPost.save();
        res.json(post)
      });


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/post
//@desc get all posts
//@access private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 }); //-1 is desc, 1 is asc
    if (!post) {
      res.json({ msg: "No post yet" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
  
});

//@route GET api/post/:id
//@desc get one post
//@access private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //-1 is desc, 1 is asc
    if (!post) {
      res.json({ msg: "No post found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //-1 is desc, 1 is asc
    //check user
    if (post.user.toString() != req.user.id) {
      res.status(401).json({ msg: "Unauthorized user" });
    }
    await post.remove();
    res.json({ msg: "post removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/post/going/:id
//@desc register as going for a post
//@access private
router.put("/going/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Only returns the post which has no like, and is made by the user
    //Length > 0 means it is already been liked
    if (
      post.going.filter(going => going.user.toString() === req.user.id).length >
      0
    ) {
      res.status(400).json({ msg: "You already registered as going" });
    }
    post.going.unshift({ user: req.user.id });

    await post.save();
    res.json(post.going);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/post/ungoing/:id
//@desc ungoing to a training post
//@access private
router.put("/ungoing/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Only returns the post which has like, and is made by the user
    //Length > 0 means it is already been liked
    if (
      post.going.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      res.status(400).json({ msg: "You have not rsvped" });
    }
    //get remove index
    const removeIndex = post.going.map(like =>
      like.user.toString().indexOf(req.user.id)
    );
    post.going.splice(removeIndex, 1);
    await post.save();
    res.json(post.going);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/post/comment/:id
//@desc comment a post
//@access private
router.post(
  "/comment/:id",
  auth,
  check("text", "text is required")
    .not()
    .isEmpty(),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      //Construct a new comment
      newDate = Date.now();
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        date: newDate,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/post/comment/:id
//@desc uncomment a post
//@access private
router.delete("/comment/:postId/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.find(c => c.id === req.params.commentId);
    if (!comment) {
      res.status(404).json({ msg: "No comment is made" });
    }
    //check if user is the same
    if (comment.user.toString() != req.user.id) {
      res.status(404).json({ msg: "Can only delete your own comment" });
    }
    //map all the comment with the user id
    const removeIndex = post.comments
      .map(comment => comment.id.toString())
      .indexOf(req.params.commentId);
    post.comments.splice(removeIndex, 1);
    post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

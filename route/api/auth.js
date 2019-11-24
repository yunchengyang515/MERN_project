const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const User = require("../../Models/User")
//@route GET api/user

//@desc Test route
//@access Public
//with auth, the route is protected with the token
router.get("/", auth, async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select("-password"); //return everything expect password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;


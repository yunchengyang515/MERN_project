const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../Models/Post');
const Profile = require('../../Models/Profile');
const User = require('../../Models/User');
//@route POST api/post
//@desc Create a new post
//@access Private
//Also need validation middleware
router.post(
	'/',
	[
		//only status is required, skills are required
		//check in the middleware functions
		auth,
		check('text', 'text is required')
			.not()
			.isEmpty(),
	],
	async (req, res) => {
		//add validation errors in the call back
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Insert data into mongo
		try {
			const postObject = {};
			//findById is just a convenience function that does exactly
			//the same thing as the findOne call you show
			userObject = User.findById(req.user.id).select('-password');
			const newPost = new Post({
				text: req.body.text,
				name: userObject.name,
				avatar: userObject.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//@route GET api/post
//@desc get all posts
//@access private
router.get('/', auth, async (req, res) => {
	try {
		const post = await Post.find().sort({ date: -1 }); //-1 is desc, 1 is asc
		if (!post) {
			res.json({ msg: 'No post yet' });
		}
		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//@route GET api/post/:id
//@desc get one post
//@access private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id); //-1 is desc, 1 is asc
		if (!post) {
			res.json({ msg: 'No post found' });
		}
		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id); //-1 is desc, 1 is asc
		//check user
		if (post.user.toString() != req.user.id) {
			res.status(401).json({ msg: 'Unauthorized user' });
		}
		await post.remove();
		res.json({ msg: 'post removed' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//@route PUT api/post/like/:id
//@desc Like a post
//@access private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//Only returns the post which has no like, and is made by the user
		//Length > 0 means it is already been liked
		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			res.status(400).json({ msg: 'You already liked the post' });
		}
		post.likes.unshift({ user: req.user.id });

		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//@route PUT api/post/unlike/:id
//@desc unlike a post
//@access private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//Only returns the post which has like, and is made by the user
		//Length > 0 means it is already been liked
		if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			res.status(400).json({ msg: 'You have not liked the post ' });
        }
        //get remove index
        const removeIndex = post.likes.map(like=>like.user.toString().indexOf(req.user.id))
		post.likes.splice(removeIndex, 1);
		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//@route PUT api/post/like/:id
//@desc Like a post
//@access private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		//Only returns the post which has no like, and is made by the user
		//Length > 0 means it is already been liked
		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			res.status(400).json({ msg: 'You already liked the post' });
		}
		post.likes.unshift({ user: req.user.id });

		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../Models/Profile');
const User = require('../../Models/User');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route GET api/profile/me
//@desc Get the user profile
//@access Private by using auth
//auth to protect the route
router.get('/me', auth, async (req, res) => {
	try {
		//get the profile by user id
		//populate the information with another model
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'No profile found' });
		}
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private
//Also need validation middleware
router.post(
	'/',
	[
		//only status is required, skills are required
		//check in the middleware functions

		check('location', 'location is required')
			.not()
			.isEmpty(),
		check('role', 'role is required')
			.not()
			.isEmpty(),
		check('experience', 'experience is required')
			.not()
			.isEmpty(),
		auth,
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
		if (req.body.location) profileObject.location = req.body.location;
		if (req.body.role) profileObject.role = req.body.role;
		if (req.body.experience) profileObject.experience = req.body.experience;
		if (req.body.bio) profileObject.bio = req.body.bio;
		if (req.body.facebook) profileFields.facebook = req.body.facebook;

		//Insert data into mongo
		try {
			//find profile by the user, use findOne()
			let profile = await Profile.findOne({ user: req.user.id });
			//If the profile is found, update use findOneAndUpdate()
			console.log(req.user.id);
			if (profile) {
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileObject }, { new: true });
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
			res.status(500).send('Server Error');
		}
	}
);

//@route GET api/profile
//@desc get all profiles
//@access Public
router.get('/', async (req, res) => {
	try {
		const profile = await Profile.find().populate('user', ['name', 'avatar']);
		//populate from users collection to get name and avatar
		return res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//@route GET api/profile/user/:user_id
//@desc get profile for specific user
//@access Public
router.get('/user/:user_id', async (req, res) => {
	try {
		//use findOne to find the user
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);
		//populate from users collection to get name and avatar
		if (!profile) return res.status(400).json({ msg: 'The user has no profile' });
		return res.json(profile);
	} catch (error) {
		console.error(error.message);
		if (error.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}

		res.status(500).send('Server Error');
	}
});

//@route DELETE api/profile/user/:user_id
//@desc delete profile, user, and post for specific user
//@access private
router.delete('/', auth, async (req, res) => {
	try {
		//remove user profile
		await Profile.findOneAndDelete({
			user: req.user.id,
		});
		//@todo - remove users posts

		//remove user
		await User.findOneAndDelete({ _id: req.user.id });
		return res.json({ msg: 'User is deleted' });
	} catch (error) {
		console.error(error.message);
		if (error.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}

		res.status(500).send('Server Error');
	}
});

//@route PUT api/profile/experience
//@desc update experience field in profile
//@access private
router.put(
	'/experience',
	[
		auth,
		check('isPro', 'isPro is required')
			.not()
			.isEmpty(),
		check('discipline', 'discipline is required')
			.not()
			.isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400)
			//.json({ errors: errors.array() });
		}
		const { promotion, discipline, isPro, result } = req.body;
		
		const newData = {
			promotion,
			discipline,
			isPro,
			result,
		};
		console.log(req.body)
		try {
			//remove user profile
			profile = await Profile.findOne({
				user: req.user.id,
				//which we get from the token
			});
			profile.fightexperience.unshift(newData);
			//with unshift, the newest one will be at the first

			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send(error.message);
		}
	}
);

//@route delete api/profile/experience
//@desc delete experience field in profile
//@access private
router.delete(
	'/experience/:exp_id',

	auth,

	async (req, res) => {
		try {
			//remove user profile
			profile = await Profile.findOne({
				user: req.user.id,
				//which we get from the token
			});
			//get remove index
			removeIndex = profile.fightexperience.map(e => e.id).indexOf(req.params.exp_id);

			//use splice to takeout
			profile.fightexperience.splice(removeIndex, 1);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(error.message);

			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;

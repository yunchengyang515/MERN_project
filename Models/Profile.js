const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	}, //the id of user object, connect to id in the user model (by specifing ref)
	location: {
		type: String,
	},
	role: {
		type: String,
		required: true,
	}, //such as job
	styles: {
		type: [String],
		required: true,
	}, //comma separated value, array of strings
	bio: {
		type: String,
	},
	
	fightexperience: [
		{
			promotion: {
				type: String,
			
			},
			discipline: {
				type: String,
			},
			isPro: {
				type: Boolean,
			},
			result: {
				type: String,
			},
		},
	],
	experience:{
		type:String,
		required:true
	},

	facebook: {
		type: String,
	}, //an object
	
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);

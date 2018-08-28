const Reward = require('../models/reward');
const Json2csvParser = require('json2csv').Parser;

exports.getRewards = () => {
	return Reward.find({}, (err, result) => {
		if(err) return err;
		return result;
	});
};

//need to add validation
exports.addReward = (reward) => {
	const newReward = new Reward(reward);
	return newReward.save();
};
const Reward = require('../models/reward');

exports.getRewards = () => {
	return Reward.find({}, (err, result) => {
		if(err) return err;
		return result;
	});
};

exports.addReward = (reward) => {
	const newReward = new Reward(reward);
	return newReward.save();
};
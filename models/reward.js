const mongoose = require('mongoose');
const Promise = require('bluebird');
const connStr = process.env.MONGO_ENDPOINT;

mongoose.Promise = Promise;
mongoose.connect(connStr);

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error;'));

const rewardSchema = mongoose.Schema({
	name: {type: String, required: true},
	email: String
});

module.exports = mongoose.model('Reward', rewardSchema);
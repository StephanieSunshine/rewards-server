const mongoose = require('mongoose');
const Promise = require('bluebird');
// const connStr = process.env.MONGO_ENDPOINT;

mongoose.Promise = Promise;
//mongoose.connect(connStr);
mongoose.connect(process.env.MONGO_ENDPOINT, { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error;'));

const rewardSchema = mongoose.Schema({
	email: String,
	platform: {type: String, required: true},
	username: {type: String, required: true},
	termsAccepted: Boolean
});

module.exports = mongoose.model('Reward', rewardSchema);

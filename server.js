const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const RewardController = require('./controllers/reward_controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => {
	res.send('hello.  telos server thingy.');
});

app.get('/api/v1/rewards', (req, res, next) => {
	res.set('Content-Type', 'text/json');
	RewardController.getRewards().then((items) => {
		if(!items){
			return res.status(404).send('error, rewards not found');
		}
		res.json(items.map(reward => {
			return {
				email: reward.email,
				platform: reward.platform,
				username: reward.username,
				termsAccepted: reward.termsAccepted
			};
		}));
	}).catch(err => next(err));
});

app.post('/api/v1/rewards/create', (req, res, next) => {
	res.set('Content-Type', 'text/json');
	const {platform, username, email, termsAccepted} = req.body;
	if(!platform ||!username || !email) return res.status(500).send('missing an input');
	if(!termsAccepted) return res.status(500).send('terms must be accepted'); // not sure about the error code
	RewardController.addReward({
		email: email,
		platform: platform,
		username: username,
		termsAccepted: termsAccepted
	}).then(reward => res.json({
		email: reward.email,
		platform: reward.platform,
		username: reward.username,
		termsAccepted: reward.termsAccepted
	}))
	.catch(err => next(err));
});


app.listen(process.env.PORT || 4001);

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
				name: reward.name,
				email: reward.email
			};
		}));
	}).catch(err => next(err));
});

app.post('/api/v1/rewards/create', (req, res, next) => {
	res.set('Content-Type', 'text/json');
	const {name, email} = req.body;
	if(!name || !email) return res.status(500).send('missing an input');
	RewardController.addReward({
		name: name,
		email: email
	}).then(reward => res.json({
		name: reward.name,
		email: reward.email
	}))
	.catch(err => next(err));
});


app.listen(process.env.PORT || 8080);
const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

const config = {
	channelAccessToken :
		'g59kCaBAAQRIbb+qTqNiudVjcgwTTFBvSw/IvHL4ypbGjgclTvs5k5x3iovadBvJHadfFavs2Laqebp36Ba23wUXXr68hq3ur6NvzVBu6oXh9tOePg33EkBGQt6106Oh3xAZuLFFFOeNL9MwPZ45CAdB04t89/1O/w1cDnyilFU=',
	channelSecret      : 'ddf1e578426000f63a6d68f7d6f79676'
};

const app = express();
let a = 0;
let b = 0;
app.post('/webhook', line.middleware(config), (req, res) => {
	Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
	console.log(event);
	if (event.type === 'memberJoined') {
		axios
			.post('http://178.128.120.251/countstats', {
				join  : 1,
				leave : 0
			})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	if (event.type === 'memberLeft') {
		axios
			.post('http://178.128.120.251/countstats', {
				join  : 0,
				leave : 1
			})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	}
}

app.listen(3000);

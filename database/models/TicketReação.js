const { Schema, model } = require('mongoose');

const ticketReação = Schema({
	messageID: String,
	channelID: String,
	guildID: String,
	buttonID: String,
	emoji: Array,
});

module.exports = model('ticketReação', ticketReação);
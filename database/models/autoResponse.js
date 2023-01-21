const { Schema, model } = require('mongoose');

const autoResponseSchema = Schema({
    guildId: String,
    name: { type: String, default: null },
    content: { type: String, default: null },
});

module.exports = model('autoResponse', autoResponseSchema);
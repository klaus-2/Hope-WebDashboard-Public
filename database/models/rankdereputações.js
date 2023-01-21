const mongoose = require('mongoose')

const Rank_de_Reputações = mongoose.Schema({
  // Guild ID
  _id: { type: String, default: null },
  channelId: { type: String, default: null },
  msgID: { type: String, default: null },
  enabled: { type: Boolean, default: false },
})

module.exports = mongoose.model('Rank-de-Reputações', Rank_de_Reputações)
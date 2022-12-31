const mongoose = require("mongoose")

const stats = mongoose.Schema({

  _date: {
    type: String,
    required: true
  },

  messages: {
    userMsgCount: {type: Number, required: false, default: 0,},
    user: {type: Map, required: false, default: 0,},
    bot: {type: Number, required: false, default: 0,},
  },
})

module.exports = mongoose.model("stats", stats)
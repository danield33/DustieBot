const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    guildid: String,
    users: Array
});
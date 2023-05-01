const Discord = require("discord.js")
const bot = require('../index.js')
const Guild = require('../util/models/guild')

//Please fill in the data below...
bot.on('error', function (e) {
    console.log('An error ocurred', e.message);
});
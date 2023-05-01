const Discord = require("discord.js")
const bot = require('../index.js')

const Guild = require('../util/models/guild')
const Warn = require('../util/models/warn')
const Economy = require('../util/models/economy')

bot.on("guildDelete", guild => {
    Guild.deleteServer(guild.id)
    Warn.deleteServer(guild.id)
    Economy.deleteServer(guild.id)
});
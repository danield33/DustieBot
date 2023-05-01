const Discord = require("discord.js")
const bot = module.exports = new Discord.Client({ disableEveryone: true })
bot.login(require('./util/encode').decode(require('./util/json/botconfig.json').token))

require('./util/handlers/event/index.js').loadEvents()
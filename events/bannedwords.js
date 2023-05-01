const Discord = require("discord.js")
const bot = require('../index.js')
const Guild = require('../util/models/guild')
const Economy = require('../util/models/economy')
const User = require('../util/models/user')


bot.on("message", async message => {
    if (message.channel.type == "dm") return
    if (message.author.bot) return



    {//banned words

        if (!await Guild.get(message.guild.id, "modules.moderation.bannedwords.toggle")) return
        let checkDWords = await Guild.get(message.guild.id, 'modules.moderation.bannedwords.default');
        let specialWords = await Guild.get(message.guild.id, 'modules.moderation.bannedwords.filter');
        let rMessage = await Guild.get(message.guild.id, "modules.moderation.bannedwords.message")

        for (var i in specialWords) {
            if (message.content.toLowerCase().includes(specialWords[i].toLowerCase())) {
                message.delete();
                message.reply("You cannot use that word in this guild").then(r => r.delete(3000))
            }
        }
    }//bannedwords


});//end of message event

const Discord = require("discord.js")
const bot = require('../index.js')
const Guild = require('../util/models/guild.js')

//Please fill in the data below...
bot.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.author.bot || oldMessage.channel.type == "dm") return
    let logs = await Guild.get(oldMessage.guild.id, 'modules.logs')
    if (!logs.toggle && !logs.messageedit.toggle) return
    let channel = oldMessage.guild.channels.get(logs.logchannel)
    let eEmbed = new Discord.RichEmbed()
        .setTitle(`Message Edited`)
        .setColor(bot.embed)
        .addField(`In`, oldMessage.channel.name)
        .addField(`By`, `${oldMessage.author.tag} (${oldMessage.author.id})`)
        .addField("Old Message", oldMessage, true)
        .addField('New Message', newMessage, true);
    channel.send(eEmbed)
})
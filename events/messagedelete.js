
const Discord = require("discord.js")
const bot = require('../index.js')
const Guild = require('../util/models/guild')

//Please fill in the data below...
bot.on("messageDelete", async (message) => {// ProNanigans | 18-6-19
    if (message.author.bot || message.channel.type == "dm") return
    let logs = await Guild.get(message.guild.id, 'modules.logs')
    if (!logs.toggle && !logs.messagedelete.toggle) return
    let channel = message.guild.channels.get(logs.logchannel)
    if (!channel) return
    let dEmbed = new Discord.RichEmbed()
        .setTitle(`Message Deleted`)
        .setColor(bot.embed)
        .addField(`In`, message.channel.name)
        .addField(`By`, `${message.author.tag} (${message.author.id})`)
        .addField("Message", message);
    channel.send(dEmbed)
})
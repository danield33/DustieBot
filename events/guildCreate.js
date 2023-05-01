const Discord = require("discord.js")
const bot = require('../index.js')

const Guild = require('../util/models/guild')
let defaultSettings = require('../util/models/defaultSettings')

const Warn = require('../util/models/warn')
let defaultWarns = require('../util/models/defaultWarns')

const Economy = require('../util/models/economy')
let defaultEconomy = require('../util/models/defaultEconomy')


bot.on("guildCreate", guild => {

    //Database shit//
    let newGuild = new Guild(defaultSettings)
    Guild.createGuild(newGuild, guild.id, function (err, guild_) {
        if (err) return console.log(err)
    })

    let newWarn = new Warn(defaultWarns)
    Warn.createGuild(newWarn, guild.id, function (err, guild_) {
        if (err) return console.log(err)
    })

    let newEconomy = new Economy(defaultEconomy)
    Economy.createGuild(newEconomy, guild.id, function (err, guild_) {
        if (err) return console.log(err)
    })

    //Sends a message to the guild upon join//
    let embed = new Discord.RichEmbed()
        .setColor("#36393F")
        .addField(
            `Thank you for inviting **${bot.user.username}**`,
            `Bot is trusted by **${bot.users.size}** users over **${bot.guilds.size}** guilds!\nMake sure you configure the bot in our [dashboard](https://dustie.xyz/dashboard)! Need help? Join our [Discord](https://dustie.xyz/discord)!\n\n If there are any **features** that are broken in the dashboard or in the bot, we are **sorry** we are still working on it!`
        );

    guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES')).first().send(embed)
})

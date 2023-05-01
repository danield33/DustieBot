// Dubbel | 19 May 2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { User, Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

class Userinfo extends Command {
  constructor() {
    super({
      name: 'userinfo',
      aliases: ['uinfo', 'user', 'ui'], // REMOVE THIS IF THERE IS NONE!
      description: 'Displays some informations about a given user. If none is given, return something useful about the author of the message',
      category: 'util', //LOWER CASE!!!!
      usage: 'userinfo (user)',
      dev: false,
      owner: false,
      mod: false,
      disabled: false
    })
  }
  async run(message, args, bot) {
    let user = await Guild.findUser(message, args.join(' '))
    if(!user) return message.reply("Couldn't find user")
    let statusARR = {}
    statusARR["dnd"] = "<a:redcircle:524673183559712799> Do Not Disturb"
    statusARR["online"] = "<a:greencircle:524664534883893248> Online"
    statusARR["idle"] = "<a:yellowcircle:525686188502417408> Idle"
    statusARR["offline"] = "<a:greycircle:525686144197984256> Offline"

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let isDev = bot.guilds.get("549254272039256094").roles.get("549647957780332568").members.map(m => m.id).includes(user.id) ? true : false
    let isPrem = await User.find(user.id)

    let embed = new Discord.RichEmbed()
      .setThumbnail(user.user.avatarURL)
      .setColor(bot.embed)
      .setTitle(`Info about ${user.user.tag}`)
      .addField('Nick Name', message.guild.member(user).displayName, true)
      .addField('ID', user.id, true)
      .addField(`Properties:`, `**Bot**: ${user.user.bot}\n**Premium**: ${isPrem}\n**Developer**: ${isDev}`, true)
      .addField(`Presence `, `**Status**: ${statusARR[user.presence.status]}\n**Playing**: ${user.presence.game ? user.presence.game.name : 'Nothing'}`, true)
      .addField('Created On', user.user.createdAt.toLocaleDateString("en-US", options), true)
      .addField('Joined On', user.joinedAt.toLocaleDateString("en-US", options), true)
      .addField("Roles" + '(' + message.guild.member(user).roles.size + ')', message.guild.member(user).roles.map(s => s).join(" | "))
      .setFooter("Requested By: " + message.author.username, message.author.avatarURL)
      .setTimestamp();
    return message.channel.send(embed)
  }
}
module.exports = Userinfo;

//PlumpOrange | 3/15
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const superagent = require('superagent')

class Google extends Command {
    constructor() {
        super({
            name: 'google',
            description: 'Google what you want.',
            category: 'misc',
            usage: 'google [ search ]',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.misc.google.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let search = args.join(" ")
        if(!search) return message.reply("Please search something")
        let finalsearch = search.replace(/ /g, "+")
        let link = `https://www.google.com/search?q=${finalsearch}`
        let a = new Discord.RichEmbed()
        .setTitle(`Google Search For: ${search}`)
        .setDescription(link)
        .setColor(bot.embed)
        return message.channel.send(a)

    }
}
module.exports = Google

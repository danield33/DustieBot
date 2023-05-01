// Dubbel | 11 May 2019
const { Command } = require('../../util/handlers/command/index.js');
const Discord = require('discord.js');
const moment = require('moment')

class inrole extends Command {
    constructor() {
        super({
            name: 'roleinfo',
            description: 'Displays inforations about a given role.',
            aliases: ["ri"],
            category: 'util',
            usage: 'roleinfo [ role ]',
        })
    }
    async run(message, args, bot) {
        // if (!await Guild.get(message.guild.id, "modules.util.roleinfo.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let role = message.mentions.roles.first();
        if(!role) role = await message.guild.roles.find(role => role.name === args.join(" "))
        if(!role) return message.channel.send(`That role does not exist.`)

        let embed = new Discord.RichEmbed()
            .setAuthor(`Info about ${role.name}`)
            .setColor(bot.embed)
            .addField('Role name', role.name)
            .addField('Created on', moment(role.createdAt).format())
            .addField('Members with role', role.members.size, true)
            .addField('Humans', role.members.filter(u => u.user.bot == false).size, true)
            .addField('Bots', role.members.filter(b => b.user.bot === true).size, true)
            .setFooter(`ID: ${message.guild.id} |`)
            .setTimestamp()
            .setThumbnail(`https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`)

        return message.channel.send(embed)
    }
}
module.exports = inrole;

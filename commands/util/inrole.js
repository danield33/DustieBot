// Dubbel | 11 May 2019
const { Command } = require('../../util/handlers/command/index.js');
const Discord = require('discord.js');

class inrole extends Command {
    constructor() {
        super({
            name: 'inrole',
            description: 'Returns all users in the specified role.',
            aliases: ["ir"],
            category: 'util',
            usage: 'inrole [ role ] [ opt: page ]',
        })
    }
    async run(message, args, bot) {
        // if (!await Guild.get(message.guild.id, "modules.util.inrole.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let role = message.mentions.roles.first();
        if(!role) role = await message.guild.roles.find(role => role.name === args.join(" "))
        if(!role) return message.channel.send(`That role does not exist.`)

        let members = role.members.map(m => m.user.tag).map((m,i) => `${i + 1}. ${m}`);

        let noOfPages = members.length / 10;
        let i = (args[1] > 0 && args[1] < noOfPages + 1) ? args[1] : 1;
        i = i - 1;

        let embed = new Discord.RichEmbed()
            .setAuthor(`Members with ${role.name}`)
            .setColor(bot.embed)
            .setDescription(members.slice(i * 10, (i * 10) + 10).join(`\n`))
            .setThumbnail(`https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`)
            .setFooter(`Page: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`)

        return message.channel.send(embed)
    }
}
module.exports = inrole;

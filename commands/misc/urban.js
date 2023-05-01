//ProNanigans | 3-14-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const unirest = require('unirest')

// Please repalce Name on line 7 and 25 to command name.
class urban extends Command {
    constructor() {
        super({
            name: 'urban',
            aliases: ['urbdefine', 'urbandictionary'], // REMOVE THIS IF THERE IS NONE!
            description: 'Defines specified phrase / word from the urban dictionary',
            category: 'misc', //LOWER CASE!!!!
            usage: 'd.urban <query>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: true, // If Command is not safe for work
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.misc.urban.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!args[0]) return message.reply("Please specify what to you want to search.")
        unirest.get(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${args.join('+')}`)
            .header('X-RapidAPI-Key', 'GK2DqpYrOSmshtedI1LpA8iZmDZ5p11ia7RjsnGl2KlSAokZGL')
            .end(function (result) {
                let s = result.raw_body;
                let r = /definition(.*?)",/g
                s = r.exec(s)
                if (!s) return message.reply("Couldn't find anything in the urban dicitonary!");
                s = s[0]
                if (s.length > 1024) {
                    s = s.replace(/\[/g, "").replace(/\]/g, "")
                    s = s.slice(0, s.length - (1024 - 20))
                } // Fixed by Ned - Kept crashing the bot due to character limit
                let uEmbed = new Discord.RichEmbed()
                    .setTitle('Urban Dictionary Search For')
                    .setDescription(`${args.join(' ')}`)
                    .setColor(bot.embed)
                    .addField("Here's what I found", s)
                    .addField('Link:', `https://www.urbandictionary.com/define.php?term=${args.join('+')}`);
                return message.channel.send(uEmbed)
            });

    }
}
module.exports = urban
//ProNanigans | 4-12-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const words = require('an-array-of-english-words');

// Please repalce Name on line 7 and 27 to command name.
class unscramble extends Command {
    constructor() {
        super({
            name: 'unscramble',
            aliases: ['unscram'], // REMOVE THIS IF THERE IS NONE!
            description: 'Unscrambles a scrambled word in the english dictionary',
            category: 'misc', //LOWER CASE!!!!
            usage: 'd.unscramble <word>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.misc.unscramble.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!args[0]) return message.reply("Please specify what to unscramble")
        if (args[1]) return message.reply("Please only specify one word to unscramble");
        unscramble(args[0]);
        function unscramble(word) {
            word = word.toLowerCase();
            let matchList = [];
            let sWords = word.split('').sort().join('');
            words.forEach((i) => {
                if (sWords.length === i.length) {
                    let i2 = i.split('').sort().join('')
                    if (sWords === i2) {
                        matchList.push(i)
                    }
                }
            });
            if (matchList.length == 0) matchList = ["Couldn't find any matches."];
            let uEmbed = new Discord.RichEmbed()
                .setTitle(`**WORD UNSCRAMBLER**`)
                .setDescription(`**For ${args[0]}**`)
                .setColor(bot.embed)
                .addField("Here's what I found", matchList)
                .setFooter('Make sure the word isn\'t a name of a place or a name');

            return message.channel.send(uEmbed)
        }

    }
}
module.exports = unscramble
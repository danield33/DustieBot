// Dubbel | 9 May 2019
const Discord = require("discord.js");
const {
    Command
} = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please replace Name on line 7 and 27 to command name.
class dice extends Command {
    constructor() {
        super({
            name: 'dice',
            aliases: ['die'], // REMOVE THIS IF THERE IS NONE!
            description: 'Roll a die',
            category: 'fun', //LOWER CASE!!!!
            usage: 'dice',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        if (!await Guild.get(message.guild.id, "modules.fun.dice.toggle")) return message.reply("That command is not enabled on this server | guild.")
        var roll = Math.floor(Math.random() * 6) + 1;
        let diceembed = new Discord.RichEmbed()
            .setAuthor(`Dice`)
            .setColor(bot.embed)
            .setDescription(`You rolled a **${roll}**!`)

        return message.channel.send(diceembed)
    }
}
module.exports = dice
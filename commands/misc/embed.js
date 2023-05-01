//Ned | 25/07/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class Embed extends Command {
    constructor() {
        super({
            name: 'embed',
            description: 'Creates an embed for you!',
            category: 'misc', //LOWER CASE!!!!
            usage: 'embed title; description; thumbnailURL\n\nNOT FINISHED!',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        if (!args[0]) return message.reply("Please specify an argument!")
        let options = args.join(" ").split(";")
        let embed = new Discord.RichEmbed()
            .setTitle(options[0])
            .setColor(bot.embed)
        if (options[1]) embed.setDescription(options[1])
        if (options[2]) embed.setThumbnail(options[2])
        return message.channel.send(embed)
    }
}
module.exports = Embed
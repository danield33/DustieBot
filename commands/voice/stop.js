//ProNanigans | 3 - 23 - 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class stop extends Command {
    constructor() {
        super({
            name: 'stop',
            //     aliases: ['s'], // REMOVE THIS IF THERE IS NONE!
            description: 'Stops the queue',
            category: 'voice', //LOWER CASE!!!!
            usage: 'stop',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-stop'
        })
    }
    async run(message, args, bot, db, queue) { // add ', queue' if working with music
        // CODE HERE
        function returnM(title, string) {
            let embed = new Discord.RichEmbed()
                .setAuthor(title, bot.user.avatarURL)
                .setColor(bot.embed)
                .setDescription(string)
                .setFooter(message.author.username, message.author.avatarURL)
                .setTimestamp()
            return embed
        }

        if (!db.modules.voice.stop.toggle) return message.reply("That command is not enabled on this server | guild.")
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let player = bot.player.get(message.guild.id);
        let serverQueue = queue.get(message.guild.id)
        if (!player) return message.reply("Currently not playing anything");
        serverQueue.listen = false
        queue.delete(message.guild.id)
        await player.stop()
        return message.reply(returnM("Music Player", "Successfully stopped the current queue!"));
    }
}
module.exports = stop
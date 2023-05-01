//ProNanigans | 3 - 23 - 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class leave extends Command {
    constructor() {
        super({
            name: 'leave',
            // aliases: [ 'leav' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Leaves the voice channel',
            category: 'voice', //LOWER CASE!!!!
            usage: 'leave',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-phone-slash'
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

        if (!db.modules.voice.leave.toggle) return message.reply("That command is not enabled on this server | guild.")
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")
        let player = bot.player.get(message.guild.id);
        let serverQueue = queue.get(message.guild.id)
        if (!player || !serverQueue) return message.channel.send(returnM("Error", "Currently not playing anything"));
        queue.delete(message.guild.id)
        player.disconnect()
        message.member.voiceChannel.leave();
        return message.channel.send(returnM("Music Player", "Successfully left the voice channel"));
    }
}
module.exports = leave
//ProNanigans | 3 - 31 - 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class volume extends Command {
    constructor() {
        super({
            name: 'volume',
            aliases: ['vol'], // REMOVE THIS IF THERE IS NONE!
            description: 'Changes the volume of the queue playing',
            category: 'voice', //LOWER CASE!!!!
            usage: 'volume <number>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-volume-up'
        })
    }
    async run(message, args, bot, db, queue) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!db.modules.voice.volume.toggle) return message.reply("That command is not enabled on this server | guild.")
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let player = bot.player.get(message.guild.id);
        if (!player) return message.reply("Currently not playing anything");
        if (!args[0]) {
            let volume = player.state.volume
            let bar = "▪▪▪▪▪▪▪▪▪▪".substr(0, Math.floor(volume / 10) - 1) + '🔴' + "▪▪▪▪▪▪▪▪▪▪".substr(Math.floor(volume / 10));

            let embed = new Discord.RichEmbed()
                .setColor(bot.embed)
                .addField(`🔉The volume is set to **${volume}**%`, bar)
            return message.channel.send(embed)
        }
        if (isNaN(args[0])) return message.reply("It must be a number!")
        if (args[0] > 100 || args[0] < 0) return message.reply("Volume range is 0 to 100!")
        player.volume(args[0])

        let volume = args[0]
        let bar = "▪▪▪▪▪▪▪▪▪▪".substr(0, Math.floor(volume / 10) - 1) + '🔴' + "▪▪▪▪▪▪▪▪▪▪".substr(Math.floor(volume / 10));

        let embed = new Discord.RichEmbed()
            .setColor(bot.embed)
            .addField(`🔉The volume was set to **${volume}**%`, bar)
        return message.channel.send(embed)
    }
}
module.exports = volume
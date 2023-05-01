//ProNanigans | 3-23-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const serverSkips = new Map()

// Please repalce Name on line 7 and 25 to command name.
class skip extends Command {
    constructor() {
        super({
            name: 'skip',
            aliases: ['s'], // REMOVE THIS IF THERE IS NONE!
            description: 'Skips the current thing playing',
            category: 'voice', //LOWER CASE!!!!
            usage: 'skip',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db, queue) {
        if (!db.modules.voice.skip.toggle) return message.reply("That command is not enabled on this server | guild.")
        function returnM(title, string) {
            let embed = new Discord.RichEmbed()
                .setAuthor(title, bot.user.avatarURL)
                .setColor(bot.embed)
                .setDescription(string)
                .setFooter(message.author.username, message.author.avatarURL)
                .setTimestamp()
            return embed
        }
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")
        let player = bot.player.get(message.guild.id);
        if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
        let serverQueue = queue.get(message.guild.id)
        let skips = serverSkips.get(message.guild.id)
        let num_voice = message.guild.channels.get(bot.player.get(message.guild.id).channel).members.filter(m => !(m.serverDeaf || m.selfDeaf) && !m.user.bot).size
        if (num_voice === 1) num_voice = 1

        let num_skips;
        let msg = ""
        let skips_remaining;
        if (!skips) {
            num_skips = serverSkips.set(message.guild.id, [message.author.id])
            skips_remaining = Math.min(4, Math.ceil(0.5 / (1 / num_voice))) - num_skips.size
        }
        else {
            if (skips.includes(message.author.id)) return message.channel.send(returnM("Music Player", "You already voted to skip!"))
            else num_skips = skips.push(message.author.id)
            skips_remaining = Math.min(4, Math.ceil(0.5 / (1 / num_voice))) - num_skips.size
        }

        if (isNaN(skips_remaining) || skips_remaining === 0) {
            serverSkips.delete(message.guild.id)
            return player.stop()
        } else {
            msg = `You need ${num_skips.size}/${skips_remaining + 1} to play the next song!`
            return message.channel.send(returnM("Music Player", msg))
        }

    }
}
module.exports = skip
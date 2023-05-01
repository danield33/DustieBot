//ProNanigans | 5-27=19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');
const lyr = require('lyrics-fetcher');


// Please replace Name on line 7 and 27 to command name.
class lyrics extends Command {
    constructor() {
        super({
            name: 'lyrics',
            aliases: ['lyr'], // REMOVE THIS IF THERE IS NONE!
            description: 'View the lyrics of a song',
            category: 'voice', //LOWER CASE!!!!
            usage: 'lyrics <nothing for the current song playing / song title>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-file-alt'
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.voice.lyrics.toggle")) return message.reply("That command is not enabled on this server | guild.")

        let serverQueue = queue.get(message.guild.id);
        if (!args[0]) {
            lyr.fetch('Sting', `${serverQueue.songs[0].title}`, function (err, lyrics) {
                if (!lyrics) return message.reply("Couldn't find anything for your search!");
                if (lyrics.length > 2048) {
                    lyrics = lyrics.slice(0, lyrics.length - (2048 - 20))
                }
                if (lyrics.includes('<title>')) return message.reply("Couldn't find anything about your search. Make sure you spelled it right or try again later");
                let uEmbed = new Discord.RichEmbed()
                    .setTitle(args.join(' '))
                    .setDescription(`${lyrics}`)
                    .setColor(bot.embed)
                    .setFooter(`Requested by ${message.author.username}`)
                    .setTimestamp();
                return message.channel.send(uEmbed)
            });

        }

        lyr.fetch('Sting', `${args.join(' ')}`, function (err, lyrics) {
            if (!lyrics) return message.reply("Couldn't find anything for your search!");
            if (lyrics.length > 2048) {
                lyrics = lyrics.slice(0, lyrics.length - (2048 - 20))
            }
            if (lyrics.includes('<title>')) return message.reply("Couldn't find anything about your search. Make sure you spelled it right or try again later");
            let uEmbed = new Discord.RichEmbed()
                .setTitle(args.join(' '))
                .setDescription(`${lyrics}`)
                .setColor(bot.embed)
                .setFooter(`Requested by ${message.author.username}`)
                .setTimestamp();
            return message.channel.send(uEmbed)
        });
    }
}
module.exports = lyrics

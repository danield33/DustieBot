//ProNanigans | 3 - 23 - 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class nowplaying extends Command {
    constructor() {
        super({
            name: 'nowplaying',
            aliases: ['np'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows you what is now playing',
            category: 'voice', //LOWER CASE!!!!
            usage: 'nowplaying',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: ''
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

        if (!db.modules.voice.nowplaying.toggle) return message.reply("That command is not enabled on this server | guild.")
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let serverQueue = queue.get(message.guild.id)
        let player = bot.player.get(message.guild.id);
        if (!player) return message.channel.send(returnM("Music Player", "Currently not playing anything"));
        let pos = player.state.position / 1000
        let time = serverQueue.songs[0].time / 1000
        if (pos.toString().includes('.')) pos = Math.floor(pos);
        let ttime = serverQueue.songs[0].time
        let embed = new Discord.RichEmbed()
            .setAuthor('Music Player', bot.user.avatarURL)
            .setColor(bot.embed)
            .addField('Now Playing', `**[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})** - by **${serverQueue.songs[0].author}**`)
            .setThumbnail(serverQueue.songs[0].thumbnailurl)
            .addField("▪▪▪▪▪▪▪▪▪▪".substr(0, Math.floor((pos * 1000) / (ttime / 10)) - 1) + '🔴' + "▪▪▪▪▪▪▪▪▪▪".substr(Math.floor((pos * 1000) / (ttime / 10))), msToTime(player.state.position))
            .setFooter(`Requested by: ${serverQueue.songs[0].user.username}`)
            .setTimestamp()

        return message.channel.send(embed)//returnM("Music Player", `Currently playing **${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**. \n [${pos}s/${serverQueue.songs[0].time/1000}s]`))
    }
}
function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
   
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
   
    return hours + ":" + minutes + ":" + seconds;
   }
module.exports = nowplaying
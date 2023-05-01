//ProNanigans | 5-27-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');


// Please replace Name on line 7 and 27 to command name.
class remove extends Command {
    constructor() {
        super({
            name: 'remove',
            //aliases: [ 're' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Removes a specific song in the queue',
            category: 'voice', //LOWER CASE!!!!
            usage: 'remove <location of song in the queue>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-eraser'
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music/voice
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

        if (!await Guild.get(message.guild.id, "modules.voice.remove.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        if (isNaN(args[0])) return message.channel.send(returnM("Error", "Please specify a number in the queue"))
        let serverQueue = queue.get(message.guild.id)
        if (args[0] > serverQueue.songs.length || args[0] < 1) return message.channel.send(returnM("Error", "There is no song in that position"))
        function checksong(list) {
            return list != serverQueue.songs[args[0] - 1];
        }
        message.channel.send(returnM("Error", `Removed **${serverQueue.songs[args[0] - 1].title}** for you!`));

        return serverQueue.songs = serverQueue.songs.filter(checksong)
    }
}
module.exports = remove

//ProNanigans | 3-23-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class queueloop extends Command {
    constructor() {
        super({
            name: 'queueloop',
            aliases: ['loopqueue', 'lq', 'ql', `loop`], // REMOVE THIS IF THERE IS NONE!
            description: 'Loops the entire queue',
            category: 'voice', //LOWER CASE!!!!
            usage: 'd.queueloop',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-undo-alt'
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music
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

        if (!await Guild.get(message.guild.id, "modules.voice.queueloop.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let player = bot.player.get(message.guild.id);
        if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
        const serverQueue = queue.get(message.guild.id);
        if (!message.member.voiceChannel) return message.channel.send(returnM("Error", "You're not in a voice channel"));
        if (!serverQueue) return message.channel.send(returnM("Error", "There is nothing playing that I can loop"));
        //if (serverQueue.playing === false) return message.reply("The voice is paused");

        if (serverQueue.serverloop == true) {
            serverQueue.serverloop = false;
            return message.channel.send(returnM("Music Player", "Stopping Queue Loop"))
        }
        serverQueue.serverloop = true;
        return message.channel.send(returnM("Music Player", "Now looping the queue"))
    }
}
module.exports = queueloop
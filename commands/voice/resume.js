//ProNanigans | 3-23-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class resume extends Command {
    constructor() {
        super({
            name: 'resume',
            aliases: ['r'], // REMOVE THIS IF THERE IS NONE!
            description: 'Resumes the thing paused',
            category: 'voice', //LOWER CASE!!!!
            usage: 'resume',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-play'
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
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        if (!await Guild.get(message.guild.id, "modules.voice.resume.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let player = bot.player.get(message.guild.id);
        if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
        if (!message.member.voiceChannel) return message.channel.send(returnM("Error", "You must be in a voice channel to perform this command."))
        await player.pause(false);
        return message.channel.send(returnM("Error", 'I resumed the music for you'));
    }
}
module.exports = resume
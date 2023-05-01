//ProNanigans | 3 - 23 - 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class loop extends Command {
    constructor() {
        super({
            name: 'loop',
            aliases: ['l'], // REMOVE THIS IF THERE IS NONE!
            description: 'Loops the current song',
            category: 'voice', //LOWER CASE!!!!
            usage: 'loop',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db, queue) { // add ', queue' if working with music
        // CODE HERE
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")
        function returnM(title, string) {
            let embed = new Discord.RichEmbed()
                .setAuthor(title, bot.user.avatarURL)
                .setColor(bot.embed)
                .setDescription(string)
                .setFooter(message.author.username, message.author.avatarURL)
                .setTimestamp()
            return embed
        }

        let player = bot.player.get(message.guild.id);
        if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send(returnM("Error", "There is nothing playing that I can loop"));
        if (serverQueue.loop === true) {
            serverQueue.loop = false;
            return message.channel.send(returnM("Music Player", "Stopping Loop"))
        }
        serverQueue.loop = true;
        return message.channel.send(returnM("Music Player", "Looping current song!"))
    }
}
module.exports = loop
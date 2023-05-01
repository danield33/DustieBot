//ProNanigans | 5-27-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class move extends Command {
    constructor() {
        super({
            name: 'move',
            //aliases: ['m'], // REMOVE THIS IF THERE IS NONE!
            description: 'Moves a song in the queue from one position to another',
            category: 'voice', //LOWER CASE!!!!
            usage: 'move <song position> <new song position>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-exchange-alt'
        })
    }
    async run(message, args, bot, db, queue) { // add ', queue' if working with music/voice
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

        if (!db.modules.voice.move.toggle) return message.reply("That command is not enabled on this server | guild.")
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")
        let player = bot.player.get(message.guild.id);
        if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
        let serverQueue = queue.get(message.guild.id);
        let ssong = args[0] - 1;
        let pos = args[1] - 1;
        if (ssong > serverQueue.songs.length || ssong < 1 || pos > serverQueue.songs.length || pos < serverQueue.songs.length) return message.channel.send(returnM("Error", "That is not a valid position"))

        function arrayMove(arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; // for testing
        };
        arrayMove(serverQueue.songs, ssong, pos)

        return message.channel.send(returnM("Music Player", 'Moved song positions'))
    }
}
module.exports = move

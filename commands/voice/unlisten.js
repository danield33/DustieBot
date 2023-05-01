//ProNanigans | 25-7-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class unlisten extends Command {
    constructor() {
        super({
            name: 'unlisten',
            aliases: ['ul'], // REMOVE THIS IF THERE IS NONE!
            description: 'Stop listening to someone\'s  spotify',
            category: 'voice', //LOWER CASE!!!!
            usage: 'unlisten',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db, queue) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let serverQueue = queue.get(message.guild.id)
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel");
        if (!serverQueue) return message.reply("There's nothing playing");
        if (serverQueue.listen == false) return message.reply("I'm not streaming anyone's spotify");
        serverQueue.listen = false
        let player = bot.player.get(message.guild.id);
        message.channel.send(`Stopped listening to users spotify`)
    }
}
module.exports = unlisten
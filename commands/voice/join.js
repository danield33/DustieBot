//ProNanigans | 3-6-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class join extends Command {
    constructor() {
        super({
            name: 'join',
            aliases: ['summon', 'j'], // REMOVE THIS IF THERE IS NONE!
            description: 'Joins the current voice channel you\'re in',
            category: 'voice', //LOWER CASE!!!!
            usage: 'join',
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
        let voiceChannel = message.member.voiceChannel;
        let serverQueue = queue.get(message.guild.id)
        if (!voiceChannel) return message.reply("You're not in a voice channel");
        voiceChannel.join();
        serverQueue.channel = message.member.voiceChannel
        message.channel.send("Joined the voice channel!");
    }
}
module.exports = join
//ProNanigans | 5-28-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');


// Please replace Name on line 7 and 27 to command name.
class removeduplicates extends Command {
    constructor(){
        super({
            name: 'removeduplicates',
            aliases: [ 'removedups', 'rd' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Remove duplicate songs in the queue',
            category: 'voice', //LOWER CASE!!!!
            usage: 'removeduplicates',
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
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

    let serverQueue = queue.get(message.guild.id);

serverQueue.songs = Array.from(new Set(serverQueue.songs.map(a => a.track))).map(track => {
   return serverQueue.songs.find(a => a.track === track)
 })
    message.channel.send("Removed all the duplicate songs!");

    }
}
module.exports = removeduplicates

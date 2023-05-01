//ProNanigans | 5-28-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');


// Please replace Name on line 7 and 27 to command name.
class queuejump extends Command {
    constructor(){
        super({
            name: 'queuejump',
            aliases: [ 'qj', 'jq', 'jumpqueue', 'skipto', 'st' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Jump ahead in the queue.',
            category: 'voice', //LOWER CASE!!!!
            usage: 'queuejump <#> ',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.voice.queuejump.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let serverQueue = queue.get(message.guild.id);
        if(!serverQueue) return message.reply("There's nothing playing at this time");
        if(isNaN(args[0]) || args[0] > serverQueue.length || args[0] < 0) return message.reply('Please specify a number in the queue');
         let pos = args[0] - 2;
        serverQueue.songs.splice(1, pos);
        return message.channel.send(`Jumped ahead to position ${args[0]} in the queue`)
 
    }
}
module.exports = queuejump

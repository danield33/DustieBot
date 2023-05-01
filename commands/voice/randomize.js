//ProNanigans | 20-6-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');

// Please replace Name on line 7 and 27 to command name.
class randomize extends Command {
    constructor(){
        super({
            name: 'randomize',
            aliases: [ 'shuffle', 'r', 'mix' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Mixes up the current queue',
            category: 'voice', //LOWER CASE!!!!
            usage: 'randomize',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music/voice
        // CODE HER
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let serverQueue = queue.get(message.guild.id);
    if(!serverQueue) return message.reply("There's nothing playing");
    if(!message.member.voiceChannel) return message.reply("Please join a voice channel first");
    let arr = []
    for(let i in serverQueue.songs){
        let r = Math.floor(Math.random()*serverQueue.songs);
        arr.splice(r, 0, serverQueue.songs[i]);
    }
    serverQueue.songs = arr

    message.channel.send(`Shuffled the queue for you!`)

    }
}
module.exports = randomize
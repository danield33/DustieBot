//ProNanigans | 5-28-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');
const ms = require('ms')

// Please replace Name on line 7 and 27 to command name.
class forward extends Command {
    constructor(){
        super({
            name: 'forward',
            aliases: [ 'for' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Skip ahead from your current position in a song',
            category: 'voice', //LOWER CASE!!!!
            usage: 'forward <#s/m/h>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-forward'
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.voice.rewind.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")
        let serverQueue = queue.get(message.guild.id)
        let player = bot.player.get(message.guild.id)
        if(!serverQueue || !player) return message.reply("I am currently not playing any thing right now");
        let pos = player.state.position + ms(args[0])
        player.seek(pos)
    message.channel.send(`Skipped ahead by ${args[0]}`)

    }
}
module.exports = forward

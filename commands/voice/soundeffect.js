//ProNanigans | 3 - 30- 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const ytdl = require('ytdl-core')

// Please repalce Name on line 7 and 25 to command name.
class Sound extends Command {
    constructor() {
        super({
            name: 'soundeffect',
            aliases: ['sound', 'se', 'sfx'], // REMOVE THIS IF THERE IS NONE!
            description: 'Playes the requested sound effect',
            category: 'voice', //LOWER CASE!!!!
            usage: 'soundeffect <#>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: true // Disable the command if anything
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.voice.soundeffect.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

        let cussfx = await Guild.get(message.guild.id, 'modules.voice.soundeffect.customsfx')
        let sfx = ['https://www.youtube.com/watch?v=J4X2b-CEGNg']//idk what sound effects we should use so a fart should do;
        const voiceChannel = message.member.voiceChannel;
        const serverQueue = queue.get(message.guild.id);
        let currChannel
        if (!voiceChannel) return message.reply("Please join a voice channel first!");
        if (args[0] === 'list') {
            message.channel.send(`Custom: ${cussfx} \n Default: ${sfx} \n Type the number you want to play: d.soundeffect <number> To play a custom sfx do: d.soundeffect custom <number>`)
        }
        let song
        if (args[0] === 'custom' || args[0] === 'cus') {
            song = cussfx[args[1]]
        } else {
            song = sfx[args[0]]
        }
        if (!serverQueue || serverQueue.playing === false) {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playStream(ytdl(song))
            });
        } else {
            try {
                serverQueue.sfx.push(song)
            } catch (err) {
                message.channel.send(err)
            }

        }
    }
}
module.exports = Sound
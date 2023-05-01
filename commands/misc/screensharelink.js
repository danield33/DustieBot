//ProNanigans | 17\7\19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');

// Please replace Name on line 7 and 27 to command name.
class screensharelink extends Command {
    constructor(){
        super({
            name: 'screensharelink',
            aliases: [ 'ssl' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Provides you a link so you can screen share in a voice channel (Does not work on mobile.)',
            category: 'misc', //LOWER CASE!!!!
            usage: 'screensharelink',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        let voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.reply("You must be in a channel first");
        let sEmbed = new Discord.RichEmbed()
        .setDescription(`[VoiceChannel: ${voiceChannel.name}](https://www.discordapp.com/channels/${message.guild.id}/${voiceChannel.id})`)
        .setColor(bot.embed);

        message.channel.send(sEmbed)
    }
}
module.exports = screensharelink
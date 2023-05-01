//DEV NAME HERE | DATE HERE
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class Emojis extends Command {
    constructor() {
        super({
            name: 'emojis',
            description: 'Lists the guilds/servers custom emojis.',
            category: 'misc', //LOWER CASE!!!!
            usage: 'emojis',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.misc.emojis.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let emojis;
        if (message.guild.emojis.size === 0) emojis = 'There are no emojis on this server.'
            emojis = `**Server Emoji:**\n${message.guild.emojis.map(e => e).join(' ')}`;
        return message.channel.send(emojis/*,{split:{maxLength:1950}}*/);
    }
}
module.exports = Emojis

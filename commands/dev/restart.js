//Ned | 09/06/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');

// Please replace Name on line 7 and 27 to command name.
class Restart extends Command {
    constructor() {
        super({
            name: 'restart',
            description: 'Restarts the whole bot!',
            category: 'dev', //LOWER CASE!!!!
            usage: 'restart',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        await message.channel.send("Restarting myself👀")
        process.exit(1)
    }
}
module.exports = Restart
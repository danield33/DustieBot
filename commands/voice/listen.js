//DEV NAME HERE | DATE HERE
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');

// Please replace Name on line 7 and 27 to command name.
class Name extends Command {
    constructor(){
        super({
            name: '',
            aliases: [ '' ], // REMOVE THIS IF THERE IS NONE!
            description: '',
            category: '', //LOWER CASE!!!!
            usage: '',
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
    }
}
module.exports = Name
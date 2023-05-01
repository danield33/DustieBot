//Ned | 02/05/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please replace AutoMod on line 7 and 27 to command name.
class AutoMod extends Command {
    constructor() {
        super({
            name: 'automod',
            aliases: ['am'], // REMOVE THIS IF THERE IS NONE!
            description: 'Set automod role - Can be done over the dashboard',
            category: 'owner', //LOWER CASE!!!!
            usage: 'automod @role',
            dev: false, // Developers only, defined in index.js
            owner: true, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: true // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice

    }
}
module.exports = AutoMod

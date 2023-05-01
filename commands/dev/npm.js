
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const superagent = require('superagent')
const fetch = require('node-fetch')

// Please replace Name on line 7 and 27 to command name.
class Name extends Command {
    constructor(){
        super({
            name: 'npm',
            aliases: [ 'package' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows you information about a specific npm package',
            category: 'dev', //LOWER CASE!!!!
            usage: 'npm <package>',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        let search = args.join(' ');
        let url = `https://www.npmjs.com/package/${search}`;
        let data = await superagent.get(url)
        console.log(data)

    }
}
module.exports = Name
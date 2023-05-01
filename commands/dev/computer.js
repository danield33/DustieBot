//ProNanigans | 9-8-19 // For Ned
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
var PushBullet = require('pushbullet');
var pusher = new PushBullet('o.0SZraqcEw0LkRJwqNSkxXLQspiLNZ4fy');

// Please replace Name on line 7 and 27 to command name.
class computer extends Command {
    constructor(){
        super({
            name: 'copmuter',
            aliases: [ 'comp' ], // REMOVE THIS IF THERE IS NONE!
            description: 'turn neds computer on or off',
            category: 'dev', //LOWER CASE!!!!
            usage: 'computer',
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
        pusher.devices(function(error, response) {
            // response is the JSON response from the API
            console.log(response)
        });


    }
}
module.exports = computer
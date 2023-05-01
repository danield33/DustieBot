//Ned 27/04/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
var speedTest = require('speedtest-net');
var test = speedTest({ maxTime: 5000 });

// Please replace SpeedTest on line 7 and 27 to command name.
class SpeedTest extends Command {
    constructor() {
        super({
            name: 'speedtest',
            description: 'Runs the servers speed test!',
            category: 'dev', //LOWER CASE!!!!
            usage: 'speedtest',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        test.on('data', data => {
            let embed = new Discord.RichEmbed()
                .setAuthor("Speed test", bot.user.avatarURL)
                .setColor(bot.embed)
                .addField("Download", Math.floor(data.speeds.download), true)
                .addField("Upload", Math.floor(data.speeds.upload), true)
                .setFooter(`Ping to the server: ${data.server.ping}`)

            return message.channel.send(embed)
        });

        test.on('error', err => {
            return message.channel.send("There was an error, try agian!")
        });
    }
}
module.exports = SpeedTest

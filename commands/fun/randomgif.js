//Myst | 24.07.2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const request = require('superagent');

// Please replace Name on line 7 and 27 to command name.
class randomgif extends Command {
    constructor(){
        super({
            name: 'randomgif',
            aliases: [ 'rgif' ], // REMOVE THIS IF THERE IS NONE!
            description: 'generates a random gif based on the topic you provided',
            category: 'fun', //LOWER CASE!!!!
            usage: '',
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
        //if (!await Guild.get(message.guild.id, "modules.fun.cat.toggle")) return message.reply("That command is not enabled on this server | guild.")
    let embed = new Discord.RichEmbed()
    .setImage(body.message);
        request
            .get('http://api.giphy.com/v1/gifs/random')
            .set('api_key', 'dc6zaTOxFJmzC')
            .query({ rating: message.channel.nsfw === true ? 'r' : 'pg13', fmt: 'json' })
            .query(`tag=${args.join('+')}`)
            .then(res => {
                if (res.statusCode !== 200 || res.body.meta.status !== 200) return console.log('API_ERROR')
                if (res.body.data.id !== undefined) {
                    return message.channel.send(`http://media.giphy.com/media/${res.body.data.id}/giphy.gif`)
                    let embed = new Discord.RichEmbed()
        //.setImage(http://media.giphy.com/media/${res.body.data.id}/giphy.gif);
                    const attachment = new Discord.Attachment(body, 'crabs.mp4');
        return message.channel.send(attachment);
                } else{
                    return console.log(`BOORU_NO_RESULTS, ${args}`);
                }
            });
    }
}

module.exports = randomgif
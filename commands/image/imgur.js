//ProNanigans | 3-15-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const superagent = require('superagent')
const imgur = require('imgur')

// Please repalce Name on line 7 and 25 to command name.
class image extends Command {
    constructor() {
        super({
            name: 'imgur',
            aliases: ['image', 'pic', 'picture'], // REMOVE THIS IF THERE IS NONE!
            description: 'Displayes an image form imgur',
            category: 'image', //LOWER CASE!!!!
            usage: 'imgur <Search Query>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.fun.image.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!args[0]) return message.reply("Please specify a string to search");
        let sQuery = args.join(' ');
        let pageNum = Math.floor(Math.random() * 10)
        let string;
        if (pageNum <= 3) string = 'year';
        else if (pageNum <= 6 && pageNum > 3) string = 'month';
        else if (pageNum > 6 && pageNum <= 9) string = 'week'
        else string = 'year'
        let opParams = { sort: 'top', dataRange: `${string}`, page: 1 }
        imgur.search(sQuery)
            .then(function (json, opParams) {
                let p = Math.floor(Math.random() * json.data.length)
                if (!json.data[p].link) return message.reply("Couldn't find anything related to " + sQuery + '. Try again or come back later')
                let embed = new Discord.RichEmbed().setColor("#36393F").setImage(json.data[p].link)
                message.channel.send(json.data[p].link)//changed due to .setImage doesn't work with gifs (i think. It's just not working)
            }).catch(err => message.channel.send('Something went wrong trying to find your search'))

    }
}
module.exports = image
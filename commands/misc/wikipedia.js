//ProNanigans | 4-10-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const wikipedia = require('wikipedia-js')

// Please repalce Name on line 7 and 27 to command name.
class Name extends Command {
    constructor() {
        super({
            name: 'wikipedia',
            aliases: ['wiki', 'wikisearch'], // REMOVE THIS IF THERE IS NONE!
            description: 'Searches wikipedia for you query',
            category: 'misc', //LOWER CASE!!!!
            usage: 'd.wikipedia <search query>',
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
        if (!await Guild.get(message.guild.id, "modules.misc.wikipedia.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!args[0]) return message.reply("Please specify what to search")
        let searchQuery = args.slice(0).join(' ');
        let sOptions = { query: searchQuery, format: 'html', summaryOnly: true };
        wikipedia.searchArticle(sOptions, function (err, htmlWikiText) {
            if (err) {
                return message.channel.send("An error occured trying to find this article");
            }
            let r = /<(.*?)>/g
            let r2 = /"(.*?)"/g
            let s = htmlWikiText;
            if (!s) s = "Couldn't fine anything relating to your search";
            s = s.replace(r, '');
            s = s.replace(r2, '')
            if (s.length <= 2048) {
                let wEmbed = new Discord.RichEmbed()
                    .setTitle(`Wikipedia Search For: \n${searchQuery}`)
                    .setColor(bot.embed)
                    .setDescription(s)
                    .addField('Link:', `https://en.wikipedia.org/wiki/${args.slice(0).join('_')}`);
                message.channel.send(wEmbed)
            } else if (s.length > 2048) {
                let arr = [s]
                var i, j, chunk = 2048;
                for (i = 0, j = s.length; i < j; i += chunk) {
                    arr = s.slice(i, i + chunk);
                    let aEmbed = new Discord.RichEmbed()
                        .setTitle(`Wikipedia Search For: \n ${searchQuery}`)
                        .setColor(bot.embed)
                        .setDescription(arr)
                        .addField('Link:', `https://en.wikipedia.org/wiki/${args.slice(0).join('_')}`);
                    message.channel.send(aEmbed)
                }
            } else return message.reply("Something went wrong")
        })

    }
}
module.exports = Name
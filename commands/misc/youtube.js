//Ned | 14/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyBrQhDJ_S2KTDNof2SS_muxDeqF5dHvOmo")

// Please repalce Name on line 7 and 25 to command name.
class Youtube extends Command {
    constructor() {
        super({
            name: 'youtube',
            aliases: ['yt', 'ytsearch'], // REMOVE THIS IF THERE IS NONE!
            description: 'Search for a Youtube video you choose.',
            category: 'misc', //LOWER CASE!!!!
            usage: 'youtube (video name)',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, queue) {
        if (!await Guild.get(message.guild.id, "modules.misc.youtube.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!args[0]) return message.reply("Please provide a video name.")
        let vName = args.join(" ")
        let msg = await message.channel.send("Searching...")

        let r = await youtube.search(vName, 5).catch(err => {
            if (err) return msg.edit("There was an error. Please try again later!")
            return msg.edit("There was an error. Please try again later!")
        })
        if (!r) return msg.edit("There was an error. Please try again later!")

        function pageS(p) {
            let embed = new Discord.RichEmbed()
                .setTitle("Youtube search")
                .setColor(bot.embed)
                .setImage(r[p].thumbnails.medium.url)
                .addField(r[p].raw.snippet.title, `**By**: ${r[p].raw.snippet.channelTitle}`)
                .setFooter(`Page: ${p + 1} | Command will delete in 120 seconds.`)
            return embed
        }

        let page = 0
        if (!r[page].thumbnails.medium.url) return msg.edit("There was an error. Please try again later!")
        setTimeout(async function () {
            await msg.edit(pageS(page))
            await msg.react("◀")
            await msg.react("🇸")
            await msg.react("▶")

            const Filter = (reaction, user) => user.id === message.author.id
            const collector = msg.createReactionCollector(Filter, { time: 120000 });
            const playFilter = (reaction, user) => user.id === message.author.id
            collector.on('collect', re => {
                if (re.emoji.name === "◀") {
                    re.remove(message.author)
                    page--
                    if (page < 0) page = 4
                    msg.edit(pageS(page))
                }
                if (re.emoji.name === "🇸") {
                    collector.stop()
                    msg.clearReactions()
                    return msg.edit(`Video you selected URL:\nhttps://www.youtube.com/watch?v=${r[page].id}`, { embed: null })
                }
                if (re.emoji.name === "▶") {
                    re.remove(message.author)
                    page++
                    if (page > 4) page = 0
                    msg.edit(pageS(page))
                }
            })
        })
    }
}
module.exports = Youtube
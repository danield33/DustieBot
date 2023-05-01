//Ned | 23/04/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');

// Please replace Devs on line 7 and 27 to command name.
class Devs extends Command {
    constructor() {
        super({
            name: 'developers',
            aliases: ['devs'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows all Dustie developers in a menu style.',
            category: 'util', //LOWER CASE!!!!
            usage: 'desc',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        let developers = [
            {
                title: "Ned",
                description: "I'm the main Founder of Dustie, I manage all payments for the hosts and anything to do with it. And also make most command and manage the bot :shrug:",
                links: [
                    { name: "Youtube", link: "https://dustie.xyz/youtube" },
                    { name: "Twitch", link: "https://www.twitch.tv/dustie4ned" },
                    { name: "Instagram", link: "https://www.instagram.com/ned_st64/" }
                ]
            },
            {
                title: "Carlo",
                description: "Hey folks! I am the Founder of Dustie, with Ned. I am the only Website Developer of Dustie! If you have any questions, make sure to ping/me!",
                links: [
                    { name: "Youtube (Dustie)", link: "https://dustie.xyz/youtube" },
                    { name: "Twitch (Dustie)", link: "https://www.twitch.tv/dustie4ned" }
                ]
            },
            {
                title: "ProNanigans",
                description: "I'm the Co-Founder of Dustie. I help create commands, and manage the bot along with the other founders.",
                links: [

                ]
            },
            {
                title: "◢◤Myst◢◤",
                description: "Hey there, I'm a developer of Dustie. Feel free to tag/dm me if you're facing any problems with the bot.",
                links: [
                    { name: "Github(coming soon)", link: "https://github.com/" },
                    { name: "Youtube", link: "https://dustie.xyz/youtube" },
                ]
            },
            {
                title: "TheShadow#8124",
                description: "Hi! I'm a new developer for Dustie. This is my first big project but i've worked on many smaller bots. Feel free to DM me if you have issues :)",
                links: [
                    { name: "Github", link: "https://github.com/thewilloftheshadow" },
                    { name: "One of my projects", link: "https://github.com/cute-global-cats" },
                    { name: "Glitch", link: "https://glitch.com/@thewilloftheshadow" },
                ]
            }
        ]

        let page = 0
        function setpage(n) {
            let embed = new Discord.RichEmbed()
                .setColor(bot.embed)
                .addField(developers[n].title, developers[n].description)
            let footer = ""
            let footerSubtractionIndex = 3
            developers[n].links.forEach(l => {
                footer += `[${l.name}](${l.link})  |  `
            })
            if (!footer) {
                footer = "User has not provided any links!"
                footerSubtractionIndex = 0
            }
            embed.addField("Links:", footer.slice(0, footer.length - footerSubtractionIndex))
                .setFooter(`Current page: ${n + 1}`)

            return embed
        }

        let msg = await message.channel.send(setpage(page))

        await msg.react("◀")
        await msg.react("▶")
        await msg.react("❌")

        const Filter = (reaction, user) => user.id === message.author.id
        const collector = msg.createReactionCollector(Filter, { time: 120000 });

        collector.on('collect', re => {
            if (re.emoji.name === "◀") {
                re.remove(message.author).catch(err => { })
                page--
                if (page < 0) page = developers.length - 1
                msg.edit(setpage(page))
            }
            if (re.emoji.name === "▶") {
                re.remove(message.author).catch(err => { })
                page++
                if (page > developers.length - 1) page = 0
                msg.edit(setpage(page))
            }
            if (re.emoji.name === "❌") {
                collector.stop()
                msg.clearReactions().catch(err => { })
            }
        })

        collector.on('end', r => {
            msg.clearReactions().catch(err => { })
            msg.edit("Developer menu closed!", { embed: null }).then(m => { return m.delete(2500).catch(err => { }) })
        })

    }
}
module.exports = Devs

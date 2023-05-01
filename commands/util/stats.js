const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const cl = require('../../util/json/changelogs.js')
const http = require('http');
const ms = require("ms");
const os = require("os")

class Stats extends Command {
    constructor() {
        super({
            name: 'stats',
            aliases: ['stats', 'botstats'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows the bots current status and information.',
            category: 'util', //LOWER CASE!!!!
            usage: 'stats',
            dev: false,
            owner: false,
            mod: false,
            disabled: false
        })
    }
    async run(message, args, bot) {

        var web = async function (link) {
            return new Promise(resolve => {
                http.get(link, function (res) {
                    resolve(`<:online:554765866554753024> **online**`)
                }).on('error', function (e) {
                    resolve(`<:dnd:554765843918225413> **offline**`)
                });;
            })
        }
        let page = 3
        let changelogs = `${cl[cl.length - 3]}\n${cl[cl.length - 2]}\n${cl[cl.length - 1]}`
        async function embed(changelogs) {
            let embed = new Discord.RichEmbed()
                .setAuthor("Stats | Information", bot.user.displayAvatarURL)
                .setColor(bot.embed)
                .setTitle(`**Alpha** Shard **#1**`)
                .addField(
                    "General",
                    `Guilds: **${bot.guilds.size}**\nUsers: **${bot.users.size}**\nChannels: **${bot.channels.size}**
                `, true
                )
                .addField(
                    "System",
                    `RAM: **${Math.floor((os.totalmem() - os.freemem()) / 1024 / 1024)}/${Math.floor(os.totalmem() / 1024 / 1024)} MB**\nCPU usage: **${Math.round((os.loadavg().reduce((p, c) => p + c, 0) / os.loadavg().length) * 10)}%**\nPing: **${Math.floor(bot.ping)} ms**
                `, true
                )
                .addField(
                    "Status",
                    `Website: ${await web("http://23.96.6.108/")}\nAPI: ${await web("http://23.96.6.108/api")}\nBot: <:online:554765866554753024> **online**
                `, true
                )
                .addField(
                    "Links",
                    `[Website](https://dustie.xyz/) - [Dashboard](https://dustie.xyz/dashboard) - [Invite Bot](https://dustie.xyz/invite) - [Support Server](https://dustie.xyz/discord) - [Donate](https://www.patreon.com/dustie)
                `
                )
                .addField(
                    "Changelogs",
                    `\`\`\`${changelogs}\`\`\``
                )
                .setFooter(`Uptime: ${ms(bot.uptime, { long: true })}`, bot.user.displayAvatarURL)
            return embed
        }
        message.channel.send(await embed(changelogs)).then(async msg => {
            await msg.react('◀');//Nanigans
            await msg.react('▶');
            const Filter = (reaction, user) => user.id === message.author.id
            const collector = msg.createReactionCollector(Filter, { time: 120000 });
            collector.on('collect', async r => {
                r.remove(message.author)
                if (r.emoji.name === "◀") {
                    page -= 3
                    if (page <= 0) page = cl.length
                    changelogs = `${cl[cl.length - page]}\n${cl[cl.length - (page + 1)]}\n${cl[cl.length - (page + 2)]}`
                    if (page >= cl.length) changelogs = cl[cl.length - page]

                    msg.edit(await embed(changelogs))
                }

                if (r.emoji.name === "▶") {
                    page += 3
                    if (page >= cl.length) page = 3
                    changelogs = `${cl[cl.length - page]}\n${cl[cl.length - (page - 1)]}\n${cl[cl.length - (page - 2)]}`
                    msg.edit(await embed(changelogs))
                }
            });

        })
    }
}
module.exports = Stats

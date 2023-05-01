//Ned | 20/04/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class Config extends Command {
    constructor() {
        super({
            name: 'config',
            aliases: ['cfg'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows the current servers config.',
            category: 'owner', //LOWER CASE!!!!
            usage: 'cfg',
            dev: false, // Developers only, defined in index.js
            owner: true, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        let cfg = await Guild.get(message.guild.id)
        let image = cfg.modules.welcome.formatLS[0].setting.image[0]
        let text = cfg.modules.welcome.formatLS[0].setting.text[0]

        let pages =
            [
                {
                    title: "Settings",
                    overlap: true,
                    addField: [
                        { t: "Owners ID's", f: cfg.settings.ownersID.join("\n") },
                        { t: "Prefix", f: cfg.settings.botPrefix }, { t: "Premium", f: cfg.settings.botPremium },
                        { t: "Delete user message", f: cfg.settings.deleteSmessage }
                    ]
                },
                {
                    title: "Module | Moderation",
                    overlap: true,
                    addField: [
                        { t: "Module options", f: `Toggle: ${cfg.modules.moderation.toggle}\nLog Channel ID: ${cfg.modules.moderation.logchannel}\nAllowed rolesID: ${cfg.modules.moderation.allowedroles.join(", ")}` },
                        { t: "Kick", f: `Toggle: ${cfg.modules.moderation.kick.toggle}\nLog: ${cfg.modules.moderation.kick.log}\nMessage: ${cfg.modules.moderation.kick.message}` },
                        { t: "Ban", f: `Toggle: ${cfg.modules.moderation.ban.toggle}\nLog: ${cfg.modules.moderation.ban.log}\nMessage: ${cfg.modules.moderation.ban.message}` },
                        { t: "Mute", f: `Toggle: ${cfg.modules.moderation.mute.toggle}\nLog: ${cfg.modules.moderation.mute.log}\nMuted roleID: ${cfg.modules.moderation.mute.mutedrole}\nMessage: ${cfg.modules.moderation.mute.message}` },
                        { t: "Warn", f: `Toggle: ${cfg.modules.moderation.warn.toggle}\nLog: ${cfg.modules.moderation.warn.log}\nMessage: ${cfg.modules.moderation.warn.message}` },
                        { t: "Remove warn", f: `Toggle: ${cfg.modules.moderation.removewarn.toggle}\nLog: ${cfg.modules.moderation.removewarn.log}` },
                        { t: "Rename", f: `Toggle: ${cfg.modules.moderation.rename.toggle}\nLog: ${cfg.modules.moderation.rename.logs}` },
                        { t: "Banned words", f: `Toggle: ${cfg.modules.moderation.bannedwords.toggle}\nLog: ${cfg.modules.moderation.bannedwords.logs}\nMessage: ${cfg.modules.moderation.bannedwords.message}\nDefault: ${cfg.modules.moderation.bannedwords.default}\nCustom: ${cfg.modules.moderation.bannedwords.custom.join(",  ")}` },
                        { t: "Lockdown", f: `Toggle: ${cfg.modules.moderation.lock.toggle}\nLog: ${cfg.modules.moderation.lock.log}\nLocked: ${cfg.modules.moderation.lock.locked}` },
                        { t: "Clear", f: `Toggle: ${cfg.modules.moderation.rename.toggle}\nLog: ${cfg.modules.moderation.rename.logs}` },
                        { t: "Merge", f: `Toggle: ${cfg.modules.moderation.merge.toggle}\nLog: ${cfg.modules.moderation.merge.logs}` },
                    ]
                },
                {
                    title: "Module | Welcome - Image format",
                    overlap: false,
                    addField: [
                        { t: "Module options", f: `Toggle: ${cfg.modules.welcome.toggle}\nChannel: ${cfg.modules.welcome.channel}\nFormat: ${cfg.modules.welcome.format}\n(0 Image 1 Text 2 Embed)` },
                        { t: "First image:", f: `URL: ${image.url}\nCurve: ${image.curve}\nWidth: ${image.w}\nHight: ${image.h}\nPosition: ${image.x}, ${image.y}` },
                        { t: "First text:", f: `Message: ${text.msg}\nAuto size: ${text.asize}\nColour: ${text.color}\nPosition: ${text.x}, ${text.y}` }
                    ]
                },
                {
                    title: "Module | Welcome - Text format",
                    overlap: true,
                    addField: [
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." }
                    ]
                }, {
                    title: "Module | Welcome - Embed format",
                    overlap: true,
                    addField: [
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." },
                        { t: "Error", f: "Not found in database, or database changed." }
                    ]
                },
                {
                    title: "Module | Logs",
                    overlap: true,
                    addField: [
                        { t: "Toggle", f: cfg.modules.logs.toggle },
                        { t: "Log channel ID", f: cfg.modules.logs.logchannel }
                    ]
                },
                {
                    title: "Module | Fun",
                    overlap: true,
                    addField: [
                        { t: "Module information", f: `Enabled: ${cfg.modules.fun.toggle}` },
                        { t: "Meme", f: `Toggle: ${cfg.modules.fun.meme.toggle}` },
                        { t: "Joke", f: `Toggle: ${cfg.modules.fun.joke.toggle}` },
                        { t: "Cat picture", f: `Toggle: ${cfg.modules.fun.cat.toggle}` },
                        { t: "Dog picture", f: `Toggle: ${cfg.modules.fun.dog.toggle}` },
                        { t: "Cat fact", f: `Toggle: ${cfg.modules.fun.catfact.toggle}` },
                        { t: "Dog fact", f: `Toggle: ${cfg.modules.fun.dogfact.toggle}` },
                        { t: "Flip", f: `Toggle: ${cfg.modules.fun.flip.toggle}` },
                        { t: "Gottem", f: `Toggle: ${cfg.modules.fun.gottem.toggle}` },
                        { t: "Roll", f: `Toggle: ${cfg.modules.fun.roll.toggle}` },
                        { t: "Image", f: `Toggle: ${cfg.modules.fun.image.toggle}` },
                        { t: "Tic Tac Toe", f: `Toggle: ${cfg.modules.fun.tictactoe.toggle}` },
                        { t: "Connect four", f: `Toggle: ${cfg.modules.fun.connectfour.toggle}` }
                    ]
                }

            ]

        let page = 0
        function setpage(n) {
            let embed = new Discord.RichEmbed()
                .setColor("#36393F")
                .setTitle(pages[n].title)
            pages[n].addField.forEach(fld => {
                embed.addField(`**${fld.t}**`, `\`\`${fld.f}\`\``, pages[n].overlap)
            })
            embed.setFooter(`Current page: ${n + 1}`)

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
                if (page < 0) page = pages.length - 1
                msg.edit(setpage(page))
            }
            if (re.emoji.name === "▶") {
                re.remove(message.author).catch(err => { })
                page++
                if (page > pages.length - 1) page = 0
                msg.edit(setpage(page))
            }
            if (re.emoji.name === "❌") {
                collector.stop()
            }
        })

        collector.on('end', r => {
            msg.clearReactions().catch(err => { })
            msg.edit("Config closed!", { embed: null }).then(m => { return m.delete(2500).catch(err => { }) })
        })
    }
}

module.exports = Config
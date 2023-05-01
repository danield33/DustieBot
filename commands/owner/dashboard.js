//DEV NAME HERE | DATE HERE
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please replace Dashboard on line 7 and 27 to command name.
class Dashboard extends Command {
    constructor() {
        super({
            name: 'dashboard',
            aliases: ['db'], // REMOVE THIS IF THERE IS NONE!
            description: 'Discord type dashboard - Limited!',
            category: 'owner', //LOWER CASE!!!!
            usage: 'dashboard',
            dev: false, // Developers only, defined in index.js
            owner: true, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        let db = await Guild.get(message.guild.id)
        let num = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"]
        let responce = "The time has ran out! Try agian later!"
        let page = 0

        function mainPage() {
            let embed = new Discord.RichEmbed()
                .setAuthor("Main menu", `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                .setColor(db.settings.embedColor)
                .setDescription("This dashboard menu is not as efficient as the [web dashboard](https://dustie.xyz/dashboard)!")
                .addField(`${num[0]}Main settings`, "This includes the bot prefix and other settings.")
                .addField(`${num[1]}Modules settings`, "Includes every modules settings!")
                .addField(`${num[2]}Toggable commands`, "You can choose wether to another a command or not.")
                .setFooter("To save press 💾 To exit without saving press ❎ | 180 seconds to change anything!")
            return embed
        }

        function mainSettings() {
            let embed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} dashboard`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                .setColor(db.settings.embedColor)
                .addField(`${num[0]}Bot Prefix`, `\`${db.settings.botPrefix}\``, true)
                .addField(`${num[1]}Delete user msg`, `\`${db.settings.deleteSmessage}\``, true)
                .addBlankField()
                .addField(`${num[2]}Embed colours`, `\`${db.settings.embedColor}\``, true)
                .addField(`${num[3]}Bot Nickname`, `\`${message.guild.member(bot.user).displayName}\``, true)
                .setFooter("To save press 💾 To exit without saving press ❎ | 180 seconds to change anything!")

            return embed
        }

        function lembed(str) {
            let prefixembed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} dashboard`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                .setColor(db.settings.embedColor)
                .setDescription(str)
                .setFooter("To save press 💾 To exit without saving press ❎ | 180 seconds to change anything!")

            return prefixembed
        }

        function moduleSettings(n) {
            let embed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} modules`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                .setColor(db.settings.embedColor)
            switch (n) {
                case (1)://
                    var modules = [db.modules.moderation.toggle]
                    function m(num) { return modules[num] ? "<:online:554765866554753024>" : "<:dnd:554765843918225413>" }
                    embed.addField("​", `${num[0]}Moderation${m(0)}\n${num[1]}Welcome${m(1)}\n${num[2]}Goodbye${m(2)}\n${num[3]}Logs${m(3)}\n${num[4]}Fun${m(4)}`, true)
                    embed.addField("​", `${num[5]}Misc${m(5)}\n${num[6]}Image${m(6)}\n${num[7]}Voice${m(7)}\n${num[7]}NSFW${m(8)}\n${num[8]}Economy${m(9)}`, true)
                    embed.setFooter("To save press 💾 To exit without saving press ❎ | 180 seconds to change anything!")
                    return embed
                default:
                    return
            }
        }

        async function cReact(n) {
            await msg.react("❎")
            for (var i = 0; i < n; i++) await msg.react(num[i])
            await msg.react("💾")
        }

        let msg = await message.channel.send(mainPage())
        await cReact(3)

        const MsgFilter = m => m.author.id === message.author.id
        const Filter = (reaction, user) => user.id === message.author.id
        const collector = msg.createReactionCollector(Filter, { time: 120000 });

        collector.on('collect', async re => {
            re.remove(message.author).catch((err) => { })
            if (re.emoji.name === "❎") {
                responce = "Dashboard menu closed.\nNothing was saved"
                collector.stop()
            }
            else if (re.emoji.name === "💾") {
                responce = "Dashboard menu closed.\nAll settings have been updated!"
                await Guild.findOneAndUpdate({ guildid: message.guild.id }, db, { new: true, upsert: true, setDefaultsOnInsert: true }, function (error, result) {
                    if (error) console.log(error)
                })
                collector.stop()
            } else if (re.emoji.name === "🏠") {
                await msg.clearReactions()
                msg.edit(mainPage())
                await cReact(3)
                page = 0
            }

            switch (page) {
                case (0):
                    switch (re.emoji.name) {
                        case (num[0]):
                            page = 1
                            await msg.clearReactions()
                            msg.edit(mainSettings())
                            await cReact(4)
                            return await msg.react("🏠")
                        case (num[1]):
                            page = 2
                            await msg.clearReactions()
                            msg.edit(moduleSettings(1))
                            await msg.react("◀")
                            await cReact(10)
                            await msg.react("▶")
                            return await msg.react("🏠")
                        default:
                            return
                    }
                    return
                case (1):
                    switch (re.emoji.name) {
                        case (num[0]):
                            msg.edit(lembed("Please enter this guilds new \`prefix\`! You have 5 secodns"))
                            msg.channel.awaitMessages(MsgFilter, { max: 1, time: 5000 }).then((collected) => {
                                collected.first().delete()
                                db.settings.botPrefix = collected.first().content
                                msg.edit(mainSettings())
                            }).catch(() => {
                                msg.edit("You did not respond with a prefix, returning to main menu!", { embed: null })
                                setTimeout(function () { msg.edit(mainSettings()) }, 2500);
                            })
                            return
                        case (num[1]):
                            db.settings.deleteSmessage = !db.settings.deleteSmessage
                            msg.edit(mainSettings())
                            return
                        case (num[2]):
                            msg.edit(lembed("Please enter the HEX value for the \`embeds\` for this guild(Should look like \`#36393F\`)! You have 10 secodns"))
                            msg.channel.awaitMessages(MsgFilter, { max: 1, time: 10000 }).then((collected) => {
                                collected.first().delete()
                                db.settings.embedColor = collected.first().content
                                msg.edit(mainSettings())
                            }).catch(() => {
                                msg.edit("You did not respond with a HEX embed color, returning to main menu!", { embed: null })
                                setTimeout(function () { msg.edit(mainSettings()) }, 2500);
                            })
                            return
                        case (num[3]):
                            msg.edit(lembed("Please enter the new bots \`nickname\`! You have 10 secodns"))
                            msg.channel.awaitMessages(MsgFilter, { max: 1, time: 10000 }).then((collected) => {
                                collected.first().delete()
                                message.guild.member(bot.user).setNickname(collected.first().content)
                                msg.edit(mainSettings())
                            }).catch(() => {
                                msg.edit("You did not respond with new bots nickname, returning to main menu!", { embed: null })
                                setTimeout(function () { msg.edit(mainSettings()) }, 2500);
                            })
                            return
                        default:
                            return
                    }
                    return
                case (2):

                    return
                default:
                    return
            }

        })

        collector.on('end', async re => {
            let endembed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} dashboard`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                .setColor(db.settings.embedColor)
                .setDescription(responce)
            await msg.clearReactions().catch((err) => { })
            msg.edit(endembed)
            return msg.delete(3000)
        })
    }
}
module.exports = Dashboard

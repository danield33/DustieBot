//Ned 26/0/4/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Set on line 7 and 27 to command name.
class Set extends Command {
    constructor() {
        super({
            name: 'set',
            aliases: ['guildsettings'], // REMOVE THIS IF THERE IS NONE!
            description: 'Updates default guild settings - Menu',
            category: 'dev', //LOWER CASE!!!!
            usage: 'set',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        let settings = db.settings
        let num = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"]
        let owners = settings.ownersID
        let responce;

        function embedS() {
            let embed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} settings`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                .setColor(settings.embedColor)
                .addField(`${num[0]}Bot Prefix`, `\`${settings.botPrefix}\``, true)
                .addField(`${num[1]}Delete user msg`, `\`${settings.deleteSmessage}\``, true)
                .addBlankField()
                .addField(`${num[2]}Guild premium`, `\`${settings.botPremium}\``, true)
                .addField(`${num[3]}Embed colours`, `\`${settings.embedColor}\``, true)
                .addBlankField()
                .addField(`${num[4]}Owner's IDS`, `\`${owners.join(" | ")}\`\n\nGUILD OWNER IS IN BY DEFAULT!`)
                .setFooter("You have 120 seconds to save changes or cancel!")

            return embed
        }

        let msg = await message.channel.send(embedS())
        await msg.react("✅")
        for (var i = 0; i < 5; i++) await msg.react(num[i])
        await msg.react("❎")

        const MsgFilter = m => m.author.id === message.author.id
        const Filter = (reaction, user) => user.id === message.author.id
        const collector = msg.createReactionCollector(Filter, { time: 120000 });

        collector.on('collect', async re => {
            re.remove(message.author).catch((err) => { })
            switch (re.emoji.name) {
                case (num[0]):
                    let prefixembed = new Discord.RichEmbed()
                        .setAuthor(`${message.guild.name} settings`, message.guild.splash)
                        .setColor(settings.embedColor)
                        .setDescription("Please enter this guilds new \`prefix\`! You have 5 secodns")
                        .setFooter("You have 120 seconds to save changes or cancel!")
                    msg.edit(prefixembed).then(() => {
                        msg.channel.awaitMessages(MsgFilter, { max: 1, time: 5000 }).then((collected) => {
                            collected.first().delete()
                            settings.botPrefix = collected.first().content
                            msg.edit(embedS())
                        }).catch(() => {
                            msg.edit("You did not respond with a prefix, returning to main menu!", { embed: null })
                            setTimeout(function () { msg.edit(embedS()) }, 2500);
                        })
                    })
                    return
                case (num[1]):
                    settings.deleteSmessage = !settings.deleteSmessage
                    return msg.edit(embedS())
                case (num[2]):
                    settings.botPremium = !settings.botPremium
                    return msg.edit(embedS())
                case (num[3]):
                    let embedembed = new Discord.RichEmbed()
                        .setAuthor(`${message.guild.name} settings`, message.guild.splash)
                        .setColor(settings.embedColor)
                        .setDescription("Please enter the HEX value for the \`embeds\` for this guild(Should look like \`#36393F\`)! You have 10 secodns")
                        .setFooter("You have 120 seconds to save changes or cancel!")
                    msg.edit(embedembed).then(() => {
                        msg.channel.awaitMessages(MsgFilter, { max: 1, time: 10000 }).then((collected) => {
                            collected.first().delete()
                            settings.embedColor = collected.first().content
                            msg.edit(embedS())
                        }).catch(() => {
                            msg.edit("You did not respond with a HEX embed color, returning to main menu!", { embed: null })
                            setTimeout(function () { msg.edit(embedS()) }, 2500);
                        })
                    })
                    return
                case (num[4]):
                    let ownerembed = new Discord.RichEmbed()
                        .setAuthor(`${message.guild.name} settings`, message.guild.splash)
                        .setColor(settings.embedColor)
                        .setDescription("\`add userID\`\n\nYou have 15 secodns")
                        .setFooter("You have 120 seconds to save changes or cancel!")
                    msg.edit(ownerembed).then(() => {
                        msg.channel.awaitMessages(MsgFilter, { max: 1, time: 15000 }).then((collected) => {
                            collected.first().delete()
                            if (collected.first().content.startsWith("add")) {
                                owners.push(collected.first().content.slice(4))
                                msg.edit(embedS())
                            } else {
                                collected.stop()
                            }
                        }).catch(() => {
                            msg.edit("You responded nothing!, returning to main menu!", { embed: null })
                            setTimeout(function () { msg.edit(embedS()) }, 2500);
                        })
                    })
                    return
                case ("❎"):
                    responce = "Closing guild editor!"
                    collector.stop()
                case ("✅"):
                    responce = `You have updated \`${message.guild.name}\` settings!`
                    await Guild.set(message.guild.id, "settings", settings)
                    collector.stop()
                default:
                    return
            }
        })

        collector.on('end', async r => {
            let endembed = new Discord.RichEmbed()
                .setAuthor(`${message.guild.name} settings`, message.guild.splash)
                .setColor(settings.embedColor)
                .setDescription(responce)
            await msg.clearReactions().catch((err) => { })
            msg.edit(endembed)
            return msg.delete(3000)
        })

    }
}
module.exports = Set

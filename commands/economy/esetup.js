//Ned | 17/04//19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Economy = require('../../util/models/economy')

// Please repalce Name on line 7 and 25 to command name.
class eSetup extends Command {
    constructor() {
        super({
            name: 'esetup',
            aliases: ['es', 'economysetup'], // REMOVE THIS IF THERE IS NONE!
            description: 'Create your economy account for the guild!',
            category: 'economy', //LOWER CASE!!!!
            usage: 'esetup',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        if (!await Guild.get(message.guild.id, "modules.economy.toggle")) return
        if (await Economy.check(message, message.author)) return message.reply(`Oh no, you already have an account setup :facepalm:`)
        Economy.createuser(message.guild.id, message.author.id).catch(error => {
            if (error) return message.reply("There was an problem please try again!")
        })

        let jobs = Economy.jobs
        let user = Economy.defaultSetup

        let embed = new Discord.RichEmbed()
            .setAuthor("Account created", message.author.avatarURL)
            .setColor(bot.embed)
            .addField("This is your new account details.",
                `On hand: **${user.onhand}**\nBank: **${user.bank}**\nLast daily: **Na**\nDaily streak: **${user.dailystreak}**\nCurrent Job: **${jobs[user.workid].name}**\nLast worked: **${user.lastworked}**\nWork streak: **${user.workstreak}**\n`)
            .setFooter(`${message.author.username} • ${new Date()}`)

        return message.channel.send(embed)

    }
}
module.exports = eSetup
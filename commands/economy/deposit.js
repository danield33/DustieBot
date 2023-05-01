//ArmourHUD/rockdog66 | 24/05/2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild, Economy, Levels } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class Deposit extends Command {
    constructor() {
        super({
            name: 'deposit',
            description: 'deposit money into your bank.',
            aliases: ['dep'], // REMOVE THIS IF THERE IS NONE!
            category: 'economy', //LOWER CASE!!!!
            usage: 'deposit <amount>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        if (!db.modules.economy.toggle) return
        if (!await Economy.check(message, message.author)) {
            Economy.createuser(message.guild.id, message.author.id).catch(err => {
                if (err) return message.reply('There was a problem setting up your economy, please try again')
            })
        }
        let luser = await Levels.user(message, message.author)
        let user = await Economy.user(message, message.author)
        if (!args[0]) return message.reply('Please specify an amount')
        let xpneeded = 5 / 6 * (luser.level + 1) * (2 * (luser.level + 1) * (luser.level + 1) + 27 * (luser.level + 1) + 91)
        let avgmessages = Math.ceil(xpneeded / (15 + 25) / 2)
        let max = Math.ceil((luser.totalxp / avgmessages) - (luser.commandsused / 2))
        if (isNaN(max)) max = 10
        if ((luser.xp + luser.totalxp) / (luser.level + 1) < xpneeded - luser.xp) max = 0

        //console.log(max, (luser.totalxp/avgmessages) , (luser.commandsused/2))
        if (args[0] === "all") {
            if (user.onhand == 0) return message.reply("You cannot not deposit nothing!")
            if (max == 0) return message.reply("Your bank is full of <:cr:567643915742871564> at this time")
            if ((new Date() - user.lastdeposit) < 900000) return message.reply(`Your bank is full at this time, try again later`)

            let deposit = 0
            if (user.onhand >= max) deposit = max
            if (user.onhand < max) deposit = user.onhand
            Economy.take(message.guild.id, message.author.id, "onhand", deposit)
            Economy.add(message.guild.id, message.author.id, "bank", deposit)
            message.channel.send(`Successfully deposited <:cr:567643915742871564>${deposit}`)
        } else if (user.onhand >= Number(args[0])) {
            if (isNaN(args[0])) return message.reply("Please specify a number")
            if (max == 0) return message.reply(`Your bank is full of <:cr:567643915742871564> at this time`)
            if (args[0] > max) args[0] = max
            Economy.take(message.guild.id, message.author.id, "onhand", args[0])
            Economy.add(message.guild.id, message.author.id, "bank", args[0])
            message.channel.send(`Successfully deposited <:cr:567643915742871564>${args[0]}`)
        } else {
            message.reply("Not enough money onhand")
        }
        await Economy.set(message.guild.id, message.author.id, "lastdeposit", new Date())

    }
}
module.exports = Deposit

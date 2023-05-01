//ArmourHUD/rockdog66 | 24/05/2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');


// Please replace Name on line 7 and 27 to command name.
class Withdraw extends Command {
    constructor() {
        super({
            name: 'withdraw',
            description: 'withdraw money from your bank.',
            category: 'economy', //LOWER CASE!!!!
            usage: 'withdraw <amount>',
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
        if (!await Guild.get(message.guild.id, "modules.economy.toggle")) return
        if(!await Economy.check(message, message.author)){
            Economy.createuser(message.guild.id, message.author.id).catch(err => {
            if(err) return message.reply('There was a problem setting up your economy, please try again')
               })
            }
           let user = await Economy.user(message, message.author)
        if (!args[0]) return message.reply('Please specify an amount')

        if (args[0] === "all") {
            if (user.bank === 0) return message.reply("You cannot not withdraw nothing!")
            Economy.take(message.guild.id, message.author.id, "bank", user.bank)
            Economy.add(message.guild.id, message.author.id, "onhand", user.bank)
            return message.channel.send(`Successfully withdrew <:cr:567643915742871564>${user.bank}`)
        } else if (user.bank >= Number(args[0])) {
            Economy.take(message.guild.id, message.author.id, "bank", args[0])
            Economy.add(message.guild.id, message.author.id, "onhand", args[0])
            message.channel.send(`Successfully withdrew <:cr:567643915742871564>${args[0]}`)
        } else {
            return message.reply("Not enough money on your bank account")
        }
        await Economy.set(message.guild.id, message.author.id, "lastdeposit", 0)

    }
}
module.exports = Withdraw

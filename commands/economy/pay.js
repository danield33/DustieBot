//ProNanigans | 6-4-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild, Economy } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class pay extends Command {
    constructor() {
        super({
            name: 'pay',
            aliases: ['give', 'donate'], // REMOVE THIS IF THERE IS NONE!
            description: 'Transfers your balance to someone elses balance',
            category: 'economy', //LOWER CASE!!!!
            usage: 'pay <@user> <amount>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!db.modules.economy.toggle) return
        let uUser = Guild.findUser(message, args.join(' '));
        if(!uUser) return message.reply("Couldn't find user")
        if (!await Economy.check(message, message.author)) {
            Economy.createuser(message.guild.id, message.author.id).catch(err => {
                if (err) return message.reply('There was a problem setting up your economy, please try again')
            })
        }
        if (!await Economy.check(message, uUser)) {
            Economy.createuser(message.guild.id, uUser.id).catch(error => {
                if (error) return message.reply("There was an problem please try again!")
            })
        }
        let user = Economy.user(message, message.author)
        if (isNaN(args[1]) || args[1] < 0 || args[1] > user.onhand) return message.reply("Please specify a valid number that you're able to pay with your onhand")
        if (uUser.id == message.author.id) return message.reply("Good job, you've given money to yourself")
        Economy.take(message.guild.id, message.author.id, 'onhand', args[1])
        Economy.add(message.guild.id, uUser.id, 'onhand', args[1])
        message.reply(`you've given ${uUser} ${args[1]} <:cr:567643915742871564>`)
    }
}
module.exports = pay
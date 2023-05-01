//Myst 13.04.2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild, Economy } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class balance extends Command {
    constructor() {
        super({
            name: 'balance',
            aliases: ['bal'], // REMOVE THIS IF THERE IS NONE!
            description: 'Displays your current balance.\nOwners can add \`-set -add -take -reset\` to to modify the account for a user!',
            category: 'economy', //LOWER CASE!!!!
            usage: 'balance (modification) @user (amount)',
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
        let user = await Economy.user(message, message.author)
        let owners = db.settings.ownersID
        owners.push(message.guild.owner.id)

        function rBal() {
            let embed = new Discord.RichEmbed()
                .setColor(bot.embed)
                .setTitle(`${message.author.username}`)
                .setDescription('View the leaderboard with ``d.leaderboard``')
                .addField('Cash on hand:', user.onhand)
                .addField('Bank:', user.bank)
                .addField('Net Worth:', user.onhand + user.bank)
                .setFooter("Requested By: " + message.author.username, message.author.avatarURL)
                .setTimestamp();
            return message.channel.send(embed);
        }

        if (!args[0]) rBal()
        else {
            if (!["-add", "-set", "-reset", "-take"].includes(args[0])) return rBal()
            if (!owners.includes(message.author.id)) return message.reply("Only the owner can perform these statements.")
            let muser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
            if (!muser) return message.reply("Please mention a user to perform these statements.")
            let am = args[2]
            let guild = message.guild.id
            switch (args[0]) {
                case "-add":
                    if (!am) return message.reply("Please specify an amount!")
                    await Economy.add(guild, muser.id, "onhand", am)
                    return message.reply(`Added $${am} to ${muser.user.username}!`)
                case "-set":
                    if (!am) return message.reply("Please specify an amount!")
                    await Economy.set(guild, muser.id, "onhand", am)
                    return message.reply(`Set ${muser.user.username}'s balance to $${am}!`)
                case "-reset":
                    await Economy.reset(guild, muser.id, "onhand")
                    await Economy.reset(guild, muser.id, "bank")

                    return message.reply(`Reset ${muser.user.username}'s account!`)
                case "-take":
                    if (!am) return message.reply("Please specify an amount!")
                    await Economy.take(guild.muser.id, "onhand", am)
                    return message.reply(`Taken $${am} from ${muser.user.username}!`)
                default:
                    return;
            }
        }
    }
}
module.exports = balance

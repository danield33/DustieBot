const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Economy = require('../../util/models/economy')
const arraySort = require('array-sort')

class Name extends Command {
    constructor() {
        super({
            name: 'leaderboard',
            aliases: ['lb', 'top'], // REMOVE THIS IF THERE IS NONE!
            description: 'View the Economy Leaderboard',
            category: 'economy', //LOWER CASE!!!!
            usage: 'leadernoard',
            dev: false,
            owner: false,
            mod: false,
            disabled: false
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.economy.toggle")) return
        let id = message.guild.id
        let users = await Economy.get(id, "users")



        let toppers = [];
        users.forEach(function (user) {
            toppers.push({
                userid: user.id,
                total: user.bank + user.onhand,
            })
        })
        arraySort(toppers, 'total', { reverse: true });

        let msg = [];
        let nmr = 1;
        await toppers.forEach(topper => {
            bot.fetchUser(topper.userid).then(user => {
                msg.push(`**${nmr}.** ${user.username}   **>>**   $${topper.total}`)
                nmr++;
            })
        })
        const embed = new Discord.RichEmbed()
            .setColor(bot.embed)
            .setTitle('Economy Leaderboard')
            .setDescription('The leaderboard is based on top **TOTAL** value!\n\n' + msg.join('\n'))
            .setFooter("Requested By: " + message.author.username, message.author.avatarURL)
            .setTimestamp();
        return message.channel.send(embed)

    }
}
module.exports = Name

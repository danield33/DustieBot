//Myst | 23.07.2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Level = require('../../util/models/levels')
const arraySort = require('array-sort')

// Please replace Name on line 7 and 27 to command name.
class levelleaderboard extends Command {
    constructor(){
        super({
            name: 'levelleaderboard',
            aliases: [ 'llb' ], // REMOVE THIS IF THERE IS NONE!
            description: 'View the Level Leaderboard',
            category: 'levels', //LOWER CASE!!!!
            usage: 'levelleaderboard',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.levels.toggle")) return message.reply("Leveling is not enabled within this server | guild")

        let id = message.guild.id
        let users = await Level.get(id, "users")

        let toppers = [];
        users.forEach(function (user) {
            toppers.push({
                userid: user.id,
                level: user.level,
                exp: user.totalxp
            })
        })
        arraySort(toppers, 'level', { reverse: true });

        let msg = [];
        let nmr = 1;
        await toppers.forEach(topper => {
            bot.fetchUser(topper.userid).then(user => {
                msg.push(`**${nmr}.** ${user.username}   **>>**  Level **${topper.level}** with **${topper.exp}** XP in total`)
                nmr++;
            })
        })
        const embed = new Discord.RichEmbed()
            .setColor(bot.embed)
            .setTitle('Level Leaderboard')
            .setDescription('The leaderboard is based on **levels**!\n\n' + msg.join('\n'))
            .setFooter("Requested By: " + message.author.username, message.author.avatarURL)
            .setTimestamp();
        return message.channel.send(embed)
        

    }
}
module.exports = levelleaderboard
//Ned | 26/04/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild, User } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace userPremium on line 7 and 27 to command name.
class userPremium extends Command {
    constructor() {
        super({
            name: 'userpremium',
            aliases: ['up'], // REMOVE THIS IF THERE IS NONE!
            description: 'Give user premium to someone!',
            category: 'dev', //LOWER CASE!!!!
            usage: 'userpremium @user',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        let user = Guild.findUser(message, args[0])
        if (!user) return message.reply("Please mention a user to give user premium!")

        let embed = new Discord.RichEmbed()
            .setAuthor("CONFORMATION NEEDED", bot.user.avatarURL)
            .setColor(bot.embed)
            .setDescription("Please click the **tick mark** to confirm this!\n\nBy confirming you are toggling this user all **PREMIUM FEATURES** for the bot!")
            .setFooter("You have 15 seconds to confirm!")

        let msg = await message.channel.send(embed)
        await msg.react("✅")
        await msg.react("❎")

        const Filter = (reaction, user) => user.id === message.author.id
        const collector = msg.createReactionCollector(Filter, { time: 120000 });

        collector.on('collect', async re => {
            if (re.emoji.name === "✅") {
                msg.edit(`User premium was given to ${user}!`, { embed: null })
                User.addOrRemove(user.id)
                collector.stop()
            } else if (re.emoji.name === "❎") {
                msg.edit(`User premium was canceled!`, { embed: null })
                collector.stop()
            }
        })
        collector.on('end', async re => {
            return msg.delete(2500)
        })
    }
}
module.exports = userPremium

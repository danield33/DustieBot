//ProNanigans | 3-19-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { User, Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class avatar extends Command {
    constructor() {
        super({
            name: 'avatar',
            aliases: ['icon'], // REMOVE THIS IF THERE IS NONE!
            description: 'Displays the avatar of the specified user',
            category: 'util', //LOWER CASE!!!!
            usage: 'd.avatar <@user>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        // CODE HERE
        let tUser = await Guild.findUser(message, args.join(' '));
        console.log(tUser)
        if (tUser) tUser = tUser.user
        if (!tUser) tUser = message.author
        let tEmbed = new Discord.RichEmbed()
            .setTitle(`${tUser.username}'s avatar`)
            .setColor(bot.embed)
            .setImage(tUser.displayAvatarURL);
        return message.channel.send(tEmbed);
    }
}
module.exports = avatar
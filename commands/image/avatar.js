//ProNanigans | 3-19-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class avatar extends Command {
    constructor() {
        super({
            name: 'avatar',
            aliases: ['icon'], // REMOVE THIS IF THERE IS NONE!
            description: 'Displays the avatar of the specified user',
            category: 'image', //LOWER CASE!!!!
            usage: 'd.avatar <@user>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        // CODE HERE
        //if (!await Guild.get(message.guild.id, "modules.image.avatar.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let tUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (tUser) tUser = tUser.user
        if (args[0]) {
            if (!args.join(" ").includes("@")) return message.reply("Please tag the user for it to work.")
        }
        if (!tUser) tUser = message.author
        let tEmbed = new Discord.RichEmbed()
            .setTitle(`${tUser.username}'s avatar`)
            .setColor('#36393F')
            .setImage(tUser.displayAvatarURL);
        return message.channel.send(tEmbed);
    }
}
module.exports = avatar
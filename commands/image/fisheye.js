//Ned | 18/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Jimp = require('jimp');

// Please repalce Name on line 7 and 25 to command name.
class Fisheye extends Command {
    constructor() {
        super({
            name: 'fisheye',
            description: 'Fisheye your avatar or the person you mentioned avatar or the image link.',
            category: 'image', //LOWER CASE!!!!
            usage: 'fisheye @user/url',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: true // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        //NOT WORKIGN :shrug:
        if (!await Guild.get(message.guild.id, "modules.image.fisheye.toggle")) return message.reply("That command is not enabled on this server | guild.")

        let img
        let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if (!args[0]) img = message.author.avatarURL
        if (mUser) img = mUser.user.avatarURL
        if (args.join(` `).startsWith("https://") || args.join(` `).startsWith("http://")) img = args.join("")

        Jimp.read(img)
            .then(dimg => {
                dimg.fisheye()
                dimg.getBuffer(Jimp.MIME_PNG, (error, result) => {
                    if (error) return console.error(error)
                    const attachment = new Discord.Attachment(result, 'welcome-image.png');
                    return message.channel.send(attachment)
                })
            })
            .catch(err => {
                return console.log(err)
            })
    }
}
module.exports = Fisheye
//Ned | 18/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Jimp = require('jimp');

// Please repalce Name on line 7 and 25 to command name.
class Invert extends Command {
    constructor() {
        super({
            name: 'invert',
            description: 'invert your avatar color or the person you mentioned avatar color or the image link color.',
            category: 'image', //LOWER CASE!!!!
            usage: 'invert @user/url',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.image.invert.toggle")) return message.reply("That command is not enabled on this server | guild.")

        let img
        let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if (!args[0]) img = message.author.avatarURL;
        if (args[0]) {
            if (!args.join(" ").includes("@") && !args.join(' ').startsWith('https://') && !args(' ').startsWith('http://')) return message.reply("Please tag the user for it to work or use a link.")
        }
        if (mUser) img = mUser.user.avatarURL
        if (args.join(` `).startsWith("https://") || args.join(` `).startsWith("http://")) img = args.join("")

        Jimp.read(img)
            .then(dimg => {
                dimg.invert()
                dimg.getBuffer(Jimp.MIME_PNG, (error, result) => {
                    if (error) return console.error(error)
                    const attachment = new Discord.Attachment(result, 'result.png');
                    return message.channel.send(attachment)
                })
            })
            .catch(err => {
                return console.log(err)
            })
    }
}
module.exports = Invert
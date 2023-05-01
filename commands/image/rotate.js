//Ned | 18/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Jimp = require('jimp');

// Please repalce Name on line 7 and 25 to command name.
class Rotate extends Command {
    constructor() {
        super({
            name: 'rotate',
            description: 'Rotate your avatar or the person you mentioned or the link you sent.',
            category: 'image', //LOWER CASE!!!!
            usage: 'rotate <@user/url> <angle>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.image.rotate.toggle")) return message.reply("That command is not enabled on this server | guild.")

        let img
        let angle = parseInt(args[1])
        let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if (!args[0]) img = message.author.avatarURL
        if (args[0]) {
            if (!args.join(" ").includes("@") && !args.join(' ').startsWith('https://') && !args(' ').startsWith('http://')) return message.reply("Please tag the user for it to work or use a link.")
        }
        if (mUser) img = mUser.user.avatarURL
        if (args.join(` `).startsWith("https://") || args.join(` `).startsWith("http://")) img = args.join("")
        if (!angle) angle = 90
        if (isNaN(angle)) angle = 90

        Jimp.read(img)
            .then(dimg => {
                dimg.rotate(angle)
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
module.exports = Rotate
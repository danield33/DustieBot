//Ned | 23/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class Emoji extends Command {
    constructor() {
        super({
            name: 'emoji',
            aliases: ['em'], // REMOVE THIS IF THERE IS NONE!
            description: 'Convert text to emoji\`s',
            category: 'misc', //LOWER CASE!!!!
            usage: 'emoji Text',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.misc.emoji.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!args[0]) return message.reply("Please add text afterwards the command!")
        let text = args.join(" ").toLowerCase()
        let fword = ""
        for (var i = 0; i < text.length; i++) {
            if (text.charAt(i).match(/[a-z]/i)) {
                var ch = ` :regional_indicator_${text.charAt(i)}:`
                fword = fword + ch
            } else {
                fword = fword + check(text.charAt(i))
            }
        }
        return message.channel.send(fword)
    }
}

function check(suffix) {
    var thing
    switch (suffix) {
        case ' ':
            thing = '   '
            break
        case '!':
            thing = ' :exclamation:'
            break
        case '?':
            thing = ' :question:'
            break
        case '0':
            thing = ' :zero:'
            break
        case '1':
            thing = ' :one:'
            break
        case '2':
            thing = ' :two:'
            break
        case '3':
            thing = ' :three:'
            break
        case '4':
            thing = ' :four:'
            break
        case '5':
            thing = ' :five:'
            break
        case '6':
            thing = ' :six:'
            break
        case '7':
            thing = ' :seven:'
            break
        case '8':
            thing = ' :eight:'
            break
        case '9':
            thing = ' :nine:'
            break
        case '+':
            thing = ' :heavy_plus_sign:'
            break
        case '-':
            thing = ' :heavy_minus_sign:'
            break
        case '×':
            thing = ' :heavy_multiplication_x:'
            break
        case '*':
            thing = ' :asterisk:'
            break
        case '$':
            thing = ' :heavy_dollar_sign:'
            break
        case '/':
            thing = ' :heavy_division_sign:'
            break
        default:
            thing = suffix
            break
    }
    return thing
}

module.exports = Emoji
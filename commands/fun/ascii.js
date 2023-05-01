//ProNanigans | 18-3-19 - Modified by the Fouders (Ned) + Fixed
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const figlet = require('figlet')

// Please repalce Name on line 7 and 25 to command name.
class ascii extends Command {
    constructor() {
        super({
            name: 'figlet',
            aliases: ["ascii"],
            description: `Converts your text to something cool. Type fonts after the command to find all the \`fonts\`!`,
            category: 'fun', //LOWER CASE!!!!
            usage: 'd.figlet <optional font> <text>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role ,only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) {
        if (!args[0]) return message.reply(`Please select a font or a message! Type \`${db.settings.botPrefix}help figlet\` for more information.`)
        if (args[0] === 'fonts'.toLowerCase()) {
            figlet.fonts(function (err, fonts) {
                if (err) {
                    return message.reply("There was something wrong. Try agian!")
                }
                let mesg = fonts.join(", ")
                if (mesg.length > 2000) mesg = mesg.slice(0, -Math.abs(mesg.length - 2000 + 54))
                return message.reply(mesg)
            })
        } else {
            let font = 'Standard'
            let arg = args
            figlet.fonts(function (err, fonts) {
                if (err) font = 'Standard'
                if (fonts.includes(`${arg[0]} ${arg[1]}`)) { font = `${arg[0]} ${arg[1]}` }
                if (font === `Standard`) { if (fonts.includes(arg[0])) { font = arg[0] } else { } }

                let texts = args.join(` `).slice(font.length)
                if (font === "Standard") texts = args.join(` `)

                figlet.text(texts, {
                    font: font,
                    horizontalLayout: 'default',
                    verticalLayout: 'default'
                }, function (err, data) {
                    if (err) {
                        return message.channel.send("Something went wrong")
                    }
                    message.channel.send(`\`\`\`${data}\`\`\``)
                })
            })
        }
    }
}
module.exports = ascii

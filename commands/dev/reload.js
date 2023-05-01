//Ned | 25/04/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please replace Name on line 7 and 27 to command name.
class Reload extends Command {
    constructor() {
        super({
            name: 'reload',
            description: 'Reloads a specific command',
            category: 'dev', //LOWER CASE!!!!
            usage: 'reload (event/directory)/name',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        let commandName = args[0]
        if (!commandName) return message.channel.send("Please provide the file directory/filename!")
        if (commandName.endsWith(".js")) return message.channel.send("Please DO NOT ADD \`.js\` to the end!")

        try {
            if (commandName.startsWith("event")) {
                delete require.cache[require.resolve(`../../events/${commandName.split('/').pop()}.js`)]
                let prop = require(`../../events/${commandName.split('/').pop()}.js`)
            } else {
                delete require.cache[require.resolve(`../${commandName}.js`)]
                bot.commands.delete(commandName.split("/").pop())
                let cmd = require(`../${commandName}.js`)
                cmd = new cmd()
                bot.commands.set(cmd.name, cmd)
            }
        } catch (err) {
            if (err.message.includes("Cannot find module")) return message.channel.send(`\`${commandName}\` doesn't exist!`)
            console.log(err)
            return message.channel.send(`**Could not reload:** \`${commandName}\`\n**Error message:** \`${err.message}\`\n\n**Check console for full error**`)
        }
        console.log(commandName.startsWith("event") ? `\x1b[32m` : `\x1b[36m`, `${commandName.startsWith("event") ? "EVENT" : "COMMAND"}: ${commandName} reloaded!`, `\x1b[0m`);
        return message.channel.send(`Reloaded \`${commandName}\` successfully!`)
    }
}
module.exports = Reload

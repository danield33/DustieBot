//Ned | 21/04/18
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Economy = require('../../util/models/economy')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Please replace Name on line 7 and 27 to command name.
class Exec extends Command {
    constructor() {
        super({
            name: 'exec',
            description: 'Execute anything in the terminal. ',
            category: 'dev', //LOWER CASE!!!!
            usage: 'exec (statement) ',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        let te = args.join(" ")
        if (!te) return message.channel.send("Please add something to execute")

        let embed = new Discord.RichEmbed().setColor("#36393F")
        const { stdout, stderr } = await exec(te)

        if (stderr) embed.addField("Error", stderr)
        else embed.addField("Output", `\`\`\`${stdout}\`\`\``)
        embed.setFooter("Click the ❌ to remove this message. 30 seconds if needed!")
        let msg = await message.channel.send(embed);
        await msg.react("❌")

        const Filter = (reaction, user) => user.id === message.author.id
        const collector = msg.createReactionCollector(Filter, { time: 30000 });

        collector.on('collect', re => {
            if (re.emoji.name === "❌") {
                collector.stop()
                msg.delete().catch(err => { })
            }
        })

        collector.on('end', r => {
            return msg.clearReactions().catch(err => { })
        })
    }
}
module.exports = Exec

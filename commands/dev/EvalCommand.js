const { Command } = require('../../util/handlers/command/index.js');
const util = require('util')
const terminal = require('node-cmd')
const Discord = require("discord.js")
const hastebin = require('hastebin-gen');

const { Guild, Levels, Warns, Economy, User } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

const enc = require('../../util/scripts/encode')

class EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            aliases: ['e', 'ev', 'evalulate'],
            description: 'Evaluates code',
            usage: 'eval [bash] <code>',
            category: 'dev',
            dev: true
        })
    }
    async run(message, args, bot, db, queue) {

        if (!args[0]) return message.channel.send('Eval requires input')
        let msg = await message.channel.send("Attempting to evalulate...")
        let serverQueue = queue.get(message.guild.id)
        let player = bot.player.get(message.guild.id)
        if (args[0].toLowerCase() == 'bash') {
            let hrDiff
            const hrStart = process.hrtime()
            terminal.get(args.slice(1).join(' '), async (err, data) => {
                hrDiff = process.hrtime(hrStart)
                if (err) return msg.edit(`Error while evaluating: \`${err}\``)
                msg.edit(`\`\`\`md
${data.length >= 2000 ? data.substr(0, 1996) + "..." : data}\`\`\`
`)
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
            })
        } else {
            let result
            let hrDiff;
            (async () => {
                try {
                    const hrStart = process.hrtime();
                    result = eval(args.join(' '));
                    hrDiff = process.hrtime(hrStart);
                } catch (err) {
                    return msg.edit(`Error while evaluating: \`${err}\``);
                }
            })()
            message.delete()
            const inspected = util.inspect(result, { depth: 0 })
            let embed = new Discord.RichEmbed()
                .setAuthor(`Evaluation in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`)
                .setColor("#36393F")
                .addField("Input", `\`\`\`
${args.join(' ')}\`\`\``)
                .addField("Output", `\`\`\`js
${inspected.length >= 1024 ? inspected.substr(0, 1020) + "..." : inspected}\`\`\``)
                .setFooter("Click the ❌ to remove this message. 30 seconds if needed!")
            msg.edit(embed)
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
}
module.exports = EvalCommand
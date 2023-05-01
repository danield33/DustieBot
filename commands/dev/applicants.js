//ProNanigans | 3-6-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Tabletop = require('tabletop')

// Please replace Name on line 7 and 27 to command name.
class applicants extends Command {
    constructor() {
        super({
            name: 'applicants',
            aliases: ['apps', 'app'], // REMOVE THIS IF THERE IS NONE!
            description: 'Provieds the current applicants for Dustie developers',
            category: 'dev', //LOWER CASE!!!!
            usage: 'applicants <page #>',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!['264521312544751617', '157945195931893761', '220976772286513152', "593154369545830422"].includes(message.author.id)) return message.reply("You cannot use this command!")
        Tabletop.init({
            key: '1y7fPq8CMMSZqKpAxIsbPExh0vNWX-gUI9VbbX_8TYF4',
            callback: gotData,
            simpleSheet: true
        });

        function gotData(stuff, tabletop) {
            const Filter = (reaction, user) => user.id === message.author.id
            let questions = ['First name', 'Discord TAG (Name#0000)', 'Timezone', 'How old are?', 'How long have you been coding for?', 'Skills - Coding languages you can provide', 'How much time could you spend on the project per week?', 'Why should we pick you?', 'Do you have any other big projects?', 'Is there any projects we could look at?', 'If so, provide images or example', 'Could you provide a description about your self?'];
            let data = stuff;
            let page = 0;
            if (!isNaN(args[0]) && args[0] < data.length && args[0] > 0) page = args[0] - 1
            function work() {
                let aEmbed = new Discord.RichEmbed()
                    .setTitle(`**Dustie Developer Applications**`)
                    .setColor(bot.embed)
                    .setFooter(`Application ${page + 1} of ${data.length}`)
                for (let i = 0; i < questions.length; i++) {
                    aEmbed.setDescription(data[page]['Timestamp'])
                    if (!data[page][questions[i]]) data[page][questions[i]] = 'Nothing specified'
                    aEmbed.addField(`**${i + 1}.** ${questions[i]}`, data[page][questions[i]])
                }
                return aEmbed
            }

            message.channel.send(work()).then(async r => {
                await r.react("◀")
                await r.react('🛑')
                await r.react("▶")
                const collector = r.createReactionCollector(Filter, { time: 120000 });
                collector.on('collect', m => {
                    if (m.emoji.name === "◀") {
                        page--
                        if (page <= 0) page = data.length - 1
                        m.remove(message.author)
                        r.edit(work())
                    }

                    if (m.emoji.name === "▶") {
                        page++
                        if (page > data.length - 1) page = 0
                        m.remove(message.author)
                        r.edit(work())

                    }
                    if (m.emoji.name === '🛑') {
                        let cEmbed = new Discord.RichEmbed()
                            .setTitle("Closing application page!")
                            .setColor(bot.embed)
                            .setTimestamp();
                        r.edit(cEmbed)
                        r.clearReactions()
                    }
                });

            })
        }
    }
}
module.exports = applicants
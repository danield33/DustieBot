// Dubbel | 11 May 2019
const Discord = require("discord.js");
const {
    Command
} = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

const typinggames = new Set()
let sentances = [
    "The 2.2bn euro deal raises fears of job cuts at Vauxhall's UK factories, which employ 4,500 workers.",
    "Thirteen potential UK terror attacks have been prevented in less than four years, police reveal.",
    "Several projectiles flew about 1,000km (620 miles) and three fell into Japanese waters.",
    "Police say Tristan Voorspuy was killed by pastoral herders while inspecting a fire-damaged lodge.",
    "A mother tells BBC's Crimewatch she wanted 'to die there and then' after being struck by a car.",
    "James Comey dismisses Mr Trump's claim that Barack Obama ordered his phone tapped, US media say.",
    "BT Sport extends its TV rights for the Champions League and Europa League until 2021 in a deal worth £1.2bn.",
    "WHO chief says air pollution is linked to 600,000 deaths in children under five.",
    "The deal will create one of the UK's largest fund managers, overseeing assets worth £660bn.",
    "A report published in the American Journal of Preventive Medicine found usage can encourage feelings of exclusion.",
    "The party says Jeremy Corbyn did include his leadership salary in his tax return.",
    "Communist Party delegates gathering in Beijing give their views on US President Donald Trump.",
    "Pollution levels were excluded from air quality assessments due to an 'incorrect' classification.",
    "More than 600 NHS leaders are earning six-figure salaries and nearly 100 are earning more than the prime minister.",
    "Scott Collins, co-founder of MEATliquor restaurants, shares the business advice he wishes he had been given when he started out.",
    "A selection of the shortlisted photographs in the world’s largest photography competition.",
    "Malaysian singer-songwriter Yuna says she made it in the US without losing her sense of self.",
    "Jake McKendrick and Kirsty Jones from North Wales won the title this year.",
    "Dan and Peggy Eoff live in Clinton, Arkansas, a part of the country that voted overwhelmingly for Trump.",
    "No-one was seriously injured and it is hoped the hoses will make a 'full recovery'.",
    "The iconic sinking landmark in Atlanta, Georgia, has been brought down with a controlled explosion.",
    "14-year-old Logan is helping monitor his city's air - and the results may change your habits.",
    "Many say achieving a maths and English C grade has little relevance to their future careers.",
    "Thirty years ago the Herald of Free Enterprise capsized, killing 193 people. This is the story of those affected by the disaster.",
    "How a small Canadian firm used social media to help drive sales of its Instant Pot multi-function cooker.",
    "Keith Collard's wife and daughter were determined that his post-combat trauma wouldn't destroy them as a family.",
    "Economic incentives have dangerously distorted the use of antibiotics in people and animals.",
    "Rebecca Jones goes behind the scenes of One Love - the new Bob Marley musical.",
    "Recent polls show Obamacare has reached record levels of support as the threat of repeal looms.",
    "What will the second series of Top Gear look like without Chris Evans in the driving seat?",
    "President Donald Trump wants an investigation, but has provided no evidence to back up his claims.",
    "The BBC's Andrew Harding on the ups and downs of looking after domestic animals when you're posted around the world.",
    "Joe Root and Chris Woakes guide England to a four-wicket win and a series-clinching victory over West Indies.",
    "Arsenal forward Alexis Sanchez had an angry exchange with team-mates before Saturday's defeat at Liverpool, for which he was dropped.",
    "Great Britain win three more golds on the final day of the Para-cycling Track World Championships in Los Angeles.",
    "Air pollution is in the news - but how bad is Britain’s air?",
    "Lara Lewington finds out if air pollution gadgets can help her pick the healthiest route to take.",
    "Where does the figure of 40,000 early deaths per year in the UK come from?"
]

// Please replace Name on line 7 and 27 to command name.
class typinggame extends Command {
    constructor() {
        super({
            name: 'typinggame',
            description: 'Type the text as fast as possible!',
            category: 'fun', //LOWER CASE!!!!
            usage: 'typinggame',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        if (!db.modules.fun.typinggame.toggle) return message.reply("That command is not enabled on this server | guild.")
        let typingArticles = db.modules.fun.typinggame.sentances
        let result;
        if (typingArticles.length < 1) typingArticles = sentances
        if (typinggames.has(message.channel.id)) return message.channel.send(`There can only be one typinggame in a channel.`)
        typinggames.add(message.channel.id)

        let statsEmbed = new Discord.RichEmbed()
            .setAuthor(`Typing game`)
            .setDescription(`Game started by ${message.author}, type the following text and send it in this channel.`)
            .setColor(bot.embed)
            .setFooter(`You have 5 minutes.`)
        let statsMessage = await message.channel.send(statsEmbed)

        let index = Math.floor(Math.random() * typingArticles.length)
        let articleEmbed = new Discord.RichEmbed()
            .setAuthor(`Typing game`)
            .setDescription(typingArticles[index])
            .setColor(bot.embed)
        let articleMessage = await message.channel.send(articleEmbed)

        const collector = await message.channel.createMessageCollector(
            msg => (msg.content === typingArticles[index]) && (msg.author.id === message.author.id),
            {
                time: 300000, // 5 minutes (5 * 60 * 1000)
                maxMatches: 1
            }
        );
        collector.on(`end`, async (collection, reason) => {
            if (reason === "time") {
                result = `Game ended, no one was able to type the article on time.`
            } else {
                result = `Game ended. Well done, ${collection.map(m => m.author)}! You won!`
            }
            await statsMessage.delete().catch(() => { });
            await articleMessage.delete().catch(() => { });

            let endEmbed = new Discord.RichEmbed()
                .setAuthor(`Typing game`)
                .setColor(bot.embed)
                .setDescription(result)

            message.channel.send(endEmbed)
            return typinggames.delete(message.channel.id)
        });
    }
}
module.exports = typinggame
// Dubbel | 9 May 2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class rockpaperscissors extends Command {
    constructor() {
        super({
            name: 'rockpaperscissors',
            aliases: ['rps'], // REMOVE THIS IF THERE IS NONE!
            description: 'Play Rock Paper Scissors against the bot.',
            category: 'fun', //LOWER CASE!!!!
            usage: 'rps',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add', queue' if working with music/voice
        if (!db.modules.fun.rockpaperscissors.toggle) return message.reply("That command is not enabled on this server | guild.")
        const choices = ["✊", "✋", "✌"]

        let choice;
        let embed = new Discord.RichEmbed()
            .setAuthor(`Rock, paper, scissors!`)
            .setColor(bot.embed)
            .setDescription(`Make a choice! You have 10 seconds`)

        function calculate() {
            let botChoice = Math.floor(Math.random() * choices.length)
            let text = ""
            if (choice == 0) { // If rock
                if (botChoice === 0) text = `${choices[0]} | Its a tie.` // If rock
                if (botChoice === 1) text = `${choices[1]} | You lose, I win!` // If paper
                if (botChoice === 2) text = `${choices[2]} | You win, I lose..` // If scissors
            }
            if (choice == 1) { // If paper
                if (botChoice === 0) text = `${choices[0]} | You win, I lose..` // If rock
                if (botChoice === 1) text = `${choices[1]} | Its a tie.` // If paper
                if (botChoice === 2) text = `${choices[2]} | You lose, I win!` // If scissors
            }
            if (choice == 2) { // If scissors
                if (botChoice === 0) text = `${choices[0]} | You lose, I win!` // If rock
                if (botChoice === 1) text = `${choices[1]} | You win, I lose..` // If paper
                if (botChoice === 2) text = `${choices[2]} | Its a tie.` // If scissors
            }
            let newembed = new Discord.RichEmbed()
                .setAuthor(`Rock, paper, scissors!`)
                .setColor(bot.embed)
                .setDescription(text)
            return msg.edit(newembed)
        }

        let msg = await message.channel.send(embed)

        await msg.react(choices[0])
        await msg.react(choices[1])
        await msg.react(choices[2])

        const Filter = (reaction, user) => user.id === message.author.id
        const collector = msg.createReactionCollector(Filter, { time: 10000 });


        collector.on('collect', re => {
            if (re.emoji.name === choices[0]) {
                choice = 0
                collector.stop()
                calculate()
            } else if (re.emoji.name === choices[1]) {
                choice = 1
                collector.stop()
                calculate()
            } else if (re.emoji.name === choices[2]) {
                choice = 2
                collector.stop()
                calculate()
            }
        })

        collector.on('end', r => {
            return msg.clearReactions().catch(err => { })
        })
    }
}
module.exports = rockpaperscissors
//ProNanigans | 3-18-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Economy = require('../../util/models/economy')

// Please replace Name on line 7 and 27 to command name.
class spin extends Command {
    constructor() {
        super({
            name: 'spin',
            aliases: ['whell'], // REMOVE THIS IF THERE IS NONE!
            description: 'Spins a wheel to see how many coins you will get. See how many coins you will get back after your huge invesment in the wheel!',
            category: 'economy', //LOWER CASE!!!!
            usage: 'd.spin <amount>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        if (!await Guild.get(message.guild.id, "modules.economy.toggle")) return
        const flavorText = [
            'Sad day for you.',
            'Better luck next time',
            'Try again',
            `O_o`
        ]
        let description = flavorText[Math.floor(Math.random() * flavorText.length)]


        if (!await Guild.get(message.guild.id, "modules.economy.toggle")) return
        if(!await Economy.check(message, message.author)){
            Economy.createuser(message.guild.id, message.author.id).catch(err => {
            if(err) return message.reply('There was a problem setting up your economy, please try again')
               })
            }
        let bet = args[0];
        let user = await Economy.user(message, message.author)
        if (isNaN(bet)) return message.reply("That is not a number")
        if (bet > user.onhand) return message.reply("You do not have enough money in your onhand to bet that much")
        if (bet.includes('.')) return message.reply("It cannot bet a decimal");

        if (bet < 1) return message.reply("Please specify a number greater than 1");
        //↖️⬇️⬅️➡️↙️↗️⬆️⬅️↘️
        let spinner = ['** 2.5  | 3.0 | 0.7** \n **0.5 | ** ⬆️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**', '** 2.5  | 3.0 | 0.7** \n **0.5 | ** ↗️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**', '** 2.5  | 3.0 | 0.7** \n **0.5 | ** ➡️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**', '** 2.5  | 3.0 | 0.7** \n **0.5 | ** ↘️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**', '** 2.5  | 3.0 | 0.7** \n **0.5 | ** ⬇️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**', '** 2.5  | 3.0 | 0.7** \n **0.5 | ** ↙️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**', '** 2.5  | 3.0 | 0.7** \n **0.5 | ** ⬅️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**', '** 2.5  | 3.0 | 0.7** \n **0.5 | ** ↖️ ** | 1.2 ** \n **0.1 | 1.8 | 0.3**'];
        let num = []
        let mults = [3, .7, 1.2, .3, 1.8, .1, .5, 2.5, 3]
        Economy.take(message.guild.id, message.author.id, 'onhand', args[0])
        let wheelEmbed = new Discord.RichEmbed()
            .setTitle("**WHEEL OF FORTUNE**")
            .setColor(bot.embed)
            .setDescription(`${spinner[0]}`, `for ${args[0]} coins`);
        message.channel.send(wheelEmbed).then(m => {
            let ran = Math.floor(Math.random() * spinner.length) + 1
            for (let i = 0; i < ran; i++) {

                wheelEmbed.setDescription(spinner[i])
                m.edit(wheelEmbed)
                num.push(i)
            }
        }).then(m => {
            setTimeout(() => {
                let mult = 1
                for (let i = 0; i < 7; i++) {
                    if (num[num.length - 1] == i) mult = mults[i]
                }
                let nCoins = Math.round(bet * mult);
                let lCoins = (bet - nCoins) * -1
                if (lCoins < 0) message.reply(`You've lost ${lCoins * -1} coins. ${description}`) //if (lCoins < 0) message.reply(`You've lost ${lCoins * -1} coins. Sad day for you.`)
                if (lCoins > 0) message.reply(`You've won ${lCoins} coins!`)
                Economy.add(message.guild.id, message.author.id, 'onhand', nCoins)
            })
        })

    }
}
module.exports = spin

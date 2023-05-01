//ProNanigans | 4-20-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Economy = require('../../util/models/economy')
const ms = require('ms')

// Please replace Name on line 7 and 27 to command name.
class daily extends Command {
    constructor() {
        super({
            name: 'daily',
            aliases: ['d'], // REMOVE THIS IF THERE IS NONE!
            description: 'Gives you your daily amount of coins',
            category: 'economy', //LOWER CASE!!!!
            usage: 'd.daily',
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
        if(!await Economy.check(message, message.author)){
            Economy.createuser(message.guild.id, message.author.id).catch(err => {
            if(err) return message.reply('There was a problem setting up your economy, please try again')
               })
            }        
            let user = await Economy.user(message, message.author)
        if ((new Date() - user.lastdaily) < 43200000) return message.reply(`You recently claimed your daily coins. Try again in \`\`${ms(43200000 - (new Date() - user.lastdaily), { long: true })}\`\`.`)
        let deCoins = 5 * user.dailystreak;
        if (deCoins == 0) deCoins = 5
        Economy.add(message.guild.id, message.author.id, 'onhand', deCoins)

        let cEmbed = new Discord.RichEmbed()
            .setTitle(`Daily Coins`)
            .setColor(bot.embed)
            .setAuthor(message.author.username)
            .addField("You've Gained", `${deCoins} <:cr:567643915742871564>`)
            .setFooter(`Daily streak: ${user.dailystreak}`);

        await Economy.add(message.guild.id, message.author.id, "dailystreak", 1)
        await Economy.set(message.guild.id, message.author.id, "lastdaily", new Date())

        message.channel.send(cEmbed);
    }
}
module.exports = daily

//Myst 16.04.2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Economy = require('../../util/models/economy')
const ms = require("ms")

// Please replace Name on line 7 and 27 to command name.
class work extends Command {
    constructor() {
        super({
            name: 'work',
            aliases: ['w'], // REMOVE THIS IF THERE IS NONE!
            description: 'Work and earn some money',
            category: 'economy', //LOWER CASE!!!!
            usage: 'work',
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
        let jobs = Economy.jobs
        let amount = jobs[user.workid].pay
        let newJob = false
        let footer

        //3600000 - 1 hour in milliseconds
        if ((new Date() - user.lastworked) < 3600000) return message.reply(`You recently worked, try again in \`\`${ms(3600000 - (new Date() - user.lastworked), { long: true })}\`\`.`)
        if (jobs[user.workid].streak - user.workstreak <= 0) {
            await Economy.add(message.guild.id, message.author.id, "workid", 1)
            await Economy.set(message.guild.id, message.author.id, "workstreak", 0)
            user.workstreak = 0
            user.workid++
            newJob = true
        }

        let embed = new Discord.RichEmbed()
            .setAuthor(jobs[user.workid].name, message.author.avatarURL)
            .setColor(bot.embed)
        if (!newJob) embed.setDescription(`You have earned ${amount}<:cr:567643915742871564>`)
        else embed.setDescription(`Congratulations, you are a ${jobs[user.workid].name}!\n\nYou have earned ${amount}<:cr:567643915742871564>`)
        try { footer = `You need to work ${jobs[user.workid].streak - user.workstreak} ${(jobs[user.workid].streak - user.workstreak) === 1 ? "more time" : "times"} to get ${jobs[user.workid + 1].name}!` }
        catch (err) { footer = `Looks like you reached the highest job so far!` }
        embed.setFooter(footer)

        await Economy.add(message.guild.id, message.author.id, "onhand", amount)
        await Economy.set(message.guild.id, message.author.id, "lastworked", new Date())
        await Economy.add(message.guild.id, message.author.id, "workstreak", 1)
        return message.channel.send(embed)
    }
}
module.exports = work

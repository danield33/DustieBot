//ProNanigans | 9-7-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild, Economy } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const ms = require('ms')

// Please replace Name on line 7 and 27 to command name.
class rob extends Command {
    constructor() {
        super({
            name: 'rob',
            aliases: ['steal', 'take'], // REMOVE THIS IF THERE IS NONE!
            description: 'Steals <:cr:567643915742871564> from the specified users onhand',
            category: 'economy', //LOWER CASE!!!!
            usage: 'rob <@user>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!db.modules.economy.toggle) return
        let mUser = await Economy.user(message, message.author);


        let sUser = await Guild.findUser(message, args.join(' '))
        if(!sUser) return message.reply("Couldn't find user")
        if (!await Economy.check(message, sUser)) {
            Economy.createuser(message.guild.id, sUser.id).catch(err => {
                if (err) return message.reply('There was a problem setting up your economy, please try again')
            })
            return message.channel.send("That user doesn't have an economy yet!")

        };
        if (!await Economy.check(message, message.author)) {
            Economy.createuser(message.guild.id, message.author.id).catch(err => {
                if (err) return message.reply('There was a problem setting up your economy, please try again')
            })
        }
        if ((new Date() - mUser.laststeal) < 1800000) return message.reply(`You recently stole something, try again in \`\`${ms(1800000 - (new Date() - mUser.laststeal), { long: true })}\`\`.`)


        let ssUser = await Economy.user(message, sUser);
        if (ssUser.onhand < 1) return message.reply("They don't have any money")
        if (ssUser.onhand < 50) return message.reply('They must have over 50 <:cr:567643915742871564> to be stolen from')
        let amt = Math.floor(Math.random() * 20) + 1;
        let perc = [...Array(Math.floor((ssUser.onhand * .4) - (ssUser.onhand * .2))).keys()].map(i => i + (Math.floor(ssUser.onhand * .2)))[amt]
        if (sUser.id == message.author.id) return message.reply("Good job, you stole from yourself");
        await Economy.take(message.guild.id, sUser.id, 'onhand', Math.floor(perc))
        await Economy.add(message.guild.id, message.author.id, 'onhand', Math.floor(perc))
        await message.reply(`You've stolen ${Math.floor(perc)} <:cr:567643915742871564> from ${sUser}`).then(m => m.delete(4000))
        await Economy.set(message.guild.id, message.author.id, 'laststeal', new Date())




    }
}
module.exports = rob
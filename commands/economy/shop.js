//ProNanigans | 6-8-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');

// Please replace Name on line 7 and 27 to command name.
class shop extends Command {
    constructor(){
        super({
            name: 'shop',
           // aliases: [ '' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Gives you a list of the current things you can buy',
            category: 'economy', //LOWER CASE!!!!
            usage: 'shop',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.economy.toggle")) return message.reply("Economy is not enabled in this server | guild.")
        if(!await Economy.check(message, message.author)){
            Economy.createuser(message.guild.id, message.author.id).catch(err => {
            if(err) return message.reply('There was a problem setting up your economy, please try again')
               });
            }
        let user = await Economy.user(message, message.author)
        if(!args[0]){
            let page = 0;
        let sEmbed = new Discord.RichEmbed()// Doesn't just have to be things to help economy, could be items or smth as well
        .setTitle(`-=-=-=-=-=Dustie's Rust-Eze Shop=-=-=-=-=-`)//Also only keep the shop 1-3 items per page, use best judgement depending on the pages size and add the new embed to the embed array.
        .setColor(bot.embed)
        .setDescription("Get the latest merchandise available!")
        .addField(`Intrest Multiplier **[${user.bankmult-1}]**`, `Adds a multiplier to your intrest from your bank. You can get up to 5. Each one expires in one week! \n Run the command again with \`intmult\` and the number of multipliers you want. If you buy more later this week, it will not reset the time this lasts\n Each one costs 500<:cr:567643915742871564>!`)

        let embeds = [sEmbed]
        sEmbed.setFooter(`Page ${page+1} of ${embeds.length}`);
         message.channel.send(embeds[page]).then(async m => {
             await m.react('◀');
             await m.react('🛑');
             await m.react('▶');
             const Filter = (reaction, user) => user.id === message.author.id
             const collector = m.createReactionCollector(Filter, { time: 120000 });
             collector.on('collect', r => {
                if (r.emoji.name === "◀") {
                    page--
                    if(page <= 0) page = embeds.length-1
                    r.remove(message.author)
                    m.edit(embeds[page])
                }
                if (r.emoji.name === "▶") {
                    page++
                    if(page > embeds.length-1) page = 0
                    r.remove(message.author)
                    m.edit(embeds[page])

                }
                if(r.emoji.name === '🛑'){
                    let cEmbed = new Discord.RichEmbed()
                    .setTitle("Closing up Shop!")
                    .setColor(bot.embed)
                    .setTimestamp();
                    m.edit(cEmbed)
                    m.clearReactions()
                }

         })
        })
        return
    }
        if(args[0].toLowerCase() == 'intmult'){
            if(!args[1]) return message.reply("Please specify the number of multipliers you want")
            if(isNaN(args[1]) && args[1] < 1) return message.reply("Please specify a number greater than 0");
            args[1] = Math.floor(args[1])
            let cost = 500 * args[1]
            if(user.onhand < cost) return message.reply(`sorry, you do not have enough money for ${args[1]} multipliers.\n Total cost: ${cost}`);
            if(user.bankmult+args[1] > 5) return message.reply(`you'll then have more than 5 multipliers at a time then`);
            await Economy.take(message.guild.id, message.author.id, 'onhand', cost)
            await Economy.add(message.guild.id, message.author.id, 'bankmult', args[1]-1)
            if(user.bankmultlength == 0) await Economy.set(message.guild.id, message.author.id, 'bankmultlength', new Date())
            return message.reply(`Given you ${args[1]} multipliers for ${cost}<:cr:567643915742871564>`)
        }
    
    }
}
module.exports = shop
const Discord = require("discord.js")
const bot = require('../index.js')
const Guild = require('../util/models/guild')
const Levels = require('../util/models/levels')
const User = require('../util/models/user')
//ProNanigans | 10-7-19

//Please fill in the data below...
bot.on("message", async (message) => {
    if(message.channel.type == "dm") return
    if(message.author.bot) return
    if (!await Guild.get(message.guild.id, "modules.levels.toggle")) return;

    if (!await Levels.check(message, message.author)) {
        await Levels.createuser(message.guild.id, message.author.id).catch(err => {
            if (err) return console.log(`Problem with setting up level account for ${message.author.tag} (ID: ${message.author.id})`)
        })
    }

    //if(!await Levels.check(message, message.author)) return
    let user = await Levels.user(message, message.author)
        if(user == undefined) console.log(message.author.id, message.guild.id)
    let xpneeded = 5 / 6 * (user.level+1) * (2 * (user.level+1) * (user.level+1)+ 27 * (user.level+1)+ 91)

    if(Math.floor(Math.random()*10) == Math.floor(Math.random() * 10)){
        let messages = Math.ceil(xpneeded / (15+25) / 2)//average number of messages needed to send to gain a level
        let xp = [...Array(11).keys()].map(i => i + 15)
        let r = Math.floor(Math.random()*10)
        
        await Levels.add(message.guild.id, message.author.id, 'xp', xp[r]);
        await Levels.add(message.guild.id, message.author.id, 'totalxp', xp[r]);
        await Levels.add(message.guild.id, message.author.id, 'commandsused', 1);
       
    }
    if(user.xp >= xpneeded){
        await Levels.set(message.guild.id, message.author.id, 'xp', 0);
        await Levels.add(message.guild.id, message.author.id, 'level', 1);

        let lEmbed = new Discord.RichEmbed() 
            .setTitle(`${message.author.username} Leveled Up!`)
            .setColor(bot.embed)
            .addField('Current level', user.level, true)
            .addField('Total xp', user.totalxp, true)
            .setFooter(xpneeded+' XP needed to level up again!');
            await message.channel.send(lEmbed).then(msg => msg.delete(5000))
        }


})
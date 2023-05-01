const Discord = require("discord.js")
const bot = require('../index.js')
const Guild = require('../util/models/guild')
const Economy = require('../util/models/economy')
const User = require('../util/models/user')

//Please fill in the data below...
bot.on("message", async message => {
    if (message.channel.type == "dm") return
    if (message.author.bot) return
    {
        if(!await Economy.check(message, message.author)) return
        let user = await Economy.user(message, message.author)
        let userB = user.bank;
        if(userB == 0 || userB == NaN) return
        let isPrem = await User.find(user.id)
            let time = 43200000;
            if(isPrem) time = 21600000;
            if((new Date() - user.bankmultlength) < 604800000){
                await Economy.set(message.guild.id, message.author.id, 'bankmultlength', 0)
                await Economy.set(message.guild.id, message.author.id, 'bankmult', 1)
                 return message.author.send("You're bank multiplier has expired.")
            }
            let mult = user.bankmult/10
        if ((new Date() - user.lastintrest) < time) return;
        let newValue = Math.floor(userB*Math.pow(1+(mult/365), 365)) //Math.floor(Math.pow(userB*Math.E, val))
        Economy.set(message.guild.id, message.author.id, 'bank', newValue)
        await Economy.set(message.guild.id, message.author.id, "lastintrest", new Date())
    
        }
    
})
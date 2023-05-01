const Discord = require("discord.js")
const bot = require('../index.js')
const fs = require("fs");
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const Guild = require('../util/models/guild')

bot.on('guildMemberAdd', async member => {
    if (await Guild.get(member.guild.id, "modules.welcome.toggle")) {
        let wChannel = member.guild.channels.get(await Guild.get(member.guild.id, "modules.welcome.channel"))
        if (!wChannel) return
        let format = await Guild.get(member.guild.id, "modules.welcome.format")
        /*
            Image WELCOME
        */
        if (format === 0) {
            let sett = await Guild.get(member.guild.id, "modules.welcome")

            const background = await Canvas.loadImage(sett.image.background);
            const canvas = Canvas.createCanvas(512, 225);
            const ctx = canvas.getContext('2d');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            for (let l of sett.image.layers) {
                if (l.type == "image") {
                    let img = l.url == "usrImage" ? member.user.displayAvatarURL : l.url
                    if (l.curve === "true" || l.curve == true) {
                        ctx.save()
                        ctx.beginPath();
                        ctx.arc(88, 132, 53, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.clip();
                    }
                    const avatar = await Canvas.loadImage(img);
                    await ctx.drawImage(avatar, l.x - 4, l.y - 10, l.w / 1.2, l.h / 1.2);
                    if (l.curve === "true" || l.curve == true) ctx.restore()
                } else if (l.type == 'text') {
                    let msg = l.msg.replace("{username}", member.user.username).replace("{server}", member.guild.name)
                    ctx.font = `${Number(l.font / 1.275)}px sans-serif`
                    ctx.fillStyle = l.color
                    ctx.fillText(msg, l.x, l.y)
                }
            }

            const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');
            return wChannel.send(attachment);
        }
        else if (format === 1) {
            let array = await Guild.get(member.guild.id, "modules.welcome.randmsgs")
            if (!array) {
                let sMessage = array[Math.floor(Math.random() * array.length)].replace("{username}", member).replace("{server}", member.guild.name)
                return wChannel.send(sMessage)
            } else {
                let sMessage = await Guild.get(member.guild.id, "modules.welcome.text")
                sMessage = sMessage.replace("{username}", member).replace("{server}", member.guild.name)
                return wChannel.send(sMessage)
            }
        }
        else if (format === 2) {

        }

    }
})
//ProNanigans | 26-6-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const { loadImage, createCanvas } = require('canvas');

// Please replace Name on line 7 and 27 to command name.
class quote extends Command {
    constructor() {
        super({
            name: 'quote',
            aliases: ['qu', 'quotechain', 'qc'], // REMOVE THIS IF THERE IS NONE!
            description: 'Quote a user',
            category: 'image', //LOWER CASE!!!!
            usage: 'quote (chain) (number of chain messages) <@user> <message>',
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
        if (!db.modules.fun.quote.toggle) return message.reply("That command is not enabled on this server | guild.");
        let member = await Guild.findUser(message, args.join(' '))
        if(!member) return message.reply("Couldn't find user")

        if (args[0] == 'chain') {
            message.reply('this is not finished yet but here: ')
            if (isNaN(args[1])) return message.reply("Please specify a number to chain")
            if (args[1] > 5) return message.reply("Please specify a number under 6")
            if (args[1 < 1]) return message.reply("Please specify a positive number")
            const canvas = createCanvas(400, 90 * args[1]);
            const ctx = canvas.getContext('2d');
            if (!args[3]) return message.reply("Please specify what to say")
            //     ctx.strokeStyle = '#74037b';
            // ctx.strokeRect(0, 0, canvas.width, canvas.height);
            let b = await loadImage(message.member.user.displayAvatarURL)
            for (let i = 0; i < args[1]; i++) {
                ctx.save()
                //name stuff
                let col = '#fffff'// = member.roles.map(r=>r.hexColor)
                ctx.font = 14 - i + 'px sans-serif';
                if (member.roles.map(r => r.hexColor).length > 1) {
                    col = member.roles.map(r => r.hexColor)[1]
                }
                ctx.fillStyle = `${col}`
                ctx.fillText(member.displayName, 78 + (i * 60), 25 + (i / 1.2 * 60))

                //text
                if (i == args[1] - 1) {
                    ctx.font = 13 - i + 'px sans-serif';
                    ctx.fillStyle = '#DCDDDE'

                    ctx.fillText(args.slice(3).join(' '), 80 + (i * 60), 50 + (i / 1.2 * 60))

                }
                //icon stuff

                ctx.beginPath();
                ctx.arc(40 + (i * 60) / 1.2, 40 + (i * 60) / 1.2, (25 - i) / 1.2, (12 - i) / 1.2, Math.PI / (i - 1 + .2), true);
                ctx.closePath();
                ctx.clip();
                const icon = await loadImage(member.user.displayAvatarURL)
                ctx.drawImage(icon, 19 + (i * 60) / 1.2, 19 + (i * 60) / 1.2, (50 + i - i * 2) / 1.2, (50 + i - i * 2) / 1.2)




                ctx.restore();

            }
            const attachment = new Discord.Attachment(canvas.toBuffer(), 'quote.png');
            return message.channel.send(attachment)


            //message.reply('Chain is coming soon')
        }//


        if (!member) return message.reply("Who are you quoting?");
        if (!args[1]) return message.reply("What did they say?")
        const canvas = createCanvas(400, 90);
        const ctx = canvas.getContext('2d');
        //name stuff
        let col = '#fffff'// = member.roles.map(r=>r.hexColor)
        ctx.font = '14px sans-serif';
        if (member.roles.map(r => r.hexColor).length > 1) {
            col = member.roles.map(r => r.hexColor)[member.roles.map(r => r.hexColor).length - 1]
        }
        ctx.fillStyle = `${col}`
        ctx.fillText(member.displayName, 75, 27.5)

        //text stuff
        ctx.font = '13px uni-sans-heavy';
        ctx.fillStyle = '#DCDDDE'
        ctx.fillText(args.slice(1).join(' '), 75, 49)
        // if(ctx.measureText(args.slice(1).join(' ')).width > canvas.width){
        //     args = args.slice(1).join(' ')
        //     console.log(args)
        //     args = args.split(/.{50}/).join('\n')
        //     let split = canvas.width/8

        //     console.log(args)
        //     return ctx.fillText(args, 75, 49)

        // }



        //time stuff
        let place = ctx.measureText(member.displayName).width
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#575A5F';
        let date = new Date().getHours();
        let a = 'AM'
        if (date > 12) { a = 'PM'; date -= 12 }
        ctx.fillText(`Today at ${date}:${new Date().getMinutes()} ${a}`, place + 90, 28)

        // making of icon
        ctx.beginPath();
        ctx.arc(40 / 1.2, 40 / 1.2, 25 / 1.2, 12 / 1.2, Math.PI, true);
        ctx.closePath();
        ctx.clip();
        const icon = await loadImage(member.user.displayAvatarURL)
        ctx.drawImage(icon, 15 / 1.2, 15 / 1.2, 50 / 1.2, 50 / 1.2)

        const attachment = new Discord.Attachment(canvas.toBuffer(), 'quote.png');
        message.channel.send(attachment)



    }
}
module.exports = quote
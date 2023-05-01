//PlumpOrange | 3/15
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const math = require('mathjs')
const Jimp = require('jimp');
const {createCanvas, loadImage} = require('canvas')

class Math extends Command {
    constructor() {
        super({
            name: 'math',
            aliases: ['m', 'calc'],
            description: 'Solves a math expression.',
            category: 'misc',
            usage: 'math [expression]',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.misc.math.toggle")) return message.reply("That command is not enabled on this server | guild.")
        try {
            let answer = await math.eval(args.join(" "));
            if (answer.toString().includes('function')) return message.reply("Make sure to input a valid calculation. Try agian!"); 
            function applyText(canvas, text) {
                const ctx = canvas.getContext('2d');
                let fontSize = 100;

                do {
                    ctx.font = `${fontSize -= 10}px sans-serif`;
                } while (ctx.measureText(text).width > canvas.width - 300);

                return ctx.font;
            };
            if (await Guild.get(message.guild.id, "modules.misc.math.simple")) {
                let embed = new Discord.RichEmbed()
                    .setColor(bot.embed)
                    .addField('Answer', `${answer}`);
                return message.channel.send(embed);
            } else {
                if (answer.toString().split('').length < 7) {
                    //PORTRAIT
                    const canvas = createCanvas(1440, 1835);
                    const ctx = canvas.getContext('2d');
                    const bkground = await loadImage('images/calculator_Portrait.png');
                    ctx.drawImage(bkground, 0, 0, canvas.width, canvas.height);
                    ctx.font = applyText(canvas, answer)
                    ctx.fillStyle = '#00000'
                    ctx.fillText(answer, 20, 95);
                    const attachment = new Discord.Attachment(canvas.toBuffer(), 'math.png');
                    message.channel.send(attachment)


                } else {
                    //LANDSCAPE
                    const canvas = createCanvas(2706,1152);
                    const ctx = canvas.getContext('2d');
                    const bkground = await loadImage('images/calculator_Landscape.png');
                    ctx.drawImage(bkground, 0,0, canvas.width,canvas.height);
                    ctx.font = applyText(canvas, answer)
                    ctx.fillStyle = '#00000'
                    ctx.fillText(answer, 20, 90);
                    const attachment = new Discord.Attachment(canvas.toBuffer(), 'math.png');
                    message.channel.send(attachment)
                }
            }

        } catch (err) {
            console.log(err);
            message.reply("Make sure to input a valid calculation. Try agian!");
        }
    }
}
module.exports = Math

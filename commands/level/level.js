//ProNanigans | 10-7-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild, Levels } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const { loadImage, createCanvas } = require('canvas');
const arraySort = require('array-sort')

// Please replace Name on line 7 and 27 to command name.
class level extends Command {
    constructor() {
        super({
            name: 'level',
            aliases: ['xp'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows your current level and xp',
            category: 'levels', //LOWER CASE!!!!
            usage: 'level',
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
        if (!db.modules.levels.toggle) return
        if (!await Levels.check(message, message.author)) {
            Levels.createuser(message.guild.id, message.author.id).catch(err => {
                if (err) return message.reply('There was a problem setting up your economy, please try again')
            })
        }
        setTimeout(async () => {
            let user = await Levels.user(message, message.author)
            let xpneeded = 5 / 6 * (user.level + 1) * (2 * (user.level + 1) * (user.level + 1) + 27 * (user.level + 1) + 91)
            if (user.settings.image == false) {
                let lEmbed = new Discord.RichEmbed()
                    .setTitle(`${message.author.username}'s Level and XP`)
                    .setColor(bot.embed)
                    .addField('Level', user.level, true)
                    .addField('Xp', user.xp, true)
                    .addField('Total Xp', user.totalxp, true)
                    .setFooter(`${xpneeded - user.xp} Xp till next level up!`, message.author.displayAvatarURL)
                return message.channel.send(lEmbed)
            } else if (user.settings.image == true) {

                let bkground = 'images/level:bal bckground .png'
                const canvas = createCanvas(585, 250);
                const ctx = canvas.getContext('2d');
                const background = await loadImage(bkground);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


                const applyText = (canvas, text, width) => {
                    const ctx = canvas.getContext('2d');
                    let fontSize = 70;

                    do {
                        ctx.font = `${fontSize -= 10}px sans-serif`;
                    } while (ctx.measureText(text).width > width);
                    return ctx.font;
                };

                //server image / name{
                ctx.strokeStyle = '#74037b';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);
                //name
                ctx.font = applyText(canvas, message.guild.id, canvas.width - 200);
                ctx.fillStyle = '#ffffff';
                let text = ctx.measureText(message.guild.name);
                ctx.fillText(message.guild.name, (canvas.width / 2) - (text.width / 2), 50);
                //line
                ctx.beginPath();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 3;
                ctx.moveTo((canvas.width / 2) - (text.width / 2), 55);
                ctx.lineTo((canvas.width / 2) + text.width / 2, 55);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 1;
                ctx.moveTo(canvas.width, canvas.height / 2);
                ctx.lineTo(0, canvas.height / 2);
                ctx.stroke();

                //dustie image
                let dustie = await loadImage('https://cdn.discordapp.com/avatars/549264914485870619/3037ba1132b061e8c6d0bba46570514d.png?size=2048');
                ctx.drawImage(dustie, canvas.width / 2 - 35, canvas.height / 2 - 20, 50, 50)

                //username
                let user = await Levels.user(message, message.author)
                ctx.font = '25px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(message.member.user.username, 20, canvas.height / 2 + 50);
                let userlength = ctx.measureText(message.member.user.username)
                ctx.font = '15px sans-serif';
                ctx.fillStyle = '#302B37'
                ctx.fillText('#' + message.member.user.discriminator, userlength.width + 25, canvas.height / 2 + 50)


                //rank
                let users = await Levels.get(message.guild.id, "users")

                let toppers = [];
                users.forEach(function (user) {
                    toppers.push({
                        userid: user.id,
                        level: user.level,
                        exp: user.totalxp
                    })
                })
                arraySort(toppers, 'level', { reverse: true });
                let rank = toppers.map(x => x.userid == message.author.id).indexOf(true) + 1;
                ctx.font = '20px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(`Rank:`, 20, canvas.height / 2 + 80);
                let length = ctx.measureText('Rank:')

                ctx.font = '25px sans-serif';
                ctx.fillStyle = '#302B37';
                ctx.fillText(`#${rank}`, 23 + length.width, canvas.height / 2 + 80);
                //great naming^

                let xpneeded = 5 / 6 * (user.level + 1) * (2 * (user.level + 1) * (user.level + 1) + 27 * (user.level + 1) + 91)
                let lvlup = xpneeded - user.xp
                //progress bar
                ctx.beginPath()//background
                ctx.fillStyle = '#000000';
                ctx.rect(canvas.width / 2 - 155, canvas.height / 2 + 85, 310, 30)
                ctx.fill()
                ctx.closePath();

                ctx.beginPath();//bar
                ctx.fillStyle = "#484B4E";
                ctx.rect(canvas.width / 2 - 150, canvas.height / 2 + 90, 300, 20)
                ctx.fill()
                ctx.closePath()
                ctx.beginPath();//progress
                ctx.fillStyle = "#604AD6";
                ctx.rect(canvas.width / 2 - 150, canvas.height / 2 + 90, 300 - Math.floor((lvlup / xpneeded) * 300), 20)
                ctx.fill()
                ctx.closePath();
                // xp/xpneeded
                ctx.font = '16px sans-serif';
                ctx.fillStyle = '#ffffff'
                length = ctx.measureText(limit1k(user.xp, 'k xp', ' xp'));
                ctx.fillText(limit1k(user.xp, 'k xp', ' xp'), canvas.width / 2 + length.width / 2, canvas.height / 2 + 80)
                console.log(limit1k(user.xp, 'k xp', ' xp'))
                ctx.font = '14px sans-serif';
                ctx.fillStyle = '#302B37'
                ctx.fillText(`/${limit1k(xpneeded, 'k xp', 'xp')}`, canvas.width / 2 + length.width + 30, canvas.height / 2 + 80);

                //level
                ctx.font = '20px sans-serif';
                ctx.fillStyle = '#ffffff'
                ctx.fillText('Level:', canvas.width / 2 + canvas.width / 3, canvas.height / 2 + 50)
                length = ctx.measureText('Level:');

                ctx.font = '25px sans-serif';
                ctx.fillStyle = '#302B37';
                ctx.fillText(limit1k(user.level, 'k'), canvas.width / 2 + canvas.width / 3 + length.width + 5, canvas.height / 2 + 50)
                //totalxp
                let fuser = user.totalxp
                function limit1k(num, character, character2) {
                    if (!character) character = ''; if (!character2) character2 = ''
                    if (num < 1000) return num + character2
                    let answer = parseFloat(num / 1000).toFixed(1) + character + character2
                    return answer
                }

                ctx.font = '25px sans-serif';
                let lengthxp = ctx.measureText(limit1k(user.totalxp, 'k'));
                ctx.font = '20px sans-serif';
                ctx.fillStyle = '#ffffff'
                length = ctx.measureText('Total xp:');
                ctx.fillText('Total xp:', canvas.width / 2 + canvas.width / 3 - lengthxp.width, canvas.height / 2 + 80)

                ctx.font = '25px sans-serif';
                ctx.fillStyle = '#302B37';
                ctx.fillText(limit1k(user.totalxp, 'k'), canvas.width / 2 + canvas.width / 3 - lengthxp.width + length.width + 5, canvas.height / 2 + 80)

                ctx.save();

                let serverimage = await loadImage(message.guild.iconURL)
                ctx.beginPath();
                ctx.arc(canvas.width - 80, 60, 50, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(serverimage, canvas.width - 130, 10, 100, 100)
                ctx.restore();

                //} avatar image{
                ctx.save()
                ctx.beginPath();
                ctx.arc(70, 60, 50, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                let avatar = await loadImage(message.member.user.displayAvatarURL);
                ctx.drawImage(avatar, 20, 10, 100, 100);
                ctx.restore()


                //}

                const attachment = new Discord.Attachment(canvas.toBuffer(), 'level.png');
                message.channel.send(attachment);



            }



        }, 500)

    }
}
module.exports = level
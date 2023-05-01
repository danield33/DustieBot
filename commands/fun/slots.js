// Dubbel | 9 May 2019
//edited by Nanigans 11-5-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class slots extends Command {
    constructor() {
        super({
            name: 'slots',
            description: 'desc',
            category: 'fun', //LOWER CASE!!!!
            usage: 'slots',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // if (!await Guild.get(message.guild.id, "modules.fun.slots.toggle")) return message.reply("That command is not enabled on this server | guild.")
        const slotIcons = ['🍇', '🍊', '🍐', '🍒', '🍋'];
        const slotstwo = [':grapes:', ':grapes:', ':grapes:', ':grapes:', ':grapes:'];
        const slotsthree = [':tangerine:', ':tangerine:', ':tangerine:', ':tangerine:', ':tangerine:'];
        const slotsfour = [':pear:', ':pear:', ':pear:', ':pear:', ':pear:',];
        const slotsfive = [':cherries: ', ':cherries: ', ':cherries: ', ':cherries: ', ':cherries: ',];
        const slotssix = [':lemon: ', ':lemon: ', ':lemon: ', ':lemon: ', ':lemon: '];
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        const jumpoSlots = [slotstwo, slotsthree, slotsfour, slotsfive, slotssix];
        let rslot //= Math.floor(Math.random() * jumpoSlots.length);
        let slotspecif //= Math.floor(Math.random() * slotIcons.length); Nanigans
        for (let i = 0; i < 5; i++) {
            rslot = Math.floor(Math.random() * jumpoSlots.length);
            slotspecif = Math.floor(Math.random() * slotIcons.length);
            arr1.push(jumpoSlots[rslot][slotspecif]);
        }
        for (let i = 0; i < 5; i++) {
            rslot = Math.floor(Math.random() * jumpoSlots.length);
            slotspecif = Math.floor(Math.random() * slotIcons.length);
            arr2.push(jumpoSlots[rslot][slotspecif]);

        }
        for (let i = 0; i < 5; i++) {
            rslot = Math.floor(Math.random() * jumpoSlots.length);
            slotspecif = Math.floor(Math.random() * slotIcons.length);
            arr3.push(jumpoSlots[rslot][slotspecif]);
        }
        for (let i = 0; i < 5; i++) {
            rslot = Math.floor(Math.random() * jumpoSlots.length);
            slotspecif = Math.floor(Math.random() * slotIcons.length);
            arr4.push(jumpoSlots[rslot][slotspecif]);
        }
        for (let i = 0; i < 5; i++) {
            rslot = Math.floor(Math.random() * jumpoSlots.length);
            slotspecif = Math.floor(Math.random() * slotIcons.length);
            arr5.push(jumpoSlots[rslot][slotspecif]);
        }


        let sEmbed = new Discord.RichEmbed()
            .setTitle('Slots')
            .setColor(bot.embed)
            .setDescription(slotIcons.join(' '))
        message.channel.send(sEmbed).then(r => {
            for (let i in arr1) {
                sEmbed.setDescription(`${arr1[i]} ${arr2[i]} ${arr3[i]} ${arr4[i]} ${arr5[i]}`)
                r.edit(sEmbed)
            }
        });
        if (arr1[arr1.length - 1] === arr2[arr2.length - 1] && arr2[arr2.length - 1] === arr3[arr3.length - 1]) {
            win()
        }
        else if (arr2[arr2.length - 1] === arr3[arr3.length - 1] && arr3[arr3.length - 1] === arr4[arr4.length - 1]) {
            win()
        }
        else if (arr3[arr3.length - 1] === arr4[arr4.length - 1] && arr4[arr4.length - 1] === arr5[arr5.length - 1]) {
            win();
        }
        else loose()
        function win() {
            setTimeout(() => { message.channel.send('Congratulations! You won!') }, 3000)
        }
        function loose() {
            setTimeout(() => { message.channel.send('Too bad, you lost. Better luck next time'); }, 3000)
        }
        return
        // const slotOne = slotIcons[Math.floor(Math.random() * slotIcons.length)];
        // const slotTwo = slotIcons[Math.floor(Math.random() * slotIcons.length)];
        // const slotThree = slotIcons[Math.floor(Math.random() * slotIcons.length)];

        let slotsembed = new Discord.RichEmbed()
            .setAuthor(`Slots`)
            .setColor(bot.embed)
        if (slotOne === slotTwo && slotOne === slotThree) {
            slotsembed.setDescription(`\n${slotOne}|${slotTwo}|${slotThree} \nWell done, you won!`)
        } else {
            slotsembed.setDescription(`\n${slotOne}|${slotTwo}|${slotThree} \nYou lost, next time better.`)
        }

        return message.channel.send(slotsembed)
    }
}
module.exports = slots
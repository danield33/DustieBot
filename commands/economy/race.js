//ProNanigans | 25-6-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const {createCanvas, loadImage} = require('canvas')

// Please replace Name on line 7 and 27 to command name.
class race extends Command {
    constructor(){
        super({
            name: 'horserace',
            aliases: [ 'race', 'hr' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Bet on which horse will win in a race with other people. Whoever guesses right, gets the prize money!',
            category: 'economy', //LOWER CASE!!!!
            usage: 'horserace',
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
        message.channel.send('Take your marks').then(async msg => {
            for(let i = 0; i < 6; i++){
        const canvas = createCanvas(192,144);
        const ctx = canvas.getContext('2d');
        const image = await loadImage(`images/sprites/horse sprite/Sprite/Horse/horse-run-0${i}.png`);
        ctx.drawImage(image, 0,0, canvas.width,canvas.height);
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'horse.png');
    }
        })

    }
}
module.exports = race
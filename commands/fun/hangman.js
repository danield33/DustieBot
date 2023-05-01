//ProNanigans | 6-30-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class hangman extends Command {
    constructor() {
        super({
            name: 'hangman',
            aliases: ['hm'], // REMOVE THIS IF THERE IS NONE!
            description: 'Play a game of hangman!',
            category: 'fun', //LOWER CASE!!!!
            usage: 'hangman <word>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        // CODE HERE\
        message.delete()
        let word = args.join(' ')
        if (!word) return message.reply("Please specify a string")
        let blur = word.replace(/(\w|\d)/g, '-')
        let footer = ['Characters Used:']
        let col = bot.embed
        let num = 0
        let numa = 0;
        let face = '😵'
        let desc = `\n┌─────┐\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n󠀀󠀀┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n┃\n┃\n┃\n/-\\`
        message.channel.send(`The word is ${word.length} characters long`)
        function embed(color, description, foot, replacer) {
            let hEmbed = new Discord.RichEmbed()
                .setTitle(`Hangman Game Has Been Started By ${message.author.username}\nTo stop, type 'stop'`)
                .setDescription(replacer + description)
                .setColor(color)
                .setFooter(foot)
            return hEmbed
        }
        message.channel.send(embed(col, desc, footer, blur)).then(r => {
            const Filter = m => m.author.id != `${message.author.id}`
            const collector = message.channel.createMessageCollector(Filter);
            const Filterr = m => m.author.id == `${message.author.id}`
            const collectorr = message.channel.createMessageCollector(Filterr);
            collectorr.on('collect', async m => {
                if (m.content == 'stop')
                    collectorr.stop();
                collector.stop();
                message.channel.send('Stopped the game')
            });
            collector.on('collect', async m => {
                m.delete()
                if (m.content == 'stop') { collector.stop(); return message.channel.send('Stopping the game! The word was: ' + word) }
                if (m.content.length > 1) return message.reply('Please only use one character at a time')

                if (footer.includes(m.content)) {
                    let same = `\nYou've already used that character` + desc
                    return r.edit(embed(bot.embed, same, footer, blur))
                }
                footer.push(m.content)


                if (word.includes(m.content)) {
                    let indexes = [];
                    for (let i = 0; i < word.length; i++) if (word[i] == m.content) indexes.push(i);
                    for (let i of indexes) {
                        blur = blur.split('')
                        blur.splice(i, 1, m.content)
                        blur = blur.join('')
                        numa += 1
                    }
                    col = '#1D761'
                    if (word.split(' ').join('').match(/(\w|\d)/g).length == numa) {
                        collector.stop();
                        col = '#E2A731'
                        desc = '\nCongratulations! You Saved The Hangman!\n' + desc
                    }
                    return r.edit(embed(col, desc, footer, blur))
                } else {
                    col = '#EF3A32'
                    num += 1
                    switch (num) {
                        case num = 1: desc = `\n┌─────┐\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n󠀀󠀀┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 ${face}\n┃\n┃\n/-\\`
                            break
                        case num = 2: desc = `\n┌─────┐\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n󠀀󠀀┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 ${face}\n┃󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀|\n┃\n/-\\`
                            break
                        case num = 3: desc = `\n┌─────┐\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n󠀀󠀀┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 ${face}\n┃󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀/|\n┃\n/-\\`
                            break
                        case num = 4: desc = `\n┌─────┐\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n󠀀󠀀┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 ${face}\n┃󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀/|\\\n┃\n/-\\`
                            break
                        case num = 5: desc = `\n┌─────┐\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n󠀀󠀀┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 ${face}\n┃󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀/|\\\n┃󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀/\n/-\\`
                            break
                        case num = 6: desc = `\n┌─────┐\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n󠀀󠀀┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀┋\n┃󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 ${face}\n┃󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀/|\\\n┃󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀󠀀 󠀀󠀀󠀀󠀀󠀀/\\\n/-\\`
                            break
                        case num = 7:
                            desc = `You have failed to save the hangman 😭\n The word was **${word}**`
                            collector.stop()
                            break
                    }
                    return r.edit(embed(col, desc, footer, blur))
                }

            });
        });//end of .then
    }
}
module.exports = hangman
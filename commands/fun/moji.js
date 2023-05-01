//Myst | 23.07.2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');

// Please replace Name on line 7 and 27 to command name.
class randomemoji extends Command {
    constructor(){
        super({
            name: 'randomemoji',
            aliases: [ 'moji' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Returns a random emoticon',
            category: 'fun', //LOWER CASE!!!!
            usage: '',
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
        //if (!await Guild.get(message.guild.id, "modules.fun.moji.toggle")) return message.reply("That command is not enabled on this server | guild.")
        
        const emojis = [
            '( ͡° ͜ʖ ͡°)',
            '¯\\_(ツ)_/¯',
            'ʕ•ᴥ•ʔ',
            '(▀̿Ĺ̯▀̿ ̿)',
            '(ง ͠° ͟ل͜ ͡°)ง',
            'ಠ_ಠ',
            "̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
            '[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]',
            "﴾͡๏̯͡๏﴿ O'RLY?",
            '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]',
            '(ᵔᴥᵔ)',
            '(¬‿¬)',
            '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)',
            '(づ￣ ³￣)づ',
            'ლ(ಠ益ಠლ)',
            'ಠ╭╮ಠ',
            '♪~ ᕕ(ᐛ)ᕗ',
            'ヾ(⌐■_■)ノ♪',
            '◉_◉',
            '\\ (•◡•) /',
            '༼ʘ̚ل͜ʘ̚༽',
            '┬┴┬┴┤(･_├┬┴┬┴',
            'ᕦ(ò_óˇ)ᕤ',
            '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',
            '（╯°□°）╯︵( .o.)',
            'ಠ‿↼',
            '◔ ⌣ ◔',
            '(ノಠ益ಠ)ノ彡┻━┻',
            '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)',
            "̿ ̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿",
            '(;´༎ຶД༎ຶ`)',
            '♥‿♥',
            'ᕦ(ò_óˇ)ᕤ',
            '(•_•) ( •_•)>⌐■-■ (⌐■_■)',
            '⌐╦╦═─ ಠ_ಠ , (¬‿¬)',
            '˙ ͜ʟ˙',
            ":')",
            '(°ロ°)☝',
            'ಠ⌣ಠ',
            '(；一_一)',
            '( ⚆ _ ⚆ )',
            '☜(⌒▽⌒)☞',
            "(ʘᗩʘ')",
            '¯\\(°_o)/¯',
            'ლ,ᔑ•ﺪ͟͠•ᔐ.ლ',
            '(ʘ‿ʘ)',
            'ಠ~ಠ',
            'ಠ_ಥ',
            'ಠ‿↼',
            '(>ლ)',
            '(ღ˘⌣˘ღ)',
            'ಠoಠ',
            'ರ_ರ',
            '◔ ⌣ ◔',
            '(✿´‿`)',
            'ب_ب',
            '┬─┬﻿ ︵ /(.□. ）',
            '☼.☼',
            '^̮^',
            '(>人<)',
            '>_>',
            '(/) (°,,°) (/)',
            '(･.◤)',
            '=U',
            '~(˘▾˘~)',
            '| (• ◡•)| (❍ᴥ❍ʋ)',
            'O_o',
            '(#^.^#)',
            '^_^',
            '(°o°)',
            '((+_+))'
          ]
          let index = Math.floor(Math.random() * (emojis.length)) 
  message.channel.send(emojis[index])
    }
}
module.exports = randomemoji
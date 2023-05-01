const Discord = require("discord.js")
const bot = require('../index.js')
const Guild = require('../util/models/guild')
const fs = require('fs')
const { Command } = require('../util/handlers/command/index.js');

//Please fill in the data below...
bot.on("ready", () => {
    let counter = 1,
        dir = "./commands",
        subDir = fs.readdirSync(dir)
    subDir.shift()
    for (let d of subDir) {
        fs.watch(`${dir}/${d}`, { encoding: 'UTF-8' }, (eventType, filename) => {
            if (eventType === "change") {
                counter++
                if (counter >= 2) { return counter = 0 }
                try {
                    delete require.cache[require.resolve(`../commands/${d}/${filename}`)]
                    bot.commands.delete(filename.slice(0, -3))
                    let cmd = require(`../commands/${d}/${filename}`)
                    cmd = new cmd()
                    bot.commands.set(cmd.name, cmd)
                } catch (err) {
                    if (err.message === "cmd is not a constructor") return
                    return console.log(err)
                }
                return console.log(`\x1b[36m`, `COMMAND: ${d}/${filename} updated!`, `\x1b[0m`);
            }
        })
    }
})
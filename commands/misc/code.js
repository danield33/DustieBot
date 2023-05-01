const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const hastebin = require('hastebin-gen');

class Code extends Command {
    constructor() {
        super({
            name: 'code',
            aliases: ['c'], // REMOVE THIS IF THERE IS NONE!
            description: 'Puts whatever code is in codeblock(\`\`\`) onto hastebin.',
            category: 'misc', //LOWER CASE!!!!
            usage: 'code \`\`\`language (code)\`\`\`',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.misc.code.toggle")) return message.reply("That command is not enabled on this server | guild.")

        message.delete()
        let codeblocks = ["asciidoc", "autohotkye", "bash", "coffeescript", "cpp", "cs", "css", "diff", "fix", "glsl", "ini", "json", "md", "prolog", "ml", "py", "tex", "xl", "xml", "js"]
        var content = args.join(" ")
        if (!content.startsWith("```")) return message.channel.send(`Please look at the format of this command! \`${await Guild.get(message.guild.id, "settings.botPrefix")}help code\``)
        content = content.slice(3).slice(0, -3)

        let lang;
        for (var i = 0; i < codeblocks.length; ++i) {
            if (content.indexOf(codeblocks[i]) != -1) {
                lang = codeblocks[i]
                break
            }
        }

        if (lang) content = content.slice(lang.length)
        if (!lang) lang = "txt"
        content = message.content.slice(10 + lang.length).slice(0, -3)

        hastebin(content, lang).then(r => {
            message.reply(`Converted the code to ${r}`)
        }).catch(console.error);
    }
}
module.exports = Code
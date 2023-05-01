const { Collection } = require('discord.js'),
    Discord = require("discord.js"),
    fs = require("fs"),
    queue = new Map();

const { Guild, User, Levels } = require('../../scripts/loader')

class Handler {
    constructor(Client, data = {}) {
        this.Client = Client
        if (data.disabled && !Array.isArray(data.disabled)) data.disabled = [data.disabled];
        else data.disabled = []
        this.Client.commands = new Collection()
        this.Client.aliases = new Collection()
        this.Client.devs = data.devs || []
        this.Client.disabled = data.disabled
        this.loadDefaultCommands(data.directory)
        Client.on('message', this._message.bind(this))
    }

    async _message(message) {
        if (message.author.bot || message.channel.type == "dm") return
        let DB = await Guild.get(message.guild.id)
        if (!DB) DB = await Guild.createGuildExport(message.guild.id, function (err, guild) { if (err) return console.log(err) })
        let prefixMention = new RegExp(`^<@!?${this.Client.user.id}> `);
        let prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : DB.settings.botPrefix
        if (!message.content.startsWith(prefix) || !prefix) return
        let args = message.content.slice(prefix.length).trim().split(/ +/)
        let command = args.shift().toLowerCase()
        let cGuild = this.Client.guilds.find(guild => guild.id === message.guild.id)
        command = this.getCommand(command)
        /* Handling stuff */
        if (command.error) return
        if (command.disabled) return message.reply("This command is currently disabled by the developers!")
        if (command.isDev() && (!this.Client.devs || !this.Client.devs.includes(message.author.id))) return message.reply("This is a developer command only. Good job for finding it!");
        if (command.isPremium()) {
            if (!DB.settings.botPremium) {
                let up = await User.find(message.author.id)
                if (!up) {
                    if (!this.Client.devs.includes(message.author.id)) return message.channel.send(new Discord.RichEmbed().setColor("#36393F").addField("This command is only for premium guilds only!", "Check out [premium](https://dustie.xyz/premium) on our site."))
                }
            }
        }
        if (command.isOwner()) {
            if (message.author.id != cGuild.owner.id) {
                if (!DB.settings.ownersID.includes(message.author.id)) return message.reply('Server owner may only perform this command.')
            }
        }
        if (command.isNSFW() && !message.channel.nsfw) return message.reply('This command is marked as NSFW, please use it in a NSFW channel.')
        if (command.isMod()) {
            if (DB.modules.moderation.toggle) {
                if (!message.member.roles.some(r => DB.modules.moderation.allowedroles.includes(r.id))) {
                    if (message.author.id != cGuild.owner.id) {
                        if (!DB.settings.ownersID.includes(message.author.id)) return message.reply("You do not have the Moderator role to preform this command.")
                    }
                }
            }
        }
        try {
            if (DB.settings.deleteSmessage) message.delete()
            message.client.embed = DB.settings.embedColor
            command.run(message, args, message.client, DB, queue)
        } catch (err) {
            return message.reply(`Oops, this shouldn't happen, please contact ${this.Client.devs.length < 1 ?
                'the bot owners' : this.Client.devs.map(o => !message.client.users.get(o) ? o :
                    message.client.users.get(o).tag).join(', or ')}. Here's the error\n\n\`${err.message}\``)
        }
        if (await Levels.check(message, message.author)) await Levels.add(message.guild.id, message.author.id, 'commandsused', 1)
    }

    getCommand(command) {
        if (!this.Client.commands.get(command)) command = this.Client.aliases.get(command)
        if (!command || (this.disabled && this.disabled.includes(command))) return { error: "Not a command" }
        return this.Client.commands.get(command)
    }

    loadDefaultCommands(directory) {
        let commands = fs.readdirSync(directory)
        commands.filter(f => fs.statSync(directory + f).isDirectory())
            .forEach(nestedDir => fs.readdirSync(directory + nestedDir)
                .forEach(f => commands.push(`${nestedDir}/${f}`)))
        commands = commands.filter(f => f.endsWith('.js'))
        if (commands.length < 1) return new Error(`'${directory}' has no commands in it.`)

        for (const file of commands) {
            let command = require(directory + file)
            // let registered = cmds.find(c => c.name == command.name)
            // if(!registered) {
            //     console.log(`\x1b[31m`, `COMMAND: ${file} isn't registered in util/json/commands.json!`, `\x1b[0m`);
            // } else {
            console.log(`\x1b[36m`, `COMMAND: ${file} loaded!`, `\x1b[0m`);
            command = new command()
            if (!command.getName()) return new Error(`'${file}' doesn't have a name.`)
            this.Client.commands.set(command.getName(), command)
            for (const alias of command.getAliases()) {
                this.Client.aliases.set(alias, command.getName())
            }
            // }
        }
    }
}

module.exports = Handler
const { Command } = require('../../util/handlers/command/index.js');
const { RichEmbed } = require('discord.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

class HelpCommand extends Command {
	constructor() {
		super({
			name: 'help',
			description: 'Shows a list of commands, or a list of commands in a category or a specific command.',
			usage: 'help [command | category]',
			category: 'util'
		});
	}
	async run(message, args, bot, db) {
		let embed = new RichEmbed().setColor(bot.embed);
		let owners = db.settings.ownersID; owners.push(message.guild.owner.id)
		let categories = Object.keys(db.modules).filter(c => db.modules[c].toggle);
		if (!args[0]) {
			for (var cat of categories) {
				if (['welcome', 'economy', 'bye', 'level'].includes(cat)) continue
				let commands = Object.keys(db.modules[cat]).filter(c => db.modules[cat][c].toggle)
				embed.setAuthor('Command list', bot.user.avatarURL)
					.setTitle('Click here to see all commands.\n\u200b')
					.setURL('https://dustie.xyz/commands')
					.addField(
						`${cat.toUpperCase().slice(0, 1) + cat.slice(1, cat.length)} [${commands.length}]`,
						`\`${commands.sort().join('`, `')}\``
					)
			}
			let utilCmd = bot.commands.filter(cmd => cmd.getCategory() == 'util')
			embed.addField(`Util [${utilCmd.size}]`, `\`${utilCmd.map(c => c.name).sort().join('`, `')}\``)
			let ownersCmd = bot.commands.filter(cmd => cmd.getCategory() == 'owner')
			if (owners.includes(message.author.id)) embed.addField(`Owner [${ownersCmd.size}]`, `\`${ownersCmd.map(c => c.name).sort().join('`, `')}\``)
			let devCmd = bot.commands.filter(cmd => cmd.getCategory() == 'dev')
			if (bot.guilds.get("549254272039256094").roles.get("549647957780332568").members.map(m => m.id).includes(message.author.id)) embed.addField(`Dev [${devCmd.size}]`, `\`${devCmd.map(c => c.name).sort().join('`, `')}\``)
			embed.addField('\u200b', '[Website](https://dustie.xyz/) - [Dashboard](https://dustie.xyz/dashboard) - [Invite Bot](https://dustie.xyz/invite) - [Support Server](https://dustie.xyz/discord) - [Donate](https://www.patreon.com/dustie)')

		} else if (args && categories.includes(args[0].toLowerCase())) {
			categories.push('dev'); categories.push('owner')
			embed.setAuthor(`Commands for category: ${args[0].toUpperCase().slice(0, 1) + args[0].toLowerCase().slice(1, args[0].length)}`, bot.user.avatarURL);
			if (args[0] === 'dev') embed.setDescription(`\`${bot.commands.filter(cmd => cmd.getCategory() == 'dev').map(c => c.name).sort().join('`, `')}\``)
			else if (args[0] === 'owner') embed.setDescription(`\`${bot.commands.filter(cmd => cmd.getCategory() == 'owner').map(c => c.name).sort().join('`, `')}\``)
			else embed.setDescription(`\`${Object.keys(db.modules[args[0]]).filter(c => db.modules[args[0]][c].toggle).sort().join('`, `')}\``)
		} else {
			let command = bot.Handler.getCommand(args[0]);
			if (command.error || bot.disabled.includes(command.getName()))
				return message.channel.send("I can't seem to find that command or category.");
			embed.setAuthor(`Command help for: ${args[0]}`, message.author.displayAvatarURL);
			embed.setDescription(command.getDescription());
			if (command.getAliases().length > 0) embed.addField('Aliases:', `\`${command.getAliases().join('`, `')}\``);
			if (command.getUsage() != null) embed.addField('Usage:', command.getUsage());
		}
		embed.setFooter(`${db.settings.botPrefix}help <command/category> for more information`, bot.user.avatarURL)
		return message.channel.send(embed)
	}
}
module.exports = HelpCommand;

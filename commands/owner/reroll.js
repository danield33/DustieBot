// Reroll giveaway cmd
// Carlo | 16/04
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');

class Reroll extends Command {
	constructor() {
		super({
			name: 'reroll',
			aliases: [''], // REMOVE THIS IF THERE IS NONE!
			description: 'Reroll a specific giveaway',
			category: 'owner', //LOWER CASE!!!!
			usage: 'reroll (message id of giveaway)',
			dev: false, // Developers only, defined in index.js
			owner: true, // Server owners only
			mod: false, // Moderator role only defined in dashboard
			nsfw: false, // If Command is not safe for work
			premium: false, // If command is only premium command only
			disabled: false // Disable the command if anything
		})
	}
	async run(message, args, bot) {
		if (isNaN(args[0])) {
			message.reply('Please provide a valid id of a message!').then(m => m.delete(5000))
		} else {
			let id = args[0]
			message.channel.fetchMessage(id).then(m => {
				var peopleJoined = m.reactions.get('🎉').users.array();
				for (var i = 0; i < peopleJoined.length; i++) {
					if (peopleJoined[i].id == bot.user.id) {
						peopleJoined.splice(i, 1)
					}
				}
				var index = Math.floor(Math.random() * peopleJoined.length)
				var winners = roll(m.winnerCount, peopleJoined, index)


				if (winners.length == 1) {
					m.isCounting = false;
					message.channel.send(winners + ` has won ${m.item}`)
					const newEmbed = new Discord.RichEmbed()
						.setColor("#36393F")
						.setTitle(`Prize: ${m.item}`)
						.setDescription(`Winner: ${winners}`)
					m.edit(newEmbed)
				} else if (winners.length > 1) {
					m.isCounting = false;
					message.channel.send(winners.join() + ` have won ${m.item}`)
					const newEmbed = new Discord.RichEmbed()
						.setColor("#36393F")
						.setTitle(`Prize: ${m.item}`)
						.setDescription(`Winners:\n${winners.join('\n')}`)
				}
				message.delete()

			})
				.catch(console.error);
		}
	}
}
module.exports = Reroll


function roll(count, joined, index) {
	var winners = [];
	for (var i = 0; i < count; i++) {
		winners.push(joined[index]);
		index = Math.floor(Math.random() * joined.length)
	}
	return winners;
}
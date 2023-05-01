// End giveaway cmd
// Carlo | 16/04
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');

class End extends Command {
	constructor() {
		super({
			name: 'end',

			description: 'End a specific giveaway',
			category: 'owner', //LOWER CASE!!!!
			usage: 'end (message id of giveaway)',
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

				message.delete()
				end(peopleJoined, winners, m, message, m.item)
			})
				.catch(console.error);
		}
	}
}
module.exports = End


function roll(count, joined, index) {
	var winners = [];
	for (var i = 0; i < count; i++) {
		winners.push(joined[index]);
		index = Math.floor(Math.random() * joined.length)
	}
	return winners;
}


function end(peopleJoined, winners, embedSent, message, item) {

	if (!embedSent) {
		message.reply('That message with that id does not exists in this channel!').then(m => m.delete(5000))
	} else if (!embedSent.isCounting) {
		message.reply('That message is not a valid giveaway or it‘s already finished!').then(m => m.delete(5000))
	} else if (!peopleJoined || peopleJoined.length == 0) {
		embedSent.isCounting = false;
		message.channel.send(`No one entered into the giveaway! Giveaway is canceled... `)
		const newEmbed = new Discord.RichEmbed()
			.setColor(bot.embed)
			.setTitle(`Prize: ${embedSent.item}`)
			.setDescription(`Winner: No Winners :(`)
		embedSent.edit(newEmbed)
	} else if (winners.length == 1) {
		embedSent.isCounting = false;
		message.channel.send(winners + ` has won ${embedSent.item}`)
		const newEmbed = new Discord.RichEmbed()
			.setColor(bot.embed)
			.setTitle(`Prize: ${embedSent.item}`)
			.setDescription(`Winner: ${winners}`)
		embedSent.edit(newEmbed)
	} else if (winners.length > 1) {
		embedSent.isCounting = false;
		message.channel.send(winners.join() + ` have won ${embedSent.item}`)
		const newEmbed = new Discord.RichEmbed()
			.setColor(bot.embed)
			.setTitle(`Prize: ${embedSent.item}`)
			.setDescription(`Winners:\n${winners.join('\n')}`)
		embedSent.edit(newEmbed)
	}
}
// Giveaway Command
// Carlo | 16/04
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const ms = require("ms")

class Giveaway extends Command {
	constructor() {
		super({
			name: 'giveaway',
			aliases: [''], // REMOVE THIS IF THERE IS NONE!
			description: 'Start a giveaway',
			category: 'owner', //LOWER CASE!!!!
			usage: 'giveaway (Amount of winners) (Time) (Price)',
			dev: false, // Developers only, defined in index.js
			owner: true, // Server owners only
			mod: false, // Moderator role only defined in dashboard
			nsfw: false, // If Command is not safe for work
			premium: false, // If command is only premium command only
			disabled: false // Disable the command if anything
		})
	}
	async run(message, args, bot) {
		let prefix = await Guild.get(message.guild.id, "settings.botPrefix")
		let helpMsg = 'Please provide an amount of winners! Usage: ' + prefix + "giveaway (Amount of winners) (Time) (Price)"
		var item = '';
		var winnerCount = args[0]
		if (!winnerCount) return message.reply(helpMsg)
		var time = args[1]
		if (!time) return message.reply(helpMsg)
		let millitime = ms(time)
		if (millitime > 2147483647) {
			message.reply('Given time is to long!')
		} else {

			for (var i = 2; i < args.length; i++) {
				item += (args[i] + " ");
			}

			let winnerOrwinners = "";
			if (winnerCount == 1) {
				winnerOrwinners = "Winner"
			} else {
				winnerOrwinners = "Winners"
			}

			let embed = new Discord.RichEmbed()
				.setColor("#36393F")
				.setDescription(`Click the 🎉 to enter!\nTime Left: ${load(millitime)}`)
				.setFooter(`${winnerCount} ${winnerOrwinners}`)
				.setTitle(`Prize: ${item}`)
			var embedSent = await message.channel.send(embed);
			embedSent.isCounting = true;
			embedSent.winnerCount = winnerCount;
			embedSent.item = item;
			embedSent.react('🎉');
			message.delete()
			setInterval(function () {
				if (embedSent.isCounting) {
					millitime -= 5000;
					const newTime = new Discord.RichEmbed()
						.setColor("#36393F")
						.setTitle(`Prize: ${embedSent.item}`)
						.setDescription(`Click the 🎉 to enter!\nTime Left: ${load(millitime)}`)
						.setFooter(`${winnerCount} ${winnerOrwinners}`)
					embedSent.edit(newTime)
				}
			}, 5000);
			setTimeout(function () {
				var peopleJoined = embedSent.reactions.get('🎉').users.array();
				for (var i = 0; i < peopleJoined.length; i++) {
					if (peopleJoined[i].id == bot.user.id) {
						peopleJoined.splice(i, 1)
					}
				}
				var index = Math.floor(Math.random() * peopleJoined.length)
				var winners = roll(winnerCount, peopleJoined, index)

				end(peopleJoined, winners, embedSent, message, item)

			}, ms(time))
		}
	}
}
module.exports = Giveaway


function roll(count, joined, index) {
	var winners = [];
	for (var i = 0; i < count; i++) {
		winners.push(joined[index]);
		index = Math.floor(Math.random() * joined.length)
	}
	return winners;
}


function end(peopleJoined, winners, embedSent, message) {

	if (!embedSent) {
		message.reply('That message with that id does not exists in this channel!').then(m => m.delete(5000))
	} else if (!embedSent.isCounting) {
		message.reply('That message is not a valid giveaway or it‘s already finished!').then(m => m.delete(5000))
	} else if (!peopleJoined || peopleJoined.length == 0) {
		embedSent.isCounting = false;
		message.channel.send(`No one entered into the giveaway! Giveaway is canceled... `)
		const newEmbed = new Discord.RichEmbed()
			.setColor("#36393F")
			.setTitle(`Prize: ${embedSent.item}`)
			.setDescription(`Winner: No Winners :(`)
		embedSent.edit(newEmbed)
	} else if (winners.length == 1) {
		embedSent.isCounting = false;
		message.channel.send(winners + ` has won ${embedSent.item}`)
		const newEmbed = new Discord.RichEmbed()
			.setColor("#36393F")
			.setTitle(`Prize: ${embedSent.item}`)
			.setDescription(`Winner: ${winners}`)
		embedSent.edit(newEmbed)
	} else if (winners.length > 1) {
		embedSent.isCounting = false;
		message.channel.send(winners.join() + ` have won ${embedSent.item}`)
		const newEmbed = new Discord.RichEmbed()
			.setColor("#36393F")
			.setTitle(`Prize: ${embedSent.item}`)
			.setDescription(`Winners:\n${winners.join('\n')}`)
		embedSent.edit(newEmbed)
	}
}

function load(millis) {
	var secs = Math.floor((millis / 1000) % 60);
	var mins = Math.floor((millis / (1000 * 60)) % 60)
	var hours = Math.floor((millis / (1000 * 60 * 60)) % 24)
	var days = Math.floor((millis / (1000 * 60 * 60 * 24)) % 7);
	var weeks = Math.floor(millis / (1000 * 60 * 60 * 24 * 7));
	if (weeks > 0) {
		return `${weeks} weeks, ${days} days, ${hours} hours, ${mins} minutes and ${secs} seconds`
	} else if (days > 0) {
		return `${days} days, ${hours} hours, ${mins} minutes and ${secs} seconds`
	} else if (hours > 0) {
		return `${hours} hours, ${mins} minutes and ${secs} seconds`
	} else if (mins > 0) {
		return `${mins} minutes and ${secs} seconds`
	} else if (secs > 0) {
		return `${secs} seconds`
	} else if (secs <= 0) {
		return `Rolling...`
	}
}
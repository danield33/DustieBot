const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

const options = [
  '🇦',
  '🇧',
  '🇨',
  '🇩',
  '🇪',
  '🇫',
  '🇬',
  '🇭',
  '🇮',
  '🇯',
  '🇰',
  '🇱',
  '🇲',
  '🇳',
  '🇴',
  '🇵',
  '🇶',
  '🇷',
  '🇸',
  '🇹',
  '🇺',
  '🇻',
  '🇼',
  '🇽',
  '🇾',
  '🇿',
];

const pollLog = {};

function canSendPoll(user_id) {
  if (pollLog[user_id]) {
    const timeSince = Date.now() - pollLog[user_id].lastPoll;
    if (timeSince < 30000) {
      return false;
    }
  }
  return true;
}

class poll extends Command {
  constructor() {
    super({
      name: 'poll',
      description: 'Creates a poll on anything!',
      category: 'misc',
      usage: 'poll "<Question 1>" "<Answer1>" "<Answer2>" "<Answer to 24>"',
      owner: false,
      disabled: false
    })
  }
  async run(message, args, bot) {
    if (!await Guild.get(message.guild.id, "modules.misc.poll.toggle")) return message.reply("That command is not enabled on this server | guild.")
    let arg = message.content.match(/"(.+?)"/g);
    if (arg) {
      if (!canSendPoll(message.author.id)) {
        return message.channel.send(`${message.author} please wait before sending another poll.`);
      } else if (arg.length === 1) { // yes no unsure question
        const question = arg[0].replace(/"/g, '');
        pollLog[message.author.id] = {
          lastPoll: Date.now()
        };
        let embed = new Discord.RichEmbed()
          .setTitle(`${message.author.username} asks:`, message.author.avatarURL)
          .setColor(bot.embed)
          .setDescription(question)
          .setTimestamp()
        return message.channel.send(embed)
          .then(async (pollMessage) => {
            await pollMessage.react('👍');
            await pollMessage.react('👎');
            await pollMessage.react(message.guild.emojis.get('475747395754393622'));
          });
      } else { // multiple choice
        arg = arg.map(a => a.replace(/"/g, ''));
        const question = arg[0];
        const questionOptions = [...new Set(arg.slice(1))];
        if (questionOptions.length > 20) {
          return message.channel.send(`${message.author} Polls are limited to 20 options.`);
        } else {
          pollLog[message.author.id] = {
            lastPoll: Date.now()
          };
          let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username} asks:`, message.author.avatarURL)
            .setColor(bot.embed)
            .addField(question, questionOptions.map((option, i) => `${options[i]} - ${option}`).join('\n'))
            .setTimestamp()
          return message.channel.send(embed)
            .then(async (pollMessage) => {
              for (let i = 0; i < questionOptions.length; i++) {
                await pollMessage.react(options[i]);
              }
            });
        }
      }
    } else {
      return message.channel.send(`${message.author} invalid Poll! Question and options should be wrapped in double quotes.`);
    }
  }
}
module.exports = poll

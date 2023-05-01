//ProNanigans | 4-5-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 27 to command name.
class tictactoe extends Command {
  constructor() {
    super({
      name: 'tictactoe',
      aliases: ['ttt'], // REMOVE THIS IF THERE IS NONE!
      description: 'Plays a game of tic tac toe with you and your opponent',
      category: 'fun', //LOWER CASE!!!!
      usage: 'd.tictactoe <@user>',
      dev: false, // Developers only, defined in index.js
      owner: false, // Server owners only
      mod: false, // Moderator role only defined in dashboard
      nsfw: false, // If Command is not safe for work
      premium: false, // If command is only premium command only
      disabled: false // Disable the command if anything
    })
  }
  async run(message, args, bot, db) { // add ', queue' if working with music/voice
    if (!db.modules.fun.tictactoe.toggle) return message.reply("That command is not enabled on this server | guild.")

    let tUser = await Guild.findUser(message, args.join(' '))
    if (!tUser) return message.reply("Are you playing against yourself?");
    if (tUser.user.bot) return message.reply("They don't want to play with you")
    if (tUser.id === message.author.id) return message.reply("You can't play against yourself");

    let one = ':one:',
      two = ':two:',
      three = ":three:",
      four = ":four:",
      five = ":five:",
      six = ":six:",
      seven = ":seven:",
      eight = ":eight:",
      nine = ":nine:";

    let x = ':x:',
      o = ':o:';
    let tarr = []
    let turn = message.author.id;
    const filter = (message, user) => message.content === '1' && message.author.id === `${turn}`
    const filter2 = (message, user) => message.content === '2' && message.author.id === `${turn}`;
    const filter3 = (message, user) => message.content === '3' && message.author.id === `${turn}`;
    const filter4 = (message, user) => message.content === '4' && message.author.id === `${turn}`;
    const filter5 = (message, user) => message.content === '5' && message.author.id === `${turn}`;
    const filter6 = (message, user) => message.content === '6' && message.author.id === `${turn}`;
    const filter7 = (message, user) => message.content === '7' && message.author.id === `${turn}`;
    const filter8 = (message, user) => message.content === '8' && message.author.id === `${turn}`;
    const filter9 = (message, user) => message.content === '9' && message.author.id === `${turn}`;
    const collector = message.channel.createMessageCollector(filter)
    const collector2 = message.channel.createMessageCollector(filter2)
    const collector3 = message.channel.createMessageCollector(filter3)
    const collector4 = message.channel.createMessageCollector(filter4)
    const collector5 = message.channel.createMessageCollector(filter5)
    const collector6 = message.channel.createMessageCollector(filter6)
    const collector7 = message.channel.createMessageCollector(filter7)
    const collector8 = message.channel.createMessageCollector(filter8)
    const collector9 = message.channel.createMessageCollector(filter9)
    const yes = (message, user) => message.content === 'y' && message.author.id === `${tUser.id}`
    var yesCollect = message.channel.createMessageCollector(yes, {
      time: 30000
    });
    let og = `${one} ${two} ${three}\n${four} ${five} ${six}\n${seven} ${eight} ${nine}\n ${message.author}***'s turn***`
    let tEmbed = new Discord.RichEmbed()
      .setTitle('TIC TAC TOE')
      .setDescription(`${message.author.username} VS ${tUser.user.username}`)
      .setColor('#36393F')
      .addField(`${tUser.user.username},`, `Type ***y*** to begin the game! You have **30** seconds to accept`);
    message.channel.send(tEmbed)
    yesCollect.on('collect', r => {
      message.channel.send(og).then(m => {
        yesCollect.stop()
        collector.on('collect', r => {
          collector.stop()
          r.delete()
          if (turn === message.author.id) {
            one = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            one = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector2.on('collect', r => {
          collector2.stop()
          r.delete()
          if (turn === message.author.id) {
            two = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            two = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector3.on('collect', r => {
          collector3.stop();
          r.delete()
          if (turn === message.author.id) {
            three = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            three = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector4.on('collect', r => {
          collector4.stop()
          r.delete()
          if (turn === message.author.id) {
            four = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            four = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector5.on('collect', r => {
          collector5.stop();
          r.delete()
          if (turn === message.author.id) {
            five = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            five = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector6.on('collect', r => {
          collector6.stop()
          r.delete()
          if (turn === message.author.id) {
            six = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            six = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector7.on('collect', r => {
          collector7.stop()
          r.delete()
          if (turn === message.author.id) {
            seven = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            seven = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector8.on('collect', r => {
          collector8.stop()
          r.delete()
          if (turn === message.author.id) {
            eight = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            eight = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
        collector9.on('collect', r => {
          collector9.stop()
          r.delete()
          if (turn === message.author.id) {
            nine = x
            checkw()
            turn = tUser.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          } else if (turn === tUser.id) {
            nine = o
            checkw()
            turn = message.author.id
            go(m, one, two, three, four, five, six, seven, eight, nine)
          }
          tie()
        });
      })
    })
    function go(mes, one, two, three, four, five, six, seven, eight, nine) {
      mes.edit(`${one} ${two} ${three}\n${four} ${five} ${six}\n${seven} ${eight} ${nine} \n <@${turn}>***'s turn***`)
    }
    function stopcols() {
      collector.stop();
      collector2.stop();
      collector3.stop();
      collector4.stop();
      collector5.stop();
      collector6.stop();
      collector7.stop();
      collector8.stop();
      collector9.stop();
    }
    function checkw(x, y) {
      if (one === ':x:' && two === ':x:' && three === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (one === ':x:' && five === ':x:' && nine === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (one === ':x:' && four === ':x:' && seven === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (one === ':o:' && two === ':o:' && three === ':o:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (one === ':o:' && five === ':o:' && nine === ':o:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (one === ':o:' && four === ':o:' && seven === ':o:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (two === ':x:' && five === ':x:' && eight === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (three === ':x:' && six === ':x:' && nine === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (four === ':x:' && five === 'five:' && six === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (seven === ':x:' && five === ':x:' && three === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (seven === ':x:' && eight === ':x:' && nine === ':x:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      //\
      if (three === ':o:' && six === ':o:' && nine === ':o:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (four === ':o:' && five === ':o:' && six === ':o:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (seven === ':o:' && eight === ':o:' && nine === ':o:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
      if (seven === ':o:' && five === ':o:' && three === ':o:') {
        stopcols()
        return message.channel.send(`Congratulations <@${turn}>, You've wone!`)
      }
    }
    function tie() {
      tarr.push('1')
      if (tarr.length >= 9) {
        stopcols()

        return message.channel.send('DRAW \nNobody won!')
      }
    }
  }
}
module.exports = tictactoe
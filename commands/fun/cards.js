//ProNanigans | 29-5-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');
const Deck = require('card-deck')
const ms = require('ms')
const http = require('http')


// Please replace Name on line 7 and 27 to command name.
class cards extends Command {
    constructor() {
        super({
            name: 'cards',
            aliases: ['c'], // REMOVE THIS IF THERE IS NONE!
            description: 'Allows you to play your own game with a deck of cards.',
            category: 'fun', //LOWER CASE!!!!
            usage: 'cards <minimum # of players> <time for people to join s/m/h> <private/public cards (default: private)>',
            dev: true, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        if (isNaN(args[0]) || args[0] < 0 || args[0].includes('.')) return message.reply("Please specify the number of players for the queue");
        if (isNaN(ms(args[1]))) return message.reply("Please specify the time in s/m/h")
        if (!args[2]) args[2] = 'private'
        let publicg = false;
        if (args[2] == 'public') publicg = true;
        else publicg = false;

        function send(string, user) {
            if (publicg == true) message.channel.send(string)
            if (publicg == false) user.send(string)
        }
        let deck = new Array();
        let suits = ['`spades`', 'diamonds', '`clubs`', 'hearts'];
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let inarr = [message.author];
        let num = 0;
        let turn = inarr[num];
        let pile = [];
        function getDeck() {
            for (let i = 0; i < suits.length; i++) {
                for (let j = 0; j < values.length; j++) {
                    let card = { Value: values[j], Suit: suits[i] };
                    deck.push(card)
                }
            }
            return deck
        }
        let myDeck = new Deck(getDeck());
        myDeck.shuffle()

        const filter = m => m.content === 'quejoin';
        const Lfilter = m => m.content === 'queleave';
        const Stfilter = m => m.content === 'gamestop' && m.author.id === `${inarr[0].id}`;
        const Startfilter = m => m.content.includes('gamestart') && m.author.id === `${inarr[0].id}`;

        message.channel.send(`Created a standard deck of cards with a ${args[2]} card game. \nWaiting for ${args[0]} players to queue up. Type **quejoin** to join the queue, **queleave** to leave the queue. ${message.author}, type **gamestart** when ready to start and **gamestop** to stop the queue!`).then(msg => {
            const join = message.channel.createMessageCollector(filter, {
                time: ms(args[1])
            });
            const leave = message.channel.createMessageCollector(Lfilter, {
                time: ms(args[1])
            });
            const stop = message.channel.createMessageCollector(Stfilter, {
                time: ms(args[1])
            });
            const start = message.channel.createMessageCollector(Startfilter);
            start.on('collect', m => {
                if (inarr.length < args[0]) return message.reply("Not enough players yet");
                /*
              
                  //Dont really need this part for this game but if anyone of you want to use it for your own game, feel free to.
                  if(m.content[0] == 'deal'){
                      let split = 52 / args[0]
                      let top
                          if(m.content[1] == 'all' && args[0] < 52){// gives an even amount of cards to everyone
                               inarr.forEach(function(i, j){
                                   let arr = []
                                   top = myDeck.draw(split)
                                  for(let k = 0; k < top.length; k++){
                                      arr.push(`**${top[k].Value}** of **${top[k].Suit}**`)
                                      }
                                      i.send(arr.join('\n')+'\n----------------------')
                                  })
                                  endcols(stop, join, leave, start)
                          }else if(!isNaN(m.content[1]) && m.content[1] < 52){
                          inarr.forEach(function(i, j){//everyone in inarr gets specified amount of cards
                              inarr.forEach(function(i, j){
                                  let arr = []
                                  top = myDeck.draw(m.content[1])
                                  console.log(top)
                                 for(let k = 0; k < top.length; k++){
                                     arr.push(`**${top[k].Value}** of **${top[k].Suit}**`)
                                     }
                                     i.send(arr.join('\n')+'\n----------------------')
                              })
                          });
                      
                          endcols(stop, join, leave, start)
  
                      }else{//if all else fails
                          return message.reply("Please specify either 'all' or a number that is less than 52")
                      }
                  }
                  */
                let top
                let hand = []
                inarr.forEach(function (i, j) {
                    let arr = []
                    top = myDeck.draw(6)
                    for (let k = 0; k < top.length; k++) {
                        arr.push(`**${top[k].Value}** of **${top[k].Suit}**`)
                    }
                    hand.push([arr])

                    i.send(arr.join('\n') + '\n----------------------')
                });

                endcols(stop, join, leave, start)
                function formatcard(x, y) {
                    return `${x.Value} of ${x.Suit}`
                }
                const Filter = m => m.id === `${turn.id}`
                const collector = message.channel.createMessageCollector(Filter);
                let card = `<:cardbackpng:584042471005093889>`
                let k1 = 'empty', p1 = formatcard(myDeck.drawRandom(1)), k2 = 'empty', p2 = formatcard(myDeck.drawRandom(1)), mp = card, p3 = formatcard(myDeck.drawRandom(1)), k3 = 'empty', p4 = formatcard(myDeck.drawRandom(1)), k4 = 'empty';
                let ogm = `.\n         ${k1}   ${p1}   ${k2}\n          ${p2}   ${mp}   ${p3}\n          ${k3}   ${p4}   ${k4}`
                message.channel.send(ogm).then(r => {
                    collector.on('collect', async m => {
                        console.log(m.content)
                        if (m.content == 'draw') {
                            let card = myDeck.draw(1)
                            console.log(hand[num][0])
                            hand[num][0].push(card);
                            m.author.send(card)
                        }

                    });//end of collector
                });// end of .then

            });//end of start collector




            join.on('collect', m => {
                let vv = m.author
                if (inarr.includes(m.author)) return message.reply("You've already joined the queue");
                inarr.push(vv)
                return message.channel.send(`${m.author}, You've joined the queue! Type **queleave** to leave. Queue size: **${inarr.length}/${args[0]}**`)

            }); //end of join collector

            stop.on('collect', m => {
                endcols(stop, join, leave, start);
                return message.channel.send(`I've stopped the queue and the game!`)
            });

            leave.on('collect', m => {
                let vv = m.author
                if (!inarr.includes(vv)) return message.reply("You're not even in the queue.")
                inarr = inarr.filter(function (item) {
                    return item !== vv
                });
                return message.reply("You've left the queue, queue size: **" + inarr.length + "**");
            });// end of leave collector



            join.on('end', collected => {
                if (inarr < args[0]) {
                    endcols(stop, join, leave)
                    return message.channel.send(`Times up! Not enough users to start. Needed players: ${args[0]}. Only got ${inarr.length}/${args[0]}`);
                } else if (collected.size + 1 >= args[0]) {
                    message.channel.send(`Times up! There are ${collected.size} players ready to play. ${message.author}, you can start the game now`)
                    leave.stop()
                    stop.stop()//some bs   
                }

            });


        });// end of .then from queueinfo or smth
        function endcols(x, y, z, i) {
            let cols = [x, y, z, i];
            cols.forEach(function (i) { i.stop() })
        }

    }
}
module.exports = cards

//ProNanigans | 4-14-19 - Will redo later
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please replace Name on line 7 and 27 to command name.
class connectfour extends Command {
    constructor() {
        super({
            name: 'connectfour',
            aliases: ['connect4', 'c4'], // REMOVE THIS IF THERE IS NONE!
            description: 'Plays a game of connect four and your opponent',
            category: 'fun', //LOWER CASE!!!!
            usage: 'd.connectfour <@user>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        //  :red_circle: :large_blue_circle: :white_circle:
        if (!db.modules.fun.connectfour.toggle) return message.reply("That command is not enabled on this server | guild.")
        let arr1 = [':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:'],
            arr2 = [':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:'],
            arr3 = [':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:'],
            arr4 = [':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:'],
            arr5 = [':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:'],
            arr6 = [':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:', ':white_circle:'];
        let board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        let abcs = `:regional_indicator_a: :regional_indicator_b: :regional_indicator_c: :regional_indicator_d:  :regional_indicator_e: :regional_indicator_f: :regional_indicator_g:`;

        let og = `${arr1.join(' ')} \n${arr2.join(' ')} \n${arr3.join(' ')} \n${arr4.join(' ')} \n${arr5.join(' ')} \n${arr6.join(' ')}\n${abcs}`
        let turn = message.author.id
        let cUser = await Guild.findUser(message, args.join(' '))
        if (!cUser) return message.reply("Are you playing against yourself?");
        if (cUser.user.bot) return message.reply("They don't want to play with you");
        if (cUser.id === message.author.id) return message.reply("You can't play against yourself")
        let red = ':red_circle:',
            blue = ':large_blue_circle:',
            white = ':white_circle:',
            tarr = []
        const filtera = (message, user) => message.content.toLowerCase() === 'a' && message.author.id === `${turn}`;
        const filterb = (message, user) => message.content.toLowerCase() === 'b' && message.author.id === `${turn}`;
        const filterc = (message, user) => message.content.toLowerCase() === 'c' && message.author.id === `${turn}`;
        const filterd = (message, user) => message.content.toLowerCase() === 'd' && message.author.id === `${turn}`;
        const filtere = (message, user) => message.content.toLowerCase() === 'e' && message.author.id === `${turn}`;
        const filterf = (message, user) => message.content.toLowerCase() === 'f' && message.author.id === `${turn}`;
        const filterg = (message, user) => message.content.toLowerCase() === 'g' && message.author.id === `${turn}`;
        const collectora = message.channel.createMessageCollector(filtera);
        const collectorb = message.channel.createMessageCollector(filterb);
        const collectorc = message.channel.createMessageCollector(filterc);
        const collectord = message.channel.createMessageCollector(filterd);
        const collectore = message.channel.createMessageCollector(filtere);
        const collectorf = message.channel.createMessageCollector(filterf);
        const collectorg = message.channel.createMessageCollector(filterg);
        const yesfilter = (message, user) => message.content === 'y' && message.author.id === `${cUser.id}`;
        const yCollect = message.channel.createMessageCollector(yesfilter, {
            time: 30000
        });
        let cEmbed = new Discord.RichEmbed()
            .setTitle("CONNECT FOUR")
            .setDescription(`${message.author.username} VS ${cUser.user.username}`)
            .setColor('#36393F')
            .addField(cUser.user.username, 'Type ***y*** to begin the game! You have **30 seconds** to accept');
        message.channel.send(cEmbed);
        let piece = red
        let alayer = 5;
        let blayer = 5;
        let clayer = 5;
        let dlayer = 5;
        let elayer = 5;
        let flayer = 5;
        let glayer = 5;
        let arr = [collectora, collectorb, collectorc, collectord, collectore, collectorf, collectorg];

        let marr = [arr1, arr2, arr3, arr4, arr5, arr6];
        yCollect.on('collect', r => {
            yCollect.stop()
            message.channel.send(`${og}`).then(msg => {
                collectora.on('collect', r => {
                    r.delete();
                    if (turn === message.author.id) {
                        //      win()
                        turn = cUser.id
                        play(0, msg, marr, alayer)
                        alayer -= 1
                        piece = blue
                        if (alayer == -1) collectora.stop()
                    }
                    else if (turn === cUser.id) {
                        //    win();
                        turn = message.author.id
                        play(0, msg, marr, alayer)
                        alayer -= 1
                        piece = red
                        if (alayer == -1) collectora.stop()
                    }
                });//a
                collectorb.on('collect', r => {
                    r.delete();
                    if (turn === message.author.id) {
                        turn = cUser.id
                        play(1, msg, marr, blayer)
                        blayer -= 1
                        piece = blue;
                    } else if (turn === cUser.id) {
                        turn = message.author.id;
                        play(1, msg, marr, blayer)
                        blayer -= 1
                        piece = red;
                    }
                    if (blayer == -1) collectorb.stop()

                });
                collectorc.on('collect', r => {
                    r.delete();

                    if (turn === message.author.id) {
                        turn = cUser.id
                        play(2, msg, marr, clayer)
                        clayer -= 1
                        piece = blue;
                    } else if (turn === cUser.id) {
                        turn = message.author.id;
                        play(2, msg, marr, clayer)
                        clayer -= 1
                        piece = red;
                    }
                    if (clayer == -1) collectorc.stop()

                });
                collectord.on('collect', r => {
                    r.delete();

                    if (turn === message.author.id) {
                        turn = cUser.id
                        play(3, msg, marr, dlayer)
                        dlayer -= 1
                        piece = blue;
                    } else if (turn === cUser.id) {
                        turn = message.author.id;
                        play(3, msg, marr, dlayer)
                        dlayer -= 1
                        piece = red;
                    }
                    if (dlayer == -1) collectord.stop()

                });
                collectore.on('collect', r => {
                    r.delete();

                    if (turn === message.author.id) {
                        turn = cUser.id
                        play(4, msg, marr, elayer)
                        elayer -= 1
                        piece = blue;
                    } else if (turn === cUser.id) {
                        turn = message.author.id;
                        play(4, msg, marr, elayer)
                        elayer -= 1
                        piece = red;
                    }
                    if (elayer == -1) collectore.stop()
                });
                collectorf.on('collect', r => {
                    r.delete();

                    if (turn === message.author.id) {
                        turn = cUser.id
                        play(5, msg, marr, flayer)
                        flayer -= 1
                        piece = blue;
                    } else if (turn === cUser.id) {
                        turn = message.author.id;
                        play(5, msg, marr, flayer)
                        flayer -= 1
                        piece = red;
                    }
                    if (flayer == -1) collectorf.stop()
                });
                collectorg.on('collect', r => {
                    r.delete();
                    if (turn === message.author.id) {
                        turn = cUser.id
                        play(6, msg, marr, glayer)
                        glayer -= 1
                        piece = blue;
                    } else if (turn === cUser.id) {
                        turn = message.author.id;
                        play(6, msg, marr, glayer)
                        glayer -= 1
                        piece = red;
                    }
                    if (glayer == -1) collectorg.stop()
                });

            }); //end of first .then

        }); //end of yescollect
        function play(x, y, a, z) {
            let num = 1
            if (turn != cUser.id) num = 2
            else if (turn == message.author.id) num = 1
            if (board[z][x] == 0) {
                a[z][x] = piece
                board[z][x] = num
                z -= 1
                og = `${arr1.join(' ')} \n${arr2.join(' ')} \n${arr3.join(' ')} \n${arr4.join(' ')} \n${arr5.join(' ')} \n${arr6.join(' ')}\n${abcs} \n <@${turn}>'s turn`
                y.edit(og)
            } else if (board[z][x] != 0) {
                board[z][x] = num
                a[z][x] = piece
                og = `${arr1.join(' ')} \n${arr2.join(' ')} \n${arr3.join(' ')} \n${arr4.join(' ')} \n${arr5.join(' ')} \n${arr6.join(' ')}\n${abcs} \n <@${turn}>'s turn`
                y.edit(og)
            }
            win(num - 1)

        } //play function
        let num = 3
        function win(x, y) {
            // console.log(board)
            let jarr = [message.author.id, cUser.id]
            {//this code block is for horizontle wins
                for (let j = 0; j < board.length; j++) {
                    for (let i = 0; i < board.length; i++) {
                        if (board[i][j] != 0 && board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2] && board[i][j] == board[i][j + 3]) {
                            stop();
                            return message.channel.send(`<@${jarr[x]}> has won!`)
                        }
                    }
                }
            }//horizontle wins
            {//verticle wins

                let ajarr = []
                for (let i = 0; i <= 2; i++) {
                    for (let j = 0; j <= 3; j++) {
                        if (board[i][j] != 0 && board[i][j] == board[i + 1][j] && board[i][j] == board[i + 2][j] && board[i][j] == board[i + 3][j]) {
                            stop();
                            return message.channel.send(`<@${jarr[x]}> has won!`)
                        }
                    }
                }

            }//verticle wins
            {//diagonal /
                for (let i = 5; i > 2; i--) {
                    for (let j = 0; j < 3; j++) {
                        if (board[i][j] != 0 && board[i][j] == board[i - 1][j + 1] && board[i][j] == board[i - 2][j + 2] && board[i][j] == board[i - 3][j + 3]) {
                            stop()
                            return message.channel.send(`<@${jarr[x]}> has won!`)
                        }

                    }
                }
                // diagonal \
                for (let i = 0; i <= 2; i++) {
                    for (let j = 0; j <= 3; j++) {
                        if (board[i][j] != 0 && board[i][j] == board[i + 1][j + 1] && board[i][j] == board[i + 2][j + 2] && board[i][j] == board[i + 3][j + 3]) {
                            stop()
                            return message.channel.send(`<@${jarr[x]}> has won!`)

                        }
                    }
                }
            }//diagonal
        }//win function
        function stop() {
            arr.forEach(function (i) {
                i.stop();
            })
        }


    }
}
module.exports = connectfour
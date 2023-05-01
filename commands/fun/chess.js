//ProNanigans | 8-1-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const { loadImage, createCanvas } = require('canvas');
const pos = require('../../source/sprites/chess sprites/position.json');

// Please replace Name on line 7 and 27 to command name.
class chess extends Command {
    constructor() {
        super({
            name: 'chess',
            aliases: ['c'], // REMOVE THIS IF THERE IS NONE!
            description: 'Play a game of chess!\n\n Whoever starts it, is white. You play by typing the piece\'s coordinates you want to move to the coordinates you want to move to. \n To see the board again, on the users turn, type "showboard" and to quit, type "quit." This can only be done on your turn',
            category: 'fun', //LOWER CASE!!!!
            usage: 'chess <@user>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!db.modules.fun.chess.toggle) return message.reply("That command is not enabled on this server | guild.")
        let channel
        let prevchan = message.channel
        if (!db.modules.fun.chess.samechannel) {
            message.guild.createChannel('Chess Game', { type: 'text' }).then(r => {
                message.reply(`Your game will be in ${r}`)
                channel = r
                message.channel = r
            })
        }
        let tUser = await Guild.findUser(message, args.join(' '))
        if(!tUser) return message.reply("Couldn't find user")
        if (!tUser) return message.reply("who are you playing against?");
        if (tUser.user.bot) return message.reply(`${tUser} doesn't want to play with you`)
        const filterer = (msg) => msg.author.id == tUser.id
        const collectorer = message.channel.createMessageCollector(filterer, { time: 30000 })
        let cEmbed = new Discord.RichEmbed()
            .setTitle('CHESS')
            .setDescription(`${tUser}, ${message.author} challenged you to a game of chess! Do you agree? \n **yes** or **no**\nTo see the rules, type d.chess and if you encounter any bugs, tell one of the developers.`)
            .setColor(bot.embed)
            .setFooter('30 seconds to accept');
        message.channel.send(cEmbed)
        collectorer.on('collect', async z => {
            if (z.content.toLowerCase() == 'yes') collectorer.stop()
            else if (z.content.toLowerCase() == 'no') { message.channel.send("Did not agree to the challenge"); channel.delete(); return collectorer.stop(); }
            else return
            const canvas = createCanvas(675, 675)
            const ctx = canvas.getContext('2d')
            let blocksize = 600 / 8
            //if you're viewing, you should fold in the positions
            let positions = {
                "white":
                    [
                        {
                            "piece": "PIECE_CASTLE",
                            "row": 0,
                            "col": 0,
                            "inplay": true,
                            "src": "w_rook_1x",
                            "direction": ["verticle", "horizontle"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_KNIGHT",
                            "row": 0,
                            "col": 1,
                            "inplay": true,
                            "src": "w_knight_1x",
                            "direction": ["L"],
                            "max": 3,
                            "special": null
                        },
                        {
                            "piece": "PIECE_BISHOP",
                            "row": 0,
                            "col": 2,
                            "inplay": true,
                            "src": "w_bishop_1x",
                            "direction": ["diagonal"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_QUEEN",
                            "row": 0,
                            "col": 3,
                            "inplay": true,
                            "src": "w_queen_1x",
                            "direction": ["verticle", "horizontle", "diagonal"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_KING",
                            "row": 0,
                            "col": 4,
                            "inplay": true,
                            "src": "w_king_1x",
                            "direction": ["verticle", "horizontle", "diagonal"],
                            "max": 1,
                            "special": null
                        },

                        {
                            "piece": "PIECE_BISHOP",
                            "row": 0,
                            "col": 5,
                            "inplay": true,
                            "src": "w_bishop_1x",
                            "direction": ["diagonal"],
                            "max": 8,
                            "special": null

                        },
                        {
                            "piece": "PIECE_KNIGHT",
                            "row": 0,
                            "col": 6,
                            "inplay": true,
                            "src": "w_knight_1x",
                            "direction": ["L"],
                            "max": 3,
                            "special": null

                        },
                        {
                            "piece": "PIECE_CASTLE",
                            "row": 0,
                            "col": 7,
                            "inplay": true,
                            "src": "w_rook_1x",
                            "direction": ["verticle", "horizontle"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 0,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 1,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 2,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 3,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 4,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 5,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 6,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 1,
                            "col": 7,
                            "inplay": true,
                            "src": "w_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        }
                    ],
                "black":
                    [
                        {
                            "piece": "PIECE_CASTLE",
                            "row": 7,
                            "col": 0,
                            "inplay": true,
                            "src": "b_rook_1x",
                            "direction": ["verticle", "horizontle"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_KNIGHT",
                            "row": 7,
                            "col": 1,
                            "inplay": true,
                            "src": "b_knight_1x",
                            "direction": ["L"],
                            "max": 3,
                            "special": null
                        },
                        {
                            "piece": "PIECE_BISHOP",
                            "row": 7,
                            "col": 2,
                            "inplay": true,
                            "src": "b_bishop_1x",
                            "direction": ["diagonal"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_KING",
                            "row": 7,
                            "col": 3,
                            "inplay": true,
                            "src": "b_king_1x",
                            "direction": ["verticle", "horizontle", "diagonal"],
                            "max": 1,
                            "special": null
                        },
                        {
                            "piece": "PIECE_QUEEN",
                            "row": 7,
                            "col": 4,
                            "inplay": true,
                            "src": "b_queen_1x",
                            "direction": ["verticle", "horizontle", "diagonal"],
                            "max": 8,
                            "special": null
                        },


                        {
                            "piece": "PIECE_BISHOP",
                            "row": 7,
                            "col": 5,
                            "inplay": true,
                            "src": "b_bishop_1x",
                            "direction": ["diagonal"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_KNIGHT",
                            "row": 7,
                            "col": 6,
                            "inplay": true,
                            "src": "b_knight_1x",
                            "direction": ["L"],
                            "max": 3,
                            "special": null
                        },
                        {
                            "piece": "PIECE_CASTLE",
                            "row": 7,
                            "col": 7,
                            "inplay": true,
                            "src": "b_rook_1x",
                            "direction": ["verticle", "horizontle"],
                            "max": 8,
                            "special": null
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 0,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 1,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 2,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 3,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 4,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 5,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 6,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        },
                        {
                            "piece": "PIECE_PAWN",
                            "row": 6,
                            "col": 7,
                            "inplay": true,
                            "src": "b_pawn_1x",
                            "direction": ["verticle"],
                            "max": 2,
                            "special": "diagonal"
                        }
                    ]
            }
            let users = [message.author, tUser], cols = ['white', 'black']
            let turn = {
                user: users[0],
                color: cols[0],
                check: false
            }
            await drawBoard()
            await drawPieces()
            message.channel.send(sendMessage()).then(() => {

                const filter = (msg) => msg.author.id == turn.user.id
                const collector = message.channel.createMessageCollector(filter)
                collector.on('collect', async m => {
                    if (m.content.toLowerCase() == 'stop') {
                        collector.stop();
                        message.channel.send('Stopped the game!')
                        if (!db.modules.fun.chess.samechannel) {
                            return setTimeout(() => channel.delete()), 3000
                        }
                    }
                    if (m.content.toLowerCase() == 'showboard') message.channel.send(sendMessage())
                    if (m.content.toLowerCase().split(' ')[0] == 'override') {
                        if (m.author.id != '264521312544751617') return
                        m = m.content.split(' ').slice(1)

                        let pieceindex = convert(m[0]);
                        let newpos = convert(m[1])

                        let piece = await findPiece(pieceindex[0], pieceindex[1], turn.color)
                        piece.row = newpos[1]
                        piece.col = newpos[0]
                        await drawBoard()
                        await drawPieces()
                        return message.channel.send(sendMessage());
                    }
                    if (m.content.toLowerCase().split(' ')[0] == 'go') {
                        m = m.content.toLowerCase().split(' ').slice(1)
                        let pieceindex = convert(m[0]);
                        let newpos = convert(m[1])
                        let piece = await findPiece(pieceindex[0], pieceindex[1], turn.color)
                        if (!piece) return message.channel.send('Couldn\'t find that piece, try again');

                        let valid = validateMove(pieceindex, newpos, piece).some(r => r == true)
                        if (!valid) return message.channel.send(`Invalid move from ${m[0]} to ${m[1]}`)
                        await kill(pieceindex, newpos)
                        piece.row = newpos[1]
                        piece.col = newpos[0]
                        let coler = turn.color == 'white' ? 7 : 0
                        if (piece.row == coler && piece.piece == 'PIECE_PAWN') {
                            await choosePromo(pieceindex, newpos, piece)
                            let filterchoose = (msg) => msg.author.id == turn.user.id
                            message.channel.send('Choose one of these pieces to get a promotion:\n \`\`castle/rook, knight/horse, bishop, queen or none\`\`').then(async b => {

                                await message.channel.awaitMessages(filterchoose, { max: 1, time: 30000, errors: 'time' })
                                    .then(async collected => {

                                        let arr = ['castle', 'knight', 'bishop', 'queen']
                                        if (collected.first().content.toLowerCase().includes('rook')) collected.first().content = 'caslte'
                                        if (collected.first().content.toLowerCase().includes('horse')) collected.first().content = 'knight'
                                        if (!arr.includes(collected.first().content.toLowerCase())) return message.channel.send(`${turn.user}, please specify which piece you would like to promote to`)
                                        piece.piece = `PIECE_${collected.first().content.toUpperCase()}`;
                                        piece.src = `${turn.color.split('')[0]}_${collected.first().content.toLowerCase()}_1x`
                                        piece.direction = positions[turn.color].find(i => i.piece == `PIECE_${collected.first().content.toUpperCase()}`).direction
                                        piece.max = positions[turn.color].find(i => i.piece == `PIECE_${collected.first().content.toUpperCase()}`).max
                                        piece.special = await positions[turn.color].find(i => i.piece == `PIECE_${collected.first().content.toUpperCase()}`).special
                                        await drawBoard()
                                        await drawPieces()
                                        message.channel.send(sendMessage())

                                        if (await checkcheck()) {
                                            message.channel.send('Check!')
                                            turn.user = users.reverse()[0]; turn.color = cols.reverse()[0];
                                            turn.check = true
                                            turn.color == 'white' ? message.channel.send(`${turn.user}'s turn on the **${turn.color}** team`) : message.channel.send(`${turn.user}'s turn on the \`\`${turn.color}\`\` team`)
                                            return
                                        }
                                        turn.user = users.reverse()[0]; turn.color = cols.reverse()[0];
                                        turn.color == 'white' ? message.channel.send(`${turn.user}'s turn on the **${turn.color}** team`) : message.channel.send(`${turn.user}'s turn on the \`\`${turn.color}\`\` team`)
                                    });

                            })
                            return
                        }


                        await drawBoard()
                        await drawPieces()
                        message.channel.send(sendMessage())
                        if (await checkcheck()) message.channel.send('Check!')
                        turn.check = false
                        turn.user = users.reverse()[0]; turn.color = cols.reverse()[0];
                        turn.color == 'white' ? message.channel.send(`${turn.user}'s turn on the **${turn.color}** team`) : message.channel.send(`${turn.user}'s turn on the \`\`${turn.color}\`\` team`)
                        return
                    }
                })
            });

            async function checkcheck(pieceindex, piece) {
                let kingpos
                let check
                let kingw = positions.white.find(i => i.piece == 'PIECE_KING')
                let kingb = positions.black.find(i => i.piece == 'PIECE_KING')
                if (turn.color == 'black') {
                    kingpos = [kingw.col, kingw.row];
                    for (let i of positions.black) {
                        if (validateMove([i.col, i.row], kingpos, i).includes(true) && i.piece != 'PIECE_KING') {
                            //console.log(i, kingpos)
                            check = true
                            break
                        }
                    }
                } else if (turn.color == 'white') {
                    kingpos = [kingb.col, kingb.row];
                    for (let i of positions.white) {
                        if (validateMove([i.col, i.row], kingpos, i).includes(true) && i.piece != 'PIECE_KING') {
                            check = true
                            break


                        }
                    }
                }
                if (check) return true
                else return false

            }
            async function choosePromo(pieceindex, newpos, piece) {
                let Canvas = createCanvas(800, 800);
                let Ctx = Canvas.getContext('2d');
                let image = await loadImage('https://cdn.discordapp.com/attachments/443166744803278858/607062982077186048/3253997_46826.png');
                Ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                let castle = await loadImage(`images/sprites/chess sprites/pieces/${turn.color.split('')[0]}_rook_1x.png`)
                let knight = await loadImage(`images/sprites/chess sprites/pieces/${turn.color.split('')[0]}_knight_1x.png`)
                let bishop = await loadImage(`images/sprites/chess sprites/pieces/${turn.color.split('')[0]}_bishop_1x.png`)
                let queen = await loadImage(`images/sprites/chess sprites/pieces/${turn.color.split('')[0]}_queen_1x.png`)
                Ctx.drawImage(castle, 5, 5, canvas.width / 2, canvas.height / 2)
                Ctx.drawImage(knight, canvas.width / 2 + 5, 0, canvas.width / 2, canvas.height / 2)
                Ctx.drawImage(bishop, 5, canvas.height / 2 - 5, canvas.width / 2, canvas.height / 2)
                Ctx.drawImage(queen, canvas.width / 2 + 5, canvas.height / 2 - 5, canvas.width / 2, canvas.height / 2)


                let attachment = new Discord.Attachment(Canvas.toBuffer(), 'chess.png');
                message.channel.send(attachment)
            }


            function range(x, y) {
                //y is the number to go to
                return [...Array(Math.abs(x - y)).keys()].map(i => i + y)

            }
            function inWayvert(pieceindex, newpos, piece, boolean) {
                let found, between = []
                let coo //= newpos[1] < pieceindex[1]?coordsbetween([pieceindex[1],pieceindex[0]], [newpos[1],newpos[0]]).splice(1):coordsbetween([newpos[1],newpos[0]], pieceindex[1],pieceindex[0]).pop()
                if (newpos[1] < pieceindex[1]) { coo = coordsbetween([newpos[1], newpos[0]], [pieceindex[1], pieceindex[0]]); coo.pop(); coo.reverse() }
                else coo = coordsbetween([pieceindex[1], pieceindex[0]], [newpos[1], newpos[0]]).splice(1);
                for (let i in coo) {
                    if (newpos[1] < pieceindex[1]) { between.push([pieceindex[0], coo[i][0]]); continue }
                    else { between.push([pieceindex[0], coo[i][0]]); continue }
                }

                for (let i of between) {
                    if (findPiece(i[0], i[1], turn.color)) {
                        found = findPiece(i[0], i[1], turn.color)
                        break
                    }
                    if (findPiece(i[0], i[1], cols[1])) {
                        if (findPiece(i[0], i[1], cols[1]) && i[1] == newpos[1] && piece.piece != 'PIECE_PAWN') break
                        found = findPiece(i[0], i[1], cols[1]);
                        break
                    }
                }
                if (found && found.piece == 'PIECE_KING' && boolean) return true
                if (found) return true
                return false
            }

            function inWayhor(pieceindex, newpos, piece, boolean) {
                let found, between
                if (turn.color == 'white') {
                    if (newpos[0] > pieceindex[0]) between = range(newpos[0] + 1, piece.col).splice(1) // not right
                    else between = range(newpos[0] + 1, piece.col) // not left
                }
                else if (turn.color == 'black') {
                    if (newpos[0] > pieceindex[0]) between = range(newpos[0] + 1, piece.col).splice(1)
                    else between = range(pieceindex[0], newpos[0]) // not left
                }
                for (let i of between) {
                    if (findPiece(i, piece.row, turn.color)) {
                        found = findPiece(i, piece.row, turn.color);
                        break
                    }
                    if (findPiece(i, piece.row, cols[1])) {
                        if (findPiece(i, piece.row, cols[1]) && i == newpos[0]) break
                        found = findPiece(i, piece.row, turn.color);
                        break
                    }
                }
                if (found && found.piece == 'PIECE_KING' && boolean) return true
                if (found) return true
                return false

            }

            function inWaydiag(pieceindex, newpos, piece, boolean) {
                let found, rangecol, rangerow
                let coords = coordsbetween(pieceindex, newpos).splice(1)
                for (let i in coords) {
                    if (findPiece(coords[i][0], coords[i][1], turn.color)) {
                        found = findPiece(coords[i][0], coords[i][1], turn.color)
                        break
                    }
                    if (findPiece(coords[i][0], coords[i][1], cols[1])) {
                        if (findPiece(coords[i][0], coords[i][1], cols[1]) && coords[i][0] == newpos[0] && coords[i][1] == newpos[1]) break
                        found = findPiece(coords[i][0], coords[i][1], cols[1])
                        break
                    }
                }


                if (found && found.piece == 'PIECE_KING' && boolean) return true
                if (found) return true
                return false

            }
            function inWayHorse(pieceindex, newpos, piece) {
                let over = findPiece(newpos[0], newpos[1], turn.color)

                if (over && over.piece == 'PIECE_KING') return true
                if (over) return true
                return false
            }



            function slope(a, b) {
                if (a[0] == b[0]) {//if flat line // 0
                    return null;
                }
                return (b[1] - a[1]) / (b[0] - a[0]);
            }

            function intercept(point, slope) {
                if (slope === null) {
                    // if vert line // undefined
                    return point[0];
                }
                return point[1] - slope * point[0];
            }
            function coordsbetween(A, B) {
                //[x, y], [x, y]
                let m = slope(A, B);
                let b = intercept(A, m);

                let coordinates = [];
                for (let x = A[0]; x <= B[0]; x++) {
                    let y = m * x + b;
                    coordinates.push([x, y]);
                }
                return coordinates
            }


            function kill(pieceindex, newpos) {
                let color = turn.color == 'white' ? 'black' : 'white'
                let piece = findPiece(newpos[0], newpos[1], color);
                if (!piece) return null
                piece.inplay = false
                return message.channel.send(`${turn.user} has killed a ${color} ${piece.piece.toLowerCase().split('_')[1]}`).then(r => r.delete(1000))
            }

            function deathbypawn(pieceindex, newpos, piece) {
                if (piece.piece != 'PIECE_PAWN') return false
                let npiece = findPiece(newpos[0], newpos[1], cols[1]);
                if (!npiece) return false
                let dis = Math.sqrt(Math.pow(newpos[1] - pieceindex[1], 2) + Math.pow(newpos[0] - pieceindex[0], 2))
                if (Math.floor(dis) > 1) return false
                piece.direction.push(piece.special)
                if ((piece.col == npiece.col && (piece.row + 1 == npiece.row || piece.row - 1 == npiece.row))) return false// || (npiece.col == newpos[0]-1 && npiece.row == newpos[1]-1) || (npiece.col == newpos[0]+1 && npiece.row == newpos[1]-1) || (npiece.col == newpos[0]-1 && npiece.row == newpos[1]+1)) return true
                return true
            }

            function leaveCheck(pieceindex, newpos, piece) {
                piece.col = newpos[0];
                piece.row = newpos[1]
                if (checkcheck()) {
                    piece.col = pieceindex[0];
                    piece.row = pieceindex[1];
                    return true
                }
                else {
                    piece.col = pieceindex[0];
                    piece.row = pieceindex[1]
                    return false
                }
            }

            function validateMove(pieceindex, newpos, piece) {
                let valids = [deathbypawn(pieceindex, newpos, piece), horse(pieceindex, newpos, piece), verticle(pieceindex, newpos, piece), horizontle(pieceindex, newpos, piece), diagonal(pieceindex, newpos, piece)];

                if (piece.piece == 'PIECE_PAWN') {
                    piece.direction.filter(i => i == 'diagonal')
                }
                if (turn.check == true) return [false]
                return valids
            }

            function verticle(pieceindex, newpos, piece) {
                if (!piece.direction.includes('verticle')) return false
                if (piece.col != newpos[0]) return false
                if (piece.piece == 'PIECE_PAWN' && (newpos[1] < piece.row && piece.src.split('_')[0] == 'w' || newpos[1] > piece.row && piece.src.split('_')[0] == 'b')) return false
                if (Math.abs(newpos[1] - piece.row) > piece.max) return false
                if (inWayvert(pieceindex, newpos, piece)) return false
                if (piece.piece == 'PIECE_PAWN') piece.max = 1
                return true
            }
            function horizontle(pieceindex, newpos, piece) {
                if (!piece.direction.includes('horizontle')) return false
                if (piece.row != newpos[1]) return false
                if (Math.abs(newpos[0] - piece.col) > piece.max) return false
                if (inWayhor(pieceindex, newpos, piece)) return false

                return true
            }
            function diagonal(pieceindex, newpos, piece) {
                if (!piece.direction.includes('diagonal')) return false
                if (inWaydiag(pieceindex, newpos, piece)) return false
                if (deathbypawn(pieceindex, newpos, piece)) return false
                if ((Math.abs(newpos[0] + newpos[1]) != Math.abs(piece.col + piece.row)) && (Math.abs(newpos[0] - newpos[1]) != Math.abs(piece.col - piece.row))) return false
                return true
            }

            function horse(pieceindex, newpos, piece) {
                if (!piece.direction.includes('L')) return false
                if (inWayHorse(pieceindex, newpos, piece)) return false
                let dis = Math.sqrt(Math.pow(newpos[1] - pieceindex[1], 2) + Math.pow(newpos[0] - pieceindex[0], 2))
                if (dis > 2.23 && dis < 3) return true
                return false
            }

            function findPiece(row, col, color) {
                let piece;
                positions[color].forEach(i => {
                    if (i.row == col && i.col == row) piece = i
                });
                if (!piece) return null
                if (piece.inplay == false) return null
                return piece
            }

            function convert(msg) {
                let obj = {
                    'a': 0,
                    'b': 1,
                    'c': 2,
                    'd': 3,
                    'e': 4,
                    'f': 5,
                    'g': 6,
                    'h': 7,
                }
                msg = msg.split('');
                msg[1] = Number(msg[1] - 1)
                let start = Object.keys(obj).indexOf(msg[0])
                msg[0] = Object.values(obj)[start]
                return msg
            }


            async function drawPieces() {

                for (let i in positions.black) {
                    if (positions.black[i].inplay == false) continue
                    let coords = await getCoords(positions.black[i].row, false)
                    let image = await loadImage(`images/sprites/chess sprites/pieces/${positions.black[i].src}.png`)
                    ctx.drawImage(image, blocksize * positions.black[i].col, coords.y * positions.black[i].row, blocksize, blocksize)
                }
                for (let i in positions.white) {
                    if (positions.white[i].inplay == false) continue
                    let coords = await getCoords(positions.white[i].row, false)
                    let image = await loadImage(`images/sprites/chess sprites/pieces/${positions.white[i].src}.png`)
                    ctx.drawImage(image, blocksize * positions.white[i].col, coords.y * positions.white[i].row, blocksize, blocksize)
                }
            }
            function getCoords(piece, col) {
                let coords = {
                    "x": piece * blocksize,
                    "y": col ? 0 : blocksize
                }
                return coords
            }

            function drawBoard() {
                let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
                let nums = [1, 2, 3, 4, 5, 6, 7, 8]
                for (let i = 0; i < 8; i++) {
                    ctx.font = `${blocksize - 5}px sans-serif`
                    ctx.fillStyle = '#F1AD00'
                    ctx.fillText(chars[i], i * blocksize + 25, canvas.height - 20)
                    ctx.fillText(nums[i], canvas.width - 75, i * blocksize + blocksize - 10)
                    drawRow(i);
                }
            }
            function drawRow(row) {
                for (let i = 0; i < 8; i++) {
                    drawBlock(row, i)
                }
            }
            function drawBlock(row, block) {
                ctx.fillStyle = getColor(row, block);
                ctx.fillRect(row * blocksize, block * blocksize, blocksize, blocksize);
                ctx.stroke()
            }
            function getColor(row, block) {
                let color;
                if (row % 2) color = block % 2 ? '#7C4C3E' : '#512A2A'
                else color = block % 2 ? '#512A2A' : '#7C4C3E'
                return color
            }
            function sendMessage() {
                const attachment = new Discord.Attachment(canvas.toBuffer(), 'chess.png');
                return attachment
            }
        });


    }
}
module.exports = chess

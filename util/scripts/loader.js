const enc = require('./encode'),
    mongoose = require('mongoose'),
    url = `mongodb://${enc.decode(require('../json/botconfig.json').mongodb)}@dustie-shard-00-00-iozun.mongodb.net:27017,dustie-shard-00-01-iozun.mongodb.net:27017,dustie-shard-00-02-iozun.mongodb.net:27017/test?ssl=true&replicaSet=Dustie-shard-0&authSource=admin&retryWrites=true`

/*
    Database
*/
mongoose.connect(url, { useNewUrlParser: true })
module.exports.mongoose = mongoose
let Guild = module.exports.Guild = require('../models/guilds/index')
let Economy = module.exports.Economy = require('../models/economy/index')
let Levels = module.exports.Levels = require('../models/levels/index')
let Warns = module.exports.Warns = require('../models/warns/index')
let User = module.exports.User = require('../models/user')

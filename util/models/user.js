let = mongoose = require('../scripts/loader').mongoose
let User = mongoose.model('user', mongoose.Schema({ users: [] }));

module.exports.createUser = function (guild) {
  guild.users = "users";
  guild.save((err, res) => { if (err) console.log(err) })
}

module.exports.find = async function (id) {
  let data = await get()
  data = data.users
  if (data.includes(id)) return true
  else return false
}

module.exports.addOrRemove = async function (id) {
  let data = await get()
  data = data.users
  let index = data.indexOf(id)
  if (data.includes(id)) {
    if (index > -1) {
      data.splice(index, 1)
    }
    let update = {}
    update["users"] = data
    User.updateOne({ _id: "5cc309192dbb91588b997428" }, {
      $set: update
    }, (err, raw) => { if (err) console.error(err) })
  }
  else {
    data.push(id)
    let update = {}
    update["users"] = data
    User.updateOne({ _id: "5cc309192dbb91588b997428" }, {
      $set: update
    }, (err, raw) => { if (err) console.error(err) })
  }
}

function get() {
  return new Promise(resolve => {
    User.findById("5cc309192dbb91588b997428", function (err, user) {
      if (err) console.log(err)
      resolve(user)
    })
  })
}

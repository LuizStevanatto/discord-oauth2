const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    discordID: {type: String, require: true},
    username: {type: String, require: true},
    email: {type: String, require: true},
    guilds: {type: Array, require: true}
})

const DiscordUser = module.exports = mongoose.model("User", UserSchema);
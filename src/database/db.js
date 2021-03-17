const mongoose = require('mongoose');
const DB_URL = process.env.DATABASE_URL

module.exports = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
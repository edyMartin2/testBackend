const mongoose = require('mongoose')
const { Schema } = mongoose;

const logSchema = new Schema({
    application_id: String,
    type: String,
    priority: String,
    path: String,
    message: String,
    request: String,
    response: String,
    createAt: Date,
    updateAt: Date
})

module.exports = mongoose.model('logs', logSchema, 'Logs');
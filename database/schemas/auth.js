const  mongoose  = require('mongoose');
const { Schema } = mongoose;


const authSchema = new Schema({
    application_id: String,
    token: String,
    createAt: Date,
    updateAt: Date
})

module.exports = mongoose.model('auth', authSchema, 'Auth');
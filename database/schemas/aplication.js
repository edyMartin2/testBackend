const  mongoose = require('mongoose');
const { Schema } = mongoose;


const aplicationSchema = new Schema({
    id: String,
    name: String,
    createAt: Date,
    updateAt: Date
})

module.exports = mongoose.model('application', aplicationSchema, 'Application');
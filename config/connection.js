var mongoose = require('mongoose');

// Set the path to the database
const connection = async () => {
    try {
        console.log("connected to mongo");
        return await mongoose.connect("mongodb://localhost:27017/eLogger", { useNewUrlParser: true, useUnifiedTopology: true });
    
    }
    catch (e) {
        return await e
    }
}

module.exports = connection;
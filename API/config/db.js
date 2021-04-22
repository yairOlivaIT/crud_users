const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path : ".env"});

const connectDB = async() => {
    await mongoose.connect( process.env.CONNECTION_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });


    console.log('db connected');
}

module.exports = connectDB;
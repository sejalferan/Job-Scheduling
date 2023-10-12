const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://roshan:qtgjxYCDhQWvGQNz@cluster0.zuacx2u.mongodb.net/jobsdb?retryWrites=true&w=majority';

// const DB_URI = 'mongodb://localhost:27017'; 
const connectDB = async() => {
    try{
     await mongoose.connect(DB_URI);
     console.log("database connected");
    } catch(error){
        console.log(`erroer whille connecting ${error.message}`);
    }
}

module.exports = connectDB;
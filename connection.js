const mongoose = require('mongoose');

const connectDb = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Database connected")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDb;
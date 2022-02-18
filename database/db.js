const mongoose = require('mongoose');

const connection = async () =>{
    try{
        const URL = process.env.DATABASE;
        await mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});
        console.log("Server is connected to Database");
    }
    catch(err){
        console.log("Error in Server", err);
    }
}

module.exports = connection;
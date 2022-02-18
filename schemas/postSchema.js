const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:false
    },
    categories:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createDate:{
        type:Date
    }
});

const postModal = mongoose.model('post',postSchema);

module.exports = postModal;
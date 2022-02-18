const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedback:{
        type:String,
        required:false
    }
});

const feedbackModal = mongoose.model('feedback',feedbackSchema);

module.exports = feedbackModal;
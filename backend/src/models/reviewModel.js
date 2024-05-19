const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true
    },
    content : {
        type : String,
        trim : true
    },
    date:{
        type : Number
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

module.exports = mongoose.model('Review',reviewSchema)
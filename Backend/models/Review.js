const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    user_id: {
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book_id: {
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    text: {
        type: String,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes: [{
        default:[],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        default:[],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
});

module.exports = mongoose.model("Review", reviewSchema);

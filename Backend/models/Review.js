const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    user_id: String,
    book_id: String,
    text: String,
    date: Date,
    likes: Array,
    dislikes: Array,
    comments: Array
});

module.exports = mongoose.model("Review", bookSchema);

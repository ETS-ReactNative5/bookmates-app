const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  isbn: {
    type: Number,
    max: 13,
    max: 13,
  },
  cover_URL: String,
  description: String,
  author_id: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  genre_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  },
});

module.exports = mongoose.model("Book", bookSchema);

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
    min: 13,
    max: 13,
  },
  cover_URL: String,
  description: String,
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
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

const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
});

module.exports = mongoose.model("Author", authorSchema);

const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  last_name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  biography: String,
  books: Array,
  birth_date: Date,
  death_date: Date,
});

module.exports = mongoose.model("Author", bookSchema);

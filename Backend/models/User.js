const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  profile_bio: {
    type: String,
    default: "",
  },
  profile_image_URL: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  finished_books: Array,
  currently_reading_books: Array,
  to_read_books: Array,

  genres_preferences: Array,
  reviews: Array,
  birth_date: Date,
});

module.exports = mongoose.model("User", userSchema);

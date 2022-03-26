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

  finished_books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  currently_reading_books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  to_read_books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],

  genres_preferences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  reviews: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
  }],
  birth_date: Date,
});

module.exports = mongoose.model("User", userSchema);

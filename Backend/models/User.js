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
  profile_image_URL: {
    type: String,
    default: "https://holyspiritchurch.us/wp-content/uploads/avatar-1577909_1280.png"
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  notifications: [{
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    action: {
      type: String
    }
  }],
  finishedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  currentlyReadingBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  toReadBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],

  genresPreferences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  reviews: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
  }],
  latitude:{
    type: Number,
    // required: true
  },
  longitude:{
    type: Number,
    // required: true
  }
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 20,
  },
});

module.exports = mongoose.model("Genre", userSchema);

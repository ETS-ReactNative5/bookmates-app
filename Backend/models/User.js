const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    profile_bio:{
        type: String
    }
    // birth_date: {
    //     type: Date,
    //     // default: Date.now
    //     required: true,
    //     trim: true,
    // }
});

module.exports = mongoose.model('User', userSchema);
const User = require("../models/User");
const Review = require("../models/Review");
const Book = require("../models/Book");

const addReview = async (req, res) => {
    res.status(200).send ('working');
};

module.exports.addReview = addReview;
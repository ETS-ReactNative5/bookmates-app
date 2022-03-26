const User = require("../models/User");
const Review = require("../models/Review");
const Book = require("../models/Book");

const addReview = async (req, res) => {
  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    const user = await User.findByIdAndUpdate(
      req.body.user_id,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );
    res
      .status(200)
      .send({
        message: "Review posted successfully",
        user: user,
        review: savedReview,
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.addReview = addReview;

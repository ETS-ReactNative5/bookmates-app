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

const editReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        //Verify that the review belongs to the user then update
        if (review.user_id.equals(req.body.user_id)){
          await review.updateOne({ $set: {text: req.body.text}});
          const edited_review = await Review.findById(req.params.id);
          res.status(200).send({message:"Review successfully edited!", review: edited_review});
        } else {
          res.status(403).send("You are not allowed to edit others' reviews.");
        }
    } catch (err) {
        res.status(500).send(err);
    }
};  

const deleteReview =  async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      const user = await User.findById(review.user_id);
      if (review.user_id.equals(req.body.user_id)) {
        await review.deleteOne();
        await user.updateOne({ $pull: { reviews: req.params.id } });
        res.status(200).send("Review successfully deleted!");
      } else {
        res.status(403).send("You are not allowed to delete others' reviews.");
      }
    } catch (err) {
      res.status(500).send(err);
    }
};

const likeReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review.likes.includes(req.body.user_id)) {
          await review.updateOne({ $push: { likes: req.body.user_id } });
          const liked_review = await Review.findById(req.params.id);
          res.status(200).send({message:"Review liked successfully!", review:liked_review});
        } else {
          await review.updateOne({ $pull: { likes: req.body.user_id } });
          const liked_review = await Review.findById(req.params.id);
          res.status(200).send({message:"Like removed", review:liked_review});
        }
      } catch (err) {
        res.status(500).send(err);
      }
}

const dislikeReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review.dislikes.includes(req.body.user_id)) {
          await review.updateOne({ $push: { dislikes: req.body.user_id } });
          const disliked_review = await Review.findById(req.params.id);
          res.status(200).send({message:"Review disliked successfully!", review:disliked_review});
        } else {
          await review.updateOne({ $pull: { dislikes: req.body.user_id } });
          const disliked_review = await Review.findById(req.params.id);
          res.status(200).send({message:"Dislike removed", review:disliked_review});
        }
      } catch (err) {
        res.status(500).send(err);
      }
}

const getUserReviews = async (req, res) => {

    try{
        const reviews = await Review.find({user_id: req.body.user_id});
        if (reviews.length) {
            return res.status(200).send(reviews);
        }else {
            return res.status(400).send("No reviews");
        }   
    } catch (error) {
        return res.status(500).send(err)   
    }
}

module.exports.addReview = addReview;
module.exports.editReview = editReview;
module.exports.deleteReview = deleteReview;
module.exports.likeReview = likeReview;
module.exports.dislikeReview = dislikeReview;
module.exports.getUserReviews = getUserReviews;

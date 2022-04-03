const User = require("../models/User");
const Review = require("../models/Review");
const Book = require("../models/Book");

const addReview = async (req, res) => {
  const {book_id, text} = req.body;
  if (!book_id || !text){
    return res.status(422).send("Error: missing fields.")
  }

  const newReview = new Review({text, book_id, user_id: req.user})
    try {
      const savedReview = await newReview.save();
      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { reviews: savedReview._id } },
        { new: true }
      );
      await Book.findByIdAndUpdate(
        book_id, {$push: {reviews: savedReview._id}}
      )
      res.status(200).send({message: "Review posted successfully"});
    } catch (err) {
      return res.status(500).send(err);
    }
};

const editReview = async (req, res) => {
    try {
      const review = await Review.findById(req.body.review_id);
      //Verify that the review belongs to the user then update
      if (review.user_id.equals(req.user._id)){
        await review.updateOne({ $set: {text: req.body.text}});
        const edited_review = await Review.findById(req.body.review_id);
        res.status(200).send({message:"Review successfully edited!", review: edited_review});
      } else {
        res.status(403).send("You are not allowed to edit others' reviews.");
      }
    }catch (err) {
      res.status(500).send(err);
    }
};  

const deleteReview =  async (req, res) => {
    try {
          const review = await Review.findById(req.body.review_id);
          const book = await Book.findById(review.book_id)
          const user = await User.findById(review.user_id);
          if (user._id.equals(req.user._id)) {
            await review.deleteOne();
            await user.updateOne({ $pull: { reviews: req.body.review_id } });
            await book.updateOne({ $pull: { reviews: req.body.review_id } });            
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
      const review = await Review.findById(req.body.review_id);
      if (!review.likes.includes(req.user._id)) {
        await review.updateOne({ $push: { likes: req.user._id } });
        const liked_review = await Review.findById(req.body.review_id);
        res.status(200).send({message:"Review liked successfully!", review:liked_review});
      } else {
        await review.updateOne({ $pull: { likes: req.user._id } });
        const liked_review = await Review.findById(req.body.review_id);
        res.status(200).send({message:"Like removed", review:liked_review});
      }
  }catch (err) {
  res.status(500).send(err);
  }
}

const dislikeReview = async (req, res) => {
  
  try {
      const review = await Review.findById(req.body.review_id);
      if (!review.dislikes.includes(req.user._id)) {
        await review.updateOne({ $push: { dislikes: req.user._id } });
        const disliked_review = await Review.findById(req.body.review_id);
        res.status(200).send({message:"Review disliked successfully!", review:disliked_review});
      } else {
        await review.updateOne({ $pull: { dislikes: req.user._id } });
        const disliked_review = await Review.findById(req.body.review_id);
        res.status(200).send({message:"Dislike removed", review:disliked_review});
      }
  }catch (err) {
  res.status(500).send(err);
  }
}

const comment = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  }

  await Review.findByIdAndUpdate(req.body.review_id, {$push: {comments: comment}}, {new:true}).populate("comments.postedBy", "_id first_name last_name")
  .exec((err, result) => {
    if(err){
      return res.status(400).send(err);
    }else{
      return res.status(200).send({Message:"Commented successfully.", result});
    }
  })
}

const getMyReviews = async (req, res) => {
  try{
    const reviews = await Review.find({ user_id: req.user._id }).sort('-date').populate({
      path: "book_id", 
      populate: [
        {
          path: "author_id",
          model: "Author",
        },
        {
          path: "reviews",
          model: "Review",
        },
      ],
    }).populate('user_id');

    if (reviews.length) {
      return res.status(200).send(reviews);
    }else {
      return res.status(400).send("No reviews");
    }   
  }catch (err) {
    return res.status(500).send(err)   
  }
}

const getBookmateReviews = async (req, res) => {
  try{
    const reviews = await Review.find({ user_id: req.params.id }).sort('-date').populate({
      path: "book_id", 
      populate: [
        {
          path: "author_id",
          model: "Author",
        },
        {
          path: "reviews",
          model: "Review",
        },
      ],
    }).populate('user_id');

    if (reviews.length) {
      return res.status(200).send(reviews);
    }else {
      return res.status(400).json("No reviews");
    }   
  }catch (err) {
    return res.status(500).send(err)   
  }
}

const getFeedReviews = async (req, res) => {
  try {
      const currentUser = await User.findById(req.user._id);
      const userReviews = await Review.find({ user_id: req.user._id }).sort('-date').populate({
        path: "book_id", 
        populate: [
          {
            path: "author_id",
            model: "Author",
          },
        ],
      }).populate('user_id');
      const bookmatesReviews = await Promise.all(
        currentUser.following.map((bookmateId) => {
          return Review.find({ user_id: bookmateId }).sort('-date').populate({
            path: "book_id", 
            populate: [
              {
                path: "author_id",
                model: "Author",
              },
              {
                path: "reviews",
                model: "Review",
              },
            ],
          }).populate('user_id');
        })
      );
      
      res.status(200).send(userReviews.concat(...bookmatesReviews))
  } catch (err) {
      res.status(500).json(err);
  }
};

const getBookReviews = async (req, res) => {
  try {
      const book = await Book.findById(req.body.book_id)
      const populatedReviews = await Promise.all(book.reviews.map((reviewId) => {
         return Review.findById(reviewId).sort('-date').populate("user_id").select(['-password'])
      }))
      res.status(200).send(populatedReviews)      
  } catch (err) {
      res.status(500).json(err);
  }
};

module.exports.addReview = addReview;
module.exports.editReview = editReview;
module.exports.deleteReview = deleteReview;
module.exports.likeReview = likeReview;
module.exports.dislikeReview = dislikeReview;
module.exports.comment = comment;
module.exports.getMyReviews = getMyReviews;
module.exports.getFeedReviews = getFeedReviews;
module.exports.getBookmateReviews = getBookmateReviews;
module.exports.getBookReviews = getBookReviews;

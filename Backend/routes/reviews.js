const router = require ('express').Router();
const { addReview, editReview, deleteReview, likeReview, dislikeReview, getUserReviews, getFeedReviews, comment} = require('../controllers/reviews');
const requireLogin = require('../middleware/requireLogin')

//requireLogin will make sure that the user posting reviews is authorized (Protected route)
router.post('/add', requireLogin, addReview);
router.put('/edit/:id', requireLogin, editReview);
router.delete('/delete/:id', requireLogin, deleteReview);
router.put('/like/:id', requireLogin, likeReview);
router.put('/dislike/:id', requireLogin, dislikeReview);
router.put('/comment/:id', requireLogin, comment);
router.get('/getuserreviews', requireLogin, getUserReviews);
router.get('/getfeedreviews', requireLogin, getFeedReviews);

module.exports = router;
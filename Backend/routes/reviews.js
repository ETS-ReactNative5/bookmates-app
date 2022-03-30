const router = require ('express').Router();
const { addReview, editReview, deleteReview, likeReview, dislikeReview, getMyReviews, getFeedReviews, comment} = require('../controllers/reviews');
const requireLogin = require('../middlewares/requireLogin')

//requireLogin will make sure that the user posting reviews is authorized (Protected route)
router.post('/add', requireLogin, addReview);
router.put('/edit', requireLogin, editReview);
router.delete('/delete', requireLogin, deleteReview);
router.put('/like', requireLogin, likeReview);
router.put('/dislike', requireLogin, dislikeReview);
router.put('/comment', requireLogin, comment);
router.get('/myreviews', requireLogin, getMyReviews);
router.get('/getfeedreviews', requireLogin, getFeedReviews);

module.exports = router;
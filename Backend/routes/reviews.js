const router = require ('express').Router();
const { addReview } = require('../controllers/reviews');
const verify = require ('./verifyToken');

//verify will make sure that the user posting reviews is authorized (Protected route)
router.post('/add', addReview);

module.exports = router;
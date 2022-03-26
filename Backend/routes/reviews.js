const router = require ('express').Router();
const { addReview, editReview, deleteReview} = require('../controllers/reviews');
const verify = require ('./verifyToken');

//verify will make sure that the user posting reviews is authorized (Protected route)
router.post('/add', addReview);
router.put('/edit/:id', editReview);
router.delete('/delete/:id', deleteReview);

module.exports = router;
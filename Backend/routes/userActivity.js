const router = require ('express').Router();
const {follow, unfollow, editProfile, addReview} = require('../controllers/userActivity');


router.put('/follow/:id', follow);
router.put('/unfollow/:id', unfollow);

router.put('/editProfile/:id', editProfile);

router.post('/addReview', addReview);

module.exports = router;
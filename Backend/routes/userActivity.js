const router = require ('express').Router();
const {follow, unfollow, editProfile} = require('../controllers/userActivity');


router.put('/follow/:id', follow);
router.put('/unfollow/:id', unfollow);

router.put('/editProfile/:id', editProfile);

module.exports = router;
const router = require ('express').Router();
const {follow, unfollow, editProfile, getAllUsers} = require('../controllers/userActivity');
const requireLogin = require('../middlewares/requireLogin');

router.put('/follow', requireLogin, follow);
router.put('/unfollow', requireLogin, unfollow);

router.put('/editprofile', requireLogin, editProfile);
router.get('/all', requireLogin, getAllUsers);

module.exports = router;
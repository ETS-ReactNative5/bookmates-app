const router = require ('express').Router();
const {follow, unfollow, editProfile, getAllUsers, getProfile, getUserProfile, getNotifications} = require('../controllers/userActivity');
const requireLogin = require('../middlewares/requireLogin');

router.put('/follow', requireLogin, follow);
router.put('/unfollow', requireLogin, unfollow);
router.put('/editprofile', requireLogin, editProfile);
router.get('/getprofile', requireLogin, getProfile);
router.get('/userprofile/:id', requireLogin, getUserProfile);
router.get('/all', requireLogin, getAllUsers);
router.get('/notifications', requireLogin, getNotifications)

module.exports = router;
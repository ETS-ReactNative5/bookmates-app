const router = require ('express').Router();
const {follow, unfollow, editProfile, getAllUsers} = require('../controllers/userActivity');
const requireLogin = require('../middleware/requireLogin');

router.put('/follow/:id', requireLogin, follow);
router.put('/unfollow/:id', requireLogin, unfollow);

router.put('/editProfile/:id', requireLogin, editProfile);
router.get('/all', requireLogin, getAllUsers);

module.exports = router;
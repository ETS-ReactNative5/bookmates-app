const router = require ('express').Router();
const {follow, unfollow, editProfile, getAllUsers} = require('../controllers/userActivity');


router.put('/follow/:id', follow);
router.put('/unfollow/:id', unfollow);

router.put('/editProfile/:id', editProfile);
router.get('/all', getAllUsers);

module.exports = router;
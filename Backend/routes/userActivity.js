const router = require ('express').Router();
const {follow, unfollow} = require('../controllers/userActivity');


router.put('/follow', follow);
router.put('/unfollow', unfollow);

module.exports = router;
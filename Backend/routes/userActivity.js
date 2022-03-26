const router = require ('express').Router();
const {follow, unfollow} = require('../controllers/userActivity');
const verifyToken = require('./verifyToken');


router.put('/follow/:id', verifyToken ,follow);
router.put('/unfollow/:id', unfollow);

module.exports = router;
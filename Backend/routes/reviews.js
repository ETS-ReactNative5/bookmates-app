const router = require ('express').Router();
const verify = require ('./verifyToken');

//verify will make sure that the user accessing reviews is authorized (Protected route)
router.get('/', verify, (req, res) => {
    res.json({posts: {title: 'my first review', content:'protected route example'}})
})

module.exports = router;
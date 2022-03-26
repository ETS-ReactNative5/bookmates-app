const router = require ('express').Router();
const {search} = require ('./../controllers/books');


router.get('/search/:keyword', search);


module.exports = router;
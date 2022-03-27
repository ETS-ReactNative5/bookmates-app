const router = require ('express').Router();
const {search, saveBook} = require ('./../controllers/books');


router.get('/search/:keyword', search);

router.post('/saveBook', saveBook);


module.exports = router;
const router = require ('express').Router();
const {search, saveBook, addCurrently} = require ('./../controllers/books');


router.get('/search/:keyword', search);
router.post('/saveBook', saveBook);
router.put('/addCurrently', addCurrently);


module.exports = router;
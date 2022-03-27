const router = require ('express').Router();
const {search, saveBook, addCurrently, addFinished, addToRead, displayBookshelf} = require ('./../controllers/books');


router.get('/search/:keyword', search);
router.post('/saveBook', saveBook);
router.put('/addCurrently', addCurrently);
router.put('/addFinished', addFinished);
router.put('/addToRead', addToRead);
router.get('/displayBookshelf', displayBookshelf);


module.exports = router;
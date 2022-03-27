const router = require ('express').Router();
const {search, saveBook, addCurrently, addFinished, addToRead, displayBookshelf} = require ('./../controllers/books');
const requireLogin = require('../middleware/requireLogin')

router.get('/search/:keyword', requireLogin, search);
router.post('/saveBook', requireLogin, saveBook);
router.put('/addCurrently', requireLogin, addCurrently);
router.put('/addFinished', requireLogin, addFinished);
router.put('/addToRead', requireLogin, addToRead);
router.get('/displayBookshelf', requireLogin, displayBookshelf);


module.exports = router;
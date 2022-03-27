const router = require ('express').Router();
const {search, saveBook, addCurrently, addFinished, addToRead, displayBookmatesBookshelf} = require ('./../controllers/books');
const requireLogin = require('../middlewares/requireLogin')

router.get('/search/:keyword', requireLogin, search);
router.post('/savebook', requireLogin, saveBook);
router.put('/addcurrently', requireLogin, addCurrently);
router.put('/addfinished', requireLogin, addFinished);
router.put('/addtoread', requireLogin, addToRead);
router.get('/displayBookmatesBookshelf', requireLogin, displayBookmatesBookshelf);


module.exports = router;
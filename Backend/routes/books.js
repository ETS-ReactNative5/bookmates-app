const router = require ('express').Router();
const {search, saveBook, addCurrently, addFinished} = require ('./../controllers/books');


router.get('/search/:keyword', search);
router.post('/saveBook', saveBook);
router.put('/addCurrently', addCurrently);
router.put('/addFinished', addFinished);


module.exports = router;
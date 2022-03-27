const router = require ('express').Router();
const {registerValidation, loginValidation} = require('../controllers/auth');


router.post('/register', registerValidation);
router.post('/login', loginValidation);


module.exports = router;
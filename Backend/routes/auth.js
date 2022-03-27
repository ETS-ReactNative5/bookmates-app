const router = require ('express').Router();
const {registerValidation, loginValidation} = require('../controllers/validation');


router.post('/register', registerValidation);
router.post('/login', loginValidation);


module.exports = router;
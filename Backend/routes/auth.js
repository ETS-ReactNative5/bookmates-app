const router = require ('express').Router();
const {registerValidation, loginValidation} = require('../controllers/validation');

//Register
router.post('/register', registerValidation);

//Login
router.post('/login', loginValidation);

module.exports = router;
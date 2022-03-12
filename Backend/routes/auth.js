const router = require ('express').Router();
const User = require ('../models/User');
const {registerValidation, loginValidation} = require('../controllers/validation');


router.post('/register', async (req, res) => {

    //Validate request data based on schema
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already registered
    const emailMatch = await User.findOne({email: req.body.email});
    if(emailMatch) return res.status(400).send('Email already exists');


    //If data is validated, save user in db
    const user = new User ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;
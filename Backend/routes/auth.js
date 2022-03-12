require('dotenv').config();
const router = require ('express').Router();
const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const {registerValidation, loginValidation} = require('../controllers/validation');

//Register
router.post('/register', async (req, res) => {

    //Validate request data based on schema
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already registered
    const emailMatch = await User.findOne({email: req.body.email});
    if(emailMatch) return res.status(400).send('Email already exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //If data is validated, save user in db
    const user = new User ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    //Validate request data based on schema
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already registered
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');
    
    //Check if password is correct
    const valid_password = await bcrypt.compare (req.body.password, user.password);
    if(!valid_password) return res.status(401).send('Incorrect password');
    
    //Create a JWT token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);
    res.header('auth_token', token).send(token);

});

module.exports = router;
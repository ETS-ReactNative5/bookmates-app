const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
//Validation using JOI
const Joi = require('joi');

//Registration Validation
const registerValidation = async (req, res) => {

    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        last_name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({minDomainSegments: 2}),
        password: Joi.string()
            .min(6),
    });

    //Validate request data based on schema
    const {error} = schema.validate(req.body);
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
};

//Login Validation
const loginValidation = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments: 2}),
        password: Joi.string()
            .min(6),
    });

    //Validate request data based on schema
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send("Error. Please try again.");
    
    //Check if user is already registered
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');
    
    //Check if password is correct
    const valid_password = await bcrypt.compare (req.body.password, user.password);
    if(!valid_password) return res.status(401).send('Incorrect password');

    //Create a JWT token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);

    //Return token and user info
    const current_user = await User.findById(user._id);
    res.header('access_token', token).status(200).send({token: token, user: current_user});
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
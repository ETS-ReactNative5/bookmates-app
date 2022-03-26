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
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments: 2}),
        password: Joi.string()
            .min(6),
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


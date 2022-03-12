const router = require ('express').Router();
const User = require ('../models/User');

//Validation using JOI
const Joi = require('joi');

//Validation schema rules
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
    profile_bio: Joi.string()
});

router.post('/register', async (req, res) => {

    //Validate request data based on schema
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        profile_bio: req.body.profile_bio,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;
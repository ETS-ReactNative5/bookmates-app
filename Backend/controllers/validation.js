//Validation using JOI
const Joi = require('joi');

//Registration Validation
const registerValidation = data => {
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

    return schema.validate(data);
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


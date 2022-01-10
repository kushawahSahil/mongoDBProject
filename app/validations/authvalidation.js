const Joi = require("@hapi/joi");

function registrationValidate(req) {
    const schema = Joi.object({
        fname: Joi.string().empty().required().messages({
            "string.base": `first name should be a type of 'string'`,
            "string.empty": `first can not an empty field`,
            "any.required": `first name is a required field`,
        }),
        lName: Joi.string().empty().required().messages({
            "string.base": `second name should be a type of 'string'`,
            "string.empty": `second can not an empty field`,
            "any.required": `second name is a required field`,
        }),
        gender: Joi.string().empty().required().messages({
            "string.base": `gender should be a type of 'string'`,
            "string.empty": `gender can not an empty field`,
            "any.required": `gender is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "string.base": `hobby should be choose`,
            "string.empty": `hobby can not an empty field`,
            "any.required": `hobby is a required field`,
        }),
        mobile: Joi.number().empty().required().messages({
            "number.base": `mobile should be a type of 'number'`,
            "number.empty": `mobile can not an empty field`,
            "any.required": `mobile is a required field`,
        }),
        email: Joi.string().empty().required().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "any.required": `email is a required field`,
        }),
        Password: Joi.string().empty().required().messages({
            "string.base": `Password should be a type of 'string'`,
            "string.empty": `Password can not an empty field`,
            "any.required": `Password is a required field`,
        }),
        Pswd: Joi.string().empty().required().valid(Joi.ref('Password')).messages({
            "string.base": `pswd should be a type of 'string'`,
            "string.empty": `pswd can not an empty field`,
            "any.required": `pswd is a required field`,
        }),
        city: Joi.string().empty().required().messages({
            "string.base": `city should be a type of 'string'`,
            "string.empty": `city can not an empty field`,
            "any.required": `city is a required field`,
        }),
    })
    return schema.validate(req);
}

function pswdValidate(req) {
    const schema = Joi.object({
        email: Joi.string().empty().required().email().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        })
    })
    const options = {
        abortEarly: false,
    };
    return schema.validate(req, options);
}

function newPswdValidate(req) {
    const schema = Joi.object({
        email: Joi.string().empty().email().required().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email can not an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email name is a required field`,
        }),
        Password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `Password should be a type of'text'`,
            "string.empty": `Password connot be an empty field`,
            "string.min": `Password should be of minimum 6 character`,
            "string.max": `Password should be of maximum 16 character`,
            "any.required": `Password is a require field`,
        }),
        Confirm_Password: Joi.string().required().valid(Joi.ref('Password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
    const options = {
        abortEarly: false
    };
    return schema.validate(req, options);
}

function loginValidate(req) {
    const schema = Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),
        Password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        })
    })
    const options = {
        abortEarly: false,
    }
    return schema.validate(req, options);
}

function resetValidate(req) {
    const schema = Joi.object({
        Pswd: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        Password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        Confirm_Password: Joi.string().required().valid(Joi.ref('Password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
    const options = {
        abortEarly: false, // include all errors
    };
    return schema.validate(req, options);
}

function updateProfileValidate(req) {
    const schema = Joi.object({
        fname: Joi.string().empty().required().messages({
            "string.base": `first name should be a type of 'string'`,
            "string.empty": `first can not an empty field`,
            "any.required": `first name is a required field`,
        }),
        lName: Joi.string().empty().required().messages({
            "string.base": `second name should be a type of 'string'`,
            "string.empty": `second can not an empty field`,
            "any.required": `second name is a required field`,
        }),
        gender: Joi.string().empty().required().messages({
            "string.base": `gender should be a type of 'string'`,
            "string.empty": `gender can not an empty field`,
            "any.required": `gender is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "string.base": `hobby should be choose`,
            "string.empty": `hobby can not an empty field`,
            "any.required": `hobby is a required field`,
        }),
        mobile: Joi.number().empty().required().messages({
            "number.base": `mobile should be a type of 'number'`,
            "number.empty": `mobile can not an empty field`,
            "any.required": `mobile is a required field`,
        }),
        email: Joi.string().empty().required().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "any.required": `email is a required field`,
        }),
        city: Joi.string().empty().required().messages({
            "string.base": `city should be a type of 'string'`,
            "string.empty": `city can not an empty field`,
            "any.required": `city is a required field`,
        }),
    })
    return schema.validate(req);
}

module.exports = { registrationValidate, pswdValidate, newPswdValidate, loginValidate, resetValidate, updateProfileValidate };
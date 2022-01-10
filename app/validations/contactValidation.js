const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate);

function contactValidation(req) {
    const schema = Joi.object({
        contactName: Joi.string().empty().required().messages({
            "string.base": `contactName should be a type of 'string'`,
            "string.empty": `contact can not an empty field`,
            "any.required": `contact name is a required field`,
        }),
        email: Joi.string().empty().email().required().messages({
            "string.base": `email should be a type of 'string'`,
            "string.empty": `email can not an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        contactNumber: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
            "number.empty": `contactNumber can not an empty field`,
            "number.min": `Contact number must be 10 digit`,
            "number.max": "Contact number can't be greater than 10 digit",
            "any.required": `contactNumber is a required field`,
        }),
        messages: Joi.string().required().empty().messages({
            "string.base": ` messages should be choose`,
            "string.empty": ` messages can not an empty field`,
            "any.required": ` messages is a required field`,
        }),


        date: Joi.date().required().messages({
            "any.required": `date is a required field`,
        }),
    })
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}


module.exports = { contactValidation }



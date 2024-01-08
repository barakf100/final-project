import Joi from "joi";
import validation from "./validation";

const profileSchema = Joi.object({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
    phone: Joi.string()
        .min(9)
        .max(11)
        .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
        .message({ "string.pattern.base": "phone needs to be valid israeli phone number" })
        .required(),
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).max(256).required(),
    zip: Joi.number().min(2).max(256).allow(""),
});

const validateProfile = (inputToCheck) => validation(profileSchema, inputToCheck);

export { validateProfile };

import Joi from "joi";
import { passRegex, phoneRegex } from "./regex";
import validation from "./validation";
const profileValid = Joi.object({
    nameA: Joi.object({
        first: Joi.string().min(2).max(20).required(),
        middle: Joi.string().min(2).max(20).allow(""),
        last: Joi.string().min(2).max(20).required(),
    }).required(),
    nameB: Joi.object({
        first: Joi.string().min(2).max(20).required(),
        middle: Joi.string().min(2).max(20).allow(""),
        last: Joi.string().min(2).max(20).required(),
    }),
    address: Joi.object({
        state: Joi.string().min(2).max(50).allow(""),
        country: Joi.string().min(2).max(50).required(),
        city: Joi.string().min(2).max(50).required(),
        street: Joi.string().min(2).max(100).required(),
        houseNumber: Joi.number().min(0).max(50000).required(),
        Zip: Joi.string().min(1).max(30),
    }),
    image: Joi.object({
        alt: Joi.string().min(4).max(200).required(),
        src: Joi.string().min(12).max(200).required(),
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5),
    password: Joi.string().min(7).max(20).pattern(passRegex).messages({
        "string.pattern.base": "pass rules",
        "string.empty": "pass empty",
    }),
    phone: Joi.string()
        .pattern(phoneRegex)
        .messages({
            "string.pattern.base": "phone rules",
            "string.empty": "phone empty",
        })
        .required(),
    isMarrying: Joi.boolean().required(),
    isCaller: Joi.boolean().required(),
    marryDate: Joi.date().greater("now"),
});
const validProfile = (inputToCheck) => validation(profileValid, inputToCheck);
export default validProfile;

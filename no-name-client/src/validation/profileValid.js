import Joi from "joi";
import { passRegex, phoneRegex } from "./regex";
import validation from "./validation";
const profileValid = Joi.object({
    nameA: Joi.object({
        first: Joi.string().min(2).max(20).required().messages({
            "string.empty": "first name empty",
            "string.min": "first name is too short",
            "string.max": "first name is too long})",
        }),
        middle: Joi.string().min(2).max(20).allow(""),
        last: Joi.string()
            .min(2)
            .max(20)
            .required()
            .messages({ "string.empty": "last name empty", "string.min": "last name is too short", "string.max": "last name is too long" }),
    }).required(),
    nameB: Joi.object({
        first: Joi.string().min(2).max(20).required().messages({
            "string.empty": "first name empty",
            "string.min": "first name is too short",
            "string.max": "first name is too long",
        }),
        middle: Joi.string().min(2).max(20).allow(""),
        last: Joi.string()
            .min(2)
            .max(20)
            .required()
            .messages({ "string.empty": "last name empty", "string.min": "last name is too short", "string.max": "last name is too long" }),
    }),
    address: Joi.object({
        state: Joi.string().min(2).max(50).allow("").messages({ "string.min": "state is too short", "string.max": "state is too long" }),
        country: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({ "string.empty": "country is empty", "string.min": "country is too short", "string.max": "country is too long" }),
        city: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({ "string.empty": "city is empty", "string.min": "city is too short", "string.max": "city is too long" }),
        street: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({ "string.empty": "street is empty", "string.min": "street is too short", "string.max": "street is too long" }),
        houseNumber: Joi.number().min(0).max(50000).required().messages({
            "number.base": "house number must be a number",
            "number.empty": "house number is empty",
            "number.min": "house number is too small",
            "number.max": "house number is too large",
        }),
        Zip: Joi.string()
            .min(1)
            .max(30)
            .messages({ "string.empty": "zip is empty", "string.min": "zip is too short", "string.max": "zip is too long" }),
    }),
    image: Joi.object({
        alt: Joi.string().min(4).max(200).required(),
        src: Joi.string()
            .min(12)
            .max(200)
            .required()
            .messages({ "string.empty": "src is empty", "string.min": "src is too short", "string.max": "src is too long" }),
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .messages({ "string.email": "email is not valid", "string.empty": "email is empty", "string.min": "email is too short" }),
    password: Joi.string().min(7).max(20).pattern(passRegex).messages({
        "string.pattern.base": "password rules are incorrect",
        "string.empty": "password is empty",
        "string.min": "password is too short",
        "string.max": "password is too long",
    }),
    phone: Joi.string()
        .pattern(phoneRegex)
        .messages({
            "string.pattern.base": "phone rules are incorrect",
            "string.empty": "phone is empty",
        })
        .required(),
    isMarrying: Joi.boolean().required(),
    isCaller: Joi.boolean().required(),
    marryDate: Joi.date().greater("now").messages({ "date.greater": "marry date is in the past :)" }),
});
const validProfile = (inputToCheck) => validation(profileValid, inputToCheck);
export default validProfile;

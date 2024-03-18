import Joi from "joi";
import { passRegex, phoneRegex } from "./regex";
import validation from "./validation";
import dayjs from "dayjs";
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
    }).required(),
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
        Zip: Joi.number()
            .min(1000)
            .max(9999999)
            .messages({ "number.empty": "zip is empty", "number.min": "zip is too short", "number.max": "zip is too long" }),
    }),
    image: Joi.object({
        alt: Joi.string().min(4).max(200).allow(""),
        src: Joi.string()
            .min(12)
            .max(200)
            .allow("")
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

    marryDate: Joi.string()
        .custom((value, helpers) => {
            const format = "DD/MM/YYYY";
            if (!dayjs(value, format).isValid()) {
                return helpers.error("any.invalid");
            }
            if (dayjs(value, format).isBefore(dayjs())) {
                return helpers.error("date.past");
            }
            return value;
        }, "Date validation")
        .messages({
            "any.invalid": "Please use DD/MM/YYYY",
            "date.past": "marry date is in the past :)",
            "string.empty": "marry date is empty",
        }),
});
const validProfile = (inputToCheck) => validation(profileValid, inputToCheck);
export default validProfile;

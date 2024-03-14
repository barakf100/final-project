import Joi from "joi";
import { phoneRegex } from "./regex";
import validation from "./validation";

const inviteValidation = Joi.object({
    _id: Joi.string(),
    name: Joi.object({
        _id: Joi.string(),
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
    group: Joi.string()
        .min(2)
        .max(20)
        .required()
        .messages({ "string.empty": "group is empty", "string.min": "group is too short", "string.max": "group is too long" }),
    phone: Joi.string()
        .pattern(phoneRegex)
        .messages({
            "string.pattern.base": "phone rules are incorrect",
            "string.empty": "phone is empty",
        })
        .required(),
    isAccepted: Joi.boolean(),
    isPending: Joi.boolean(),
    isDeclined: Joi.boolean(),
}).required();

const inviteValid = (inputToCheck) => validation(inviteValidation, inputToCheck);
export default inviteValid;

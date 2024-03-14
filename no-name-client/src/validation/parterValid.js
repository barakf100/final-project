import Joi from "joi";
import validation from "./validation";

const partnerValid = Joi.object({
    name: Joi.object({
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
});
const validatePartner = (input) => validation(partnerValid, input);
export default validatePartner;

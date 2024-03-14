import Joi from "joi";
import validation from "./validation";

const tdlValid = Joi.object({
    name: Joi.string().min(2).max(15).required().messages({
        "string.empty": "name is empty",
        "string.min": "name is too short",
        "string.max": "name is too long)",
    }),
    description: Joi.string().min(2).max(50).required().messages({
        "string.empty": "description empty",
        "string.min": "description is too short",
        "string.max": "description is too long",
    }),
    isCompleted: Joi.boolean().required(),
}).required();
const validateTDL = (input) => validation(tdlValid, input);
export default validateTDL;

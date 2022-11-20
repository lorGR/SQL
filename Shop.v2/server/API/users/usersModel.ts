import Joi from "joi";

export const UserJoi = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    identifierNumber: Joi.number().min(9).max(9).integer().required(),
    phoneNumber: Joi.number().min(10).max(10).integer().required(),
    email: Joi.string().email().required(),
    confirmEmail: Joi.ref('email'),
    city: Joi.string().not(Number).required(),
    streetAddress: Joi.string().required(),
    houseNumber: Joi.number().integer().required(),
    postalCode: Joi.number().integer().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
});
import Joi from "joi";

export const UserJoi = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    identifierNumber: Joi.number().integer().required(),
    phoneNumber: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    confirmEmail: Joi.ref('email'),
    city: Joi.string().not(Number).required(),
    streetAddress: Joi.string().required(),
    houseNumber: Joi.number().integer().required(),
    postalCode: Joi.number().integer().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
});
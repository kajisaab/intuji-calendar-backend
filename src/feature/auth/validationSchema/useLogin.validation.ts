import Joi from 'joi';

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Login Id is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

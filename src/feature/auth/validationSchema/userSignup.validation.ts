import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
};

export const userSignupSchema = Joi.object({
  firstName: Joi.string().required().messages({ 'string.empty': 'First Name is required' }),
  lastName: Joi.string().required().messages({ 'string.empty': 'last Name is required' }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required'
  }),
  password: passwordComplexity(complexityOptions),
  userName: Joi.string().required().messages({ 'string.empty': 'User Name is required' })
});

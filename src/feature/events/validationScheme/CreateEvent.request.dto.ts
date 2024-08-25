import Joi from 'joi';

export const createEventSchema = Joi.object({
  summary: Joi.string().required().messages({
    'string.summary': 'Summary must be a valid string',
    'string.empty': 'Summary is required'
  }),
  description: Joi.string().messages({
    'sring.description': 'Description must be a valid string'
  }),
  location: Joi.string().required().messages({
    'string.location': 'Location must be a valid string',
    'string.empty': 'Location is required'
  }),
  start: Joi.date().required().label('Start DateTime').messages({
    'date.base': '"Start DateTime" must be a valid date.',
    'any.required': '"Start DateTime" is required.'
  }),
  end: Joi.date().required().greater(Joi.ref('start')).label('End DateTime').messages({
    'date.base': '"End DateTime" must be a valid date.',
    'any.required': '"End DateTime" is required.',
    'date.greater': '"End DateTime" must be later than "Start DateTime".'
  })
});

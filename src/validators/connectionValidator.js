import Joi from 'joi';

const connectionSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Connection name is required',
  }),
  type: Joi.string().valid('excel', 'csv', 'database').required().messages({
    'any.only': 'Connection type must be one of excel, csv, or database',
  }),
//   file: Joi.any().when('type', {
//     is: Joi.valid('excel', 'csv'),
//     then: Joi.required().messages({
//       'any.required': 'File is required for excel or csv type',
//     }),
//   }),
    file: Joi.any().optional(),
  dbUrl: Joi.string().uri().when('type', {
    is: 'database',
    then: Joi.required().messages({
      'string.uri': 'Database URL must be a valid URI',
    }),
  }),
  authType: Joi.string().valid('username-password').when('type', {
    is: 'database',
    then: Joi.required().messages({
      'any.only': 'Auth type must be "username-password" for database connections',
    }),
  }),
  username: Joi.string().when('authType', {
    is: 'username-password',
    then: Joi.required().messages({
      'string.empty': 'Username is required for database connections',
    }),
  }),
  password: Joi.string().when('authType', {
    is: 'username-password',
    then: Joi.required().messages({
      'string.empty': 'Password is required for database connections',
    }),
  }),
  logo: Joi.any().optional(),
});

// Middleware to validate the request body against the schema
export const validateConnection = (req, res, next) => {
  const { error } = connectionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};

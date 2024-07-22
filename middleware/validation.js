const { check, validationResult } = require('express-validator');

const Validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Extract individual error messages for each field
      const errorMessages = errors.array().map(error => ({
        field: error.param,
        message: error.msg
      }));
      return res.status(400).json({ isError: true, message: 'Validation errors', errors: errorMessages });
    }
    next();
  };

const registerValidation = [
    // Check email
    check('email').isEmail().withMessage('Please provide a valid email address, Email should be xxxxxx@yyyyyy.com'),
  
    // Check password
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  
    // Check username
    check('username').notEmpty().withMessage('Username is required'),

  
    // Validate errors
    Validation
  ];



module.exports =  {registerValidation };
const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Username must not be empty",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must be less than or equal to 20 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email must not be empty",
    "string.email": "Must be a valid email address",
  }),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.label,
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = validateUser;

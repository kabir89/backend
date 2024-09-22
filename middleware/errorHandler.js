const { isCelebrateError } = require("celebrate");

const errorHandler = (err, req, res, next) => {
  const errors = [];

  // Handle Joi/Celebrate validation errors
  if (isCelebrateError(err)) {
    const errorBody = err.details.get("body");
    errorBody.details.forEach((detail) => {
      errors.push({
        field: detail.context.label,
        message: detail.message,
      });
    });
    return res.status(400).json({ errors });
  }

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    err.errors.forEach((e) => {
      errors.push({
        field: e.path,
        message: e.message,
      });
    });
    return res.status(400).json({ errors });
  }

  // Default error handling for unexpected errors
  console.error(err);
  return res.status(500).json({ message: "Something went wrong" });
};

module.exports = errorHandler;

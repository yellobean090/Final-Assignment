const { body } = require("express-validator");

const taskValidationRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters")
];

module.exports = taskValidationRules;
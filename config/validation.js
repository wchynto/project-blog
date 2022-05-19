import { body } from "express-validator";

const registerValidator = [
  body("username").isLength({ min: 8 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

const loginValidator = [
  body("email").isLength({ min: 8 }),
  body("password").isLength({ min: 8 }),
];

export { registerValidator, loginValidator };

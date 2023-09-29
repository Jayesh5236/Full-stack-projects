import { body, validationResult } from "express-validator";

function userRegistrationValidation() {
  // this will have access to req
  return [
    body("fname", "fname cannot be empty").isLength({ min: 2 }),
    body("email", "Email is Invalid").isEmail(),
    body("phone", "Phone number is not valid").isMobilePhone(),
    body("address", "Address cannot be empty")
      .notEmpty()
      .isLength({ min: 5, max: 40 }),
    body("password", "password has to be strong")
      .notEmpty()
      .isLength({ min: 8 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passowrd confirmation does not match Password");
      }
      return true; // indicates the success of the validation
    }),
  ];
}

function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ error: errors.array() });
}

export { userRegistrationValidation, errorMiddleware };

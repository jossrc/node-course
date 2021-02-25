const { validationResult } = require('express-validator');

const dataValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  // Permite continuar con otro middleware en caso de existir
  next();
};

module.exports = {
  dataValidator,
};

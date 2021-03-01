const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
const User = require('../models/user');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: 'Usuario o Contraseña no son correctos - correo',
      });

    // SI el usuario está activo
    if (!user.state)
      return res.status(400).json({
        message: 'El estado del usuario es: false (inactivo)',
      });

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        message: 'Usuario o Contraseña no son correctos - password',
      });

    // Generar el JWT

    res.json({
      message: 'Login Ok',
      user: {
        email,
        password,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Hable con el administrador',
    });
  }
};

module.exports = {
  login,
};

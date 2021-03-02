const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

const User = require('../models/user');

const { googleVerify } = require("../helpers/google-verify");
const { generateJWT } = require('../helpers/generate-jwt');

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
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Hable con el administrador',
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    res.json({
      message: 'Todo ok! Google Sign In',
      googleUser
    });
  } catch (err) {
    res.status(400).json({
      message: 'Token de Google no es válido'
    })
  }

};

module.exports = {
  login,
  googleSignIn,
};

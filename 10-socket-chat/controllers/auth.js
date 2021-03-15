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
  // Obteniendo el id_token de google
  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify(id_token);
    let user = await User.findOne({ email } );

    if (!user) {
      // Tenemos que crearlo si no existe
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      };
      user = new User(data);
      await user.save();
    }

    // Si el usuario está eliminado en la BD
    if (!user.state)
      return res.status(401).json({
        message: 'Hable con el administrador, usuario bloqueado'
      })

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      message: 'Se inició sesión por google correctamente',
      token,
      user
    });
  } catch (err) {
    res.status(400).json({
      message: 'Token de Google no es válido'
    })
  }

};

const renewAndValidateToken = async (req = request, res = response) => {
  const { authenticatedUser } = req;
  // Renovar JWT (tiene uid por la respuesta (mod) del model )
  const token = await generateJWT(authenticatedUser.uid);

  res.json({
    user: authenticatedUser,
    token
  })
}

module.exports = {
  login,
  googleSignIn,
  renewAndValidateToken
};

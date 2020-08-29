const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const User = require('../models/user');

app.get('/user', (req, res) => {
  res.json('getUser');
});

app.post('/user', (req, res) => {
  let { name, email, password, role } = req.body;

  let newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
  });

  newUser.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      user: userDB,
    });

    console.log('Nuevo usuario agregado');
  });
});

app.put('/user/:id', (req, res) => {
  let { id } = req.params;
  let { body } = req;

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        user: userDB,
      });
    }
  );
});

app.delete('/user', (req, res) => {
  res.json('deleteUser');
});

module.exports = app;

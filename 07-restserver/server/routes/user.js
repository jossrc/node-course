const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

app.get('/user', (req, res) => {
  // res.json('getUser');
  // Usando parámetros opcionales
  let since = req.query.since || 0;
  since = Number(since);

  let limit = req.query.limit || 5;
  limit = Number(limit);

  User.find({}).skip(since).limit(limit).exec( (err, users) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      users
    })
  })
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
  let body  = _.pick(req.body, ['name', 'email', 'img', 'role','state']);

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

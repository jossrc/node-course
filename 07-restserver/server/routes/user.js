const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const { verifyToken } = require('../middlewares/authentication');

app.get('/user', verifyToken , (req, res) => {

  return res.json({
    user: req.user,
    name: req.user.name,
    email: req.user.email
  })

  let since = req.query.since || 0;
  since = Number(since);

  let limit = req.query.limit || 5;
  limit = Number(limit);

  User.find({ state: true }, 'name email role state google img')
    .skip(since)
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      User.coucount({ state: true }, (err, counter) => {
        res.json({
          ok: true,
          users,
          quantity: counter,
        });
      });
    });
});

app.post('/user', verifyToken, (req, res) => {
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

app.put('/user/:id', verifyToken , (req, res) => {
  let { id } = req.params;
  let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

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

app.delete('/user/:id', verifyToken, (req, res) => {
  // res.json('deleteUser');
  let { id } = req.params;
  User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true },
    (err, userDeleted) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!userDeleted) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario no encontrado',
          },
        });
      }

      res.json({
        ok: true,
        user: userDeleted,
      });
    }
  );
});

module.exports = app;

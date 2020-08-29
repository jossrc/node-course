const express = require('express');
const app = express();
const User = require('../models/user');

app.get('/user', (req, res) => {
  res.json('getUser');
});

app.post('/user', (req, res) => {
  let { name, email, password, role } = req.body;

  let newUser = new User({
    name,
    email,
    password,
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
  });
});

app.put('/user/:id', (req, res) => {
  res.json('putUser');
});

app.delete('/user', (req, res) => {
  res.json('deleteUser');
});

module.exports = app;

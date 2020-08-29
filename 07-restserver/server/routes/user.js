const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.json('getUser');
});

app.post('/user/:id', (req, res) => {
  let body = req.body;

  if (body.name === undefined) {
    res.status(400).json({
      ok: false,
      message: 'El nombre es necesario',
    });
  } else {
    res.json({ body });
  }
});

app.put('/user', (req, res) => {
  res.json('putUser');
});

app.delete('/user', (req, res) => {
  res.json('deleteUser');
});

module.exports = app;
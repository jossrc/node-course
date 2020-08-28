const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.json('getUser');
});

app.post('/user/:id', (req, res) => {
  let { id } = req.params;

  res.json({
    id: id,
    name: 'Katt',
  });
});

app.put('/user', (req, res) => {
  res.json('putUser');
});

app.delete('/user', (req, res) => {
  res.json('deleteUser');
});

app.listen(3000, () => {
  console.log(`Conectado en el Port 3000`);
});

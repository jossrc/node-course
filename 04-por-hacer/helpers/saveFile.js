const fs = require('fs');

const PATH = './db/data.json';

const saveDB = (data) => {
  fs.writeFileSync(PATH, JSON.stringify(data));
};

const loadDB = () => {
  if (!fs.existsSync(PATH)) {
    return null;
  }

  const info = fs.readFileSync(PATH, { encoding: 'utf-8' });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  saveDB,
  loadDB,
};

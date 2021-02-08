const fs = require('fs');

const saveDB = (data) => {
  const path = './db/data.json';
  fs.writeFileSync(path, JSON.stringify(data));
}

module.exports = {
  saveDB
}

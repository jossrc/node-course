const fs = require("fs");

const createFile = (base, path) => {
  return new Promise((resolve, reject) => {
    if (!Number(base)) {
      reject(`El valor introducido base : '${base}' no es un número`);
      return;
    }

    let data = "";

    for (let i = 1; i <= 10; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }

    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err.message);
      }
      resolve(`mult-${base}.txt`);
    });
  });
};

module.exports = {
  createFile,
};

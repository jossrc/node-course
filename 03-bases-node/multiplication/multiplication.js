const fs = require("fs");

const createFile = (base, limit, path) => {
  return new Promise((resolve, reject) => {
    if (!Number(base)) {
      reject(`El valor introducido base : '${base}' no es un número`);
      return;
    }

    let data = "";

    for (let i = 1; i <= limit; i++) {
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

const listTable = (base, limit = 10) => {
  for (let i = 1; i <= limit; i++) {
    console.log(`${base} * ${i} = ${base * i}`);
  }
}

module.exports = {
  createFile,
  listTable
};

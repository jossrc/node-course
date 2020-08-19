const fs = require("fs");

let base = 3;

const createMultiplicationTable = () => {
  let data = '';
  for (let i = 1; i <= 10; i++) {
    let result = base * i;
    data += `${base} * ${i} = ${result}\n`;
  }
  return data;
};

const path = `tables/mult-${base}.txt`;

fs.writeFile(path, createMultiplicationTable(), (err) => {
  if (err) throw err;
  console.log(`El archivo mult-${base}.txt a sido creado`);
});

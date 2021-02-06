const fs = require('fs');

const createFile = async (base = 1, requireListing) => {
  try {
    let output = '';

    for (let i = 1; i <= 10; i++) {
      output += `${base} x ${i} = ${5 * i}\n`;
    }

    if (requireListing) {
      console.log('========================');
      console.log('   Tabla del:', base);
      console.log('========================\n');

      console.log(output);
    }

    let path = `tabla-${base}.txt`;
    fs.writeFileSync(path, output);

    return path;
  } catch (error) {
    throw error;
  }
};

/*
fs.writeFile(path, output, (err) => {
  if (err) throw err;
  console.log(`${path} creado`);
});
*/

module.exports = {
  createFile,
};

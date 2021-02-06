const fs = require('fs');
const colors = require('colors');

const createFile = async (base = 1, requireListing) => {
  try {
    let output = '';

    for (let i = 1; i <= 10; i++) {
      output += `${base} ${'x'.bold.cyan} ${i} ${'='.bold.cyan} ${5 * i}\n`;
    }

    if (requireListing) {
      console.log('========================'.green);
      console.log('   Tabla del:'.green, colors.blue(base));
      console.log('========================\n'.green);

      console.log(output);
    }

    let path = `tabla-${base}.txt`;
    fs.writeFileSync(path, output);

    return path;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFile,
};

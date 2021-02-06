const fs = require('fs');
const colors = require('colors');

/**
 * Crea un archivo que contiene la tabla de multiplicación
 * según la base y el límite que se le establesca.
 * El retorno es una Promesa con el path donde se ubicó el archivo.
 * @param {number} base Base de la tabla de multiplicar
 * @param {number} limit Límite de la tabla de multiplicar
 * @param {boolean} requireListing Visualizar el resultado en la consola
 */
const createFile = async (base, limit ,requireListing) => {
  try {
    let output = '';

    for (let i = 1; i <= limit; i++) {
      output += `${base} x ${i} = ${5 * i}\n`;
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

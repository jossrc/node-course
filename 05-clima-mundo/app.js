const { readInput } = require("./helpers/inquirer")

const main = async () => {
  const text = await readInput('Ingrese :');
  console.log(text);
}

main();
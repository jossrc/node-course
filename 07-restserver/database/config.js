const mongoose = require('mongoose');

const DEVELOPMENT = process.env.MONGODB_LOCAL;
const PRODUCTION = process.env.MONGODB_CNN;

const dbConnection = async () => {
  try {
    await mongoose.connect(DEVELOPMENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Base de Datos online');
  } catch (e) {
    console.log(e);
    throw new Error('Error a la hora de iniciar la BD : ' + e.message);
  }
};

module.exports = {
  dbConnection,
};

const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
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

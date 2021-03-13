const path = require('path');
const { v4: uuidv4 } = require('uuid');

const validImageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

const uploadYourFile = (
  files,
  validFileExtensions = validImageExtensions,
  folder = ''
) => {
  return new Promise((resolve, reject) => {
    const { myFile } = files;
    const cutFileName = myFile.name.toLowerCase().split('.');
    const fileExtension = cutFileName[cutFileName.length - 1];

    // Validar la extensión
    if (!validFileExtensions.includes(fileExtension)) {
      return reject(
        `La extensión ${fileExtension} no es permitida - ${validFileExtensions}`
      );
    }

    const newUniqueFileName = `${uuidv4()}.${fileExtension}`;
    const uploadPath = path.join(
      __dirname,
      '../uploads/',
      folder,
      newUniqueFileName
    );

    myFile.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(newUniqueFileName);
    });
  });
};

module.exports = {
  uploadYourFile,
};

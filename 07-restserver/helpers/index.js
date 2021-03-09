const dbValidators = require('db-validators');
const generateJWT  = require('generate-jwt');
const googleVerify = require('google-verify');
const uploadFiles  = require('upload-file');

module.exports = {
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...uploadFiles
}

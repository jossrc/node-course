const iDataValidator = require('./dataValidator');
const iValidateJWT = require('./validate-jwt');
const iValidateRoles = require("./validate-roles");
const iValidateFile = require('./validate-file');

module.exports = {
    ...iDataValidator,
    ...iValidateJWT,
    ...iValidateRoles,
    ...iValidateFile
}

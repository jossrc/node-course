const iDataValidator = require('./dataValidator');
const iValidateJWT = require('./validate-jwt');
const iValidateRoles = require("./validate-roles");

module.exports = {
    ...iDataValidator,
    ...iValidateJWT,
    ...iValidateRoles
}

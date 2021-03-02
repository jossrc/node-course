const { response, request } = require('express');

const verifyAdminRole = (req = request, res = response, next) => {

    if (!req.authenticatedUser)
        return res.status(500).json({
            message: 'Se requiere verificar el rol sin validar el token primero'
        });

    const { role, name } = req.authenticatedUser;

    if ( role !== 'ADMIN_ROLE' )
        return res.status(401).json({
            message: `${name} no es administrador - No puede hacer esto`
        });

    next();

}

const existsRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.authenticatedUser)
            return res.status(500).json({
                message: 'Se requiere verificar el rol sin validar el token primero'
            });

        if (!roles.includes(req.authenticatedUser.role))
            return res.status(401).json({
                message: `El servicio requiere uno de estos roles ${roles}`
            })

        next();
    }
}

module.exports = {
    verifyAdminRole,
    existsRole
}


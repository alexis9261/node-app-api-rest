const { response } = require("express")

// Valida si el usuario tiene el rol ADMIN_ROLE
const isAdminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            error: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, name } = req.user;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(400).json({
            error: `${name} no es administrador`
        });
    }

    next();
}

// Valida si el usuario tiene algun rol de los que vienen en 'roles'
const hasRoles = ( ...roles ) => {
    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                error: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if( !roles.includes( req.user.rol ) ){
            return res.status(401).json({
                error: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRoles
}
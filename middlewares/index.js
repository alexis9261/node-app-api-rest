const validateFields = require('../middlewares/validate-fields')
const validateJWT    = require('../middlewares/validate-jwt');
const validateRoles  = require('../middlewares/validate-roles');
const validateFiles  = require('../middlewares/validate-files');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFiles,
}
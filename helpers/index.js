const dbValidators = require('./db-validators');
const generateJWT  = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFile   = require('./uploadFiles');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile
}
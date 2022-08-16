const { Router } = require('express');
const { check } = require('express-validator');
const { loadFiles, updateFiles, downloadImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const { validateFields, fileExists } = require('../middlewares');

const router = Router();

router.post( '/', fileExists, loadFiles );

router.put( '/:collection/:id', [
    fileExists,
    check('id', 'EL id debe ser de MongoDB').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
], updateFiles );

router.get( '/:collection/:id', [
    check('id', 'EL id debe ser de MongoDB').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
    validateFields
], downloadImage );


module.exports = router;
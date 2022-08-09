const { Router } = require('express');
const { check } = require('express-validator');
const { isValidateRole, existsEmail, existsIdUser } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields')

const {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
} = require('../controllers/users');

const router = Router();

// get
router.get('/', userGet);

// put
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdUser ),
    check('rol').custom( isValidateRole ),
    validateFields
], userPut);

// patch
router.patch('/', userPatch);

// post
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El formato de correo no es valido').isEmail(),
    check('email').custom( existsEmail ),
    check('password', 'El password debe de tener mas de 6 caracteres').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( isValidateRole ),
    validateFields
], userPost);

// delete
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdUser ),
    validateFields
],userDelete);

module.exports = router;
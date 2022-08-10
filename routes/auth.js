const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

// const { isValidateRole, existsEmail, existsIdUser } = require('../helpers/db-validators');
// const { validateFields } = require('../middlewares/validate-fields')

// instancio el Router
const router = Router();

// get
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);

// get
router.post('/google', [
    check('id_token', 'El Id Token es obligatorio').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;
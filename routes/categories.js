const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
 } = require('../controllers/categories');
const { existsIdCategory } = require('../helpers/db-validators');
const { validateJWT, hasRoles } = require('../middlewares');

const { validateFields } = require('../middlewares/validate-fields');

// instancio el Router
const router = Router();

// Obtener las categorias - publico
router.get('/', getCategories);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdCategory ),
    validateFields
], getCategory);

// Crear una categoria - privado - cualquier persona cun untokern valido
router.post('/', [ 
    validateJWT,
    check('title', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validateFields
 ], createCategory);

// Actualizar una categoria por id - privado - cualquier persona cun untokern valido
router.put('/:id', [
    validateJWT,
    check('title', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdCategory ),
    validateFields
], updateCategory);

// Borrar una categoria por id - admin
router.delete('/:id', [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdCategory ),
    validateFields
], deleteCategory);

module.exports = router;
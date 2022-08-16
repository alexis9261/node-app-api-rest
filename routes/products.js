const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
 } = require('../controllers/products');
const { existsIdCategory, existsIdProduct } = require('../helpers/db-validators');
const { validateJWT, hasRoles } = require('../middlewares');

const { validateFields } = require('../middlewares/validate-fields');

// instancio el Router
const router = Router();

// Obtener las products - publico
router.get('/', getProducts);

// Obtener un product por id - publico
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdProduct ),
    validateFields
], getProduct);

// Crear una product - privado - cualquier persona cun untokern valido
router.post('/', [ 
    validateJWT,
    check('title', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('category', 'No es un ID valido').isMongoId(),
    check('category').custom( existsIdCategory ),
    validateFields
 ], createProduct);

// Actualizar una product por id - privado - cualquier persona cun untokern valido
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdProduct ),
    validateFields
], updateProduct);

// Borrar una product por id - admin
router.delete('/:id', [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsIdProduct ),
    validateFields
], deleteProduct);

module.exports = router;
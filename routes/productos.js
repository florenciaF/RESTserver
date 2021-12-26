const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId} = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//obtener todos los productos
router.get('/', obtenerProductos );

//obtener un producto por id
router.get('/:id', [
    check('id','No es id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto)


//crear producto
router.post('/',[
    validarJWT,
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    check('categoria','No es id de mongo valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
    ], crearProducto
)


//actualizar producto
router.put('/:id',[
    validarJWT,
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto );


//borrar producto
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es id de mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto)

module.exports = router;
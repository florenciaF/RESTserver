const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearCategorias , 
    obtenerCategorias, 
    actualizarCategoria, 
    obtenerCategoria,
    borrarCategoria
} = require('../controllers/categorias');

const { existeCategoriaPorId, esRoleValido } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//obtener todas las categorias
router.get('/', obtenerCategorias );

//obtener una categoria por id
router.get('/:id', [
    check('id','No es id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria)


//crear categoria
router.post('/',[
    validarJWT,
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategorias
)


//actualizar cat
router.put('/:id',[
    validarJWT,
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria );


//borrar categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria)



module.exports = router;
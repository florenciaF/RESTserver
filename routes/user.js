
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { roleValido, correoExiste, usuarioPorIdExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

  router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( usuarioPorIdExiste ), 
    check('role').custom( roleValido ),

    validarCampos
  ],usuariosPut);
  router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio, mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'el correo no funciona').isEmail(),
    check('correo').custom( correoExiste ),
   // check('role', 'No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
   check('role').custom( roleValido ),
    validarCampos
  ] ,usuariosPost); 

  router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( usuarioPorIdExiste ), 
    validarCampos
  ], usuariosDelete);

  router.patch('/', usuariosPatch);
   
module.exports = router;
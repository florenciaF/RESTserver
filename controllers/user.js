const { response, request, query } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario'); //U mayuscula permite crear instancias 

const usuariosGet =  async(req = request, res = response) => {

    const { limite = 5 ,desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments( query ),
      Usuario.find( query )
      .skip( Number( desde ) )
      .limit( Number(limite))
    ]);

    res.json({
      total,
      usuarios
    })
  }

const usuariosPut =  async(req, res = response) => {

    const { id } = req.params;
    const { __id, password ,google,correo, ...resto} = req.body;
    

    //validar contra base de datos
    if(password){
      //encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password , salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
  }

  const usuariosPost =  async(req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario( {nombre, correo, password, role });
   

    //verificar si el correo existe

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password , salt);

    //guardar en base de datos
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
  }

  const usuariosPatch =  (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })
  }

  const usuariosDelete =  async(req, res = response) => {

    const { id } = req.params;

    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json( usuario );
  }

 

  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
  }
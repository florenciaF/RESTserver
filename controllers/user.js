const { response, request } = require('express');

const usuariosGet =  (req = request, res = response) => {

    const { nombre = 'no name' }= req.query;
    res.json({
        ok: true,
        msg: 'get API - controlador',
        nombre
    })
  }

const usuariosPut =  (req, res = response) => {

    const {id} = req.params;
    res.status(400).json({
        ok: true,
        msg: 'put API - controlador',
        id
    })
  }

  const usuariosPost =  (req, res = response) => {


    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
  }

  const usuariosPatch =  (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })
  }

  const usuariosDelete =  (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    })
  }

 

  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
  }
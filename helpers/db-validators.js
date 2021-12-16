const Role = require("../models/role");
const Usuario = require("../models/usuario");

const roleValido =   async(role = '') => {
    const existeRole = await Role.findOne({ role });
    if( !existeRole ){
      throw new Error('El rol no esta registrado en la BD');
    }
}

const correoExiste = async(correo = '') => {
    
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error('El correo ya esta registrado en la BD');
    }

}

const usuarioPorIdExiste = async( id ) => {

    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error('El id no existe en la BD');
    }

}


module.exports = {
    roleValido,
    correoExiste,
    usuarioPorIdExiste
}
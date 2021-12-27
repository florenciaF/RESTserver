const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');


const esRoleValido = async(role = '') => {

    const existeRol = await Role.findOne({ role });
    if ( !existeRol ) {
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id ${ id } del usuario no existe `);
    }
}

const existeCategoriaPorId = async( id ) => {
    // Verificar si el nombre existe
    console.log("id de categoria", id)
    const existeCat = await Categoria.findById(id);
    if ( !existeCat ) {
        throw new Error(`El id  ${ id } de la categoria no existe`);
    }
    return true;
}

const existeProductoPorId = async( id ) => {

    // Verificar si el nombre del prod existe
    const existeProd = await Producto.findById(id);
    if ( !existeProd ) {
        throw new Error(`El id ${ id } del producto no existe `);
    }
}


/**
 * Validar colecciones permitidas
 */
 const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}


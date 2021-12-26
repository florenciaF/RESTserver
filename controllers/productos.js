const { response } = require('express');
const { Producto } = require('../models');

const crearProducto = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);

}


//obtenerProductos - paginado- total - populate
const obtenerProductos = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            // .populate('usuario','nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        productos
    });
}


//obtenerProducto -  populate
const obtenerProducto = async(req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findById( id );

    res.json( producto );

}


//actualizar producto
const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    if( resto.nombre ) {
        resto.nombre  = resto.nombre.toUpperCase();
    }

    resto.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

    res.json(producto);
}

//borrar producto -id
const borrarProducto = async(req, res = response) => {

    const { id } = req.params;
    const prodBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json(prodBorrado);
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
const { response } = require("express");

const crearCategorias = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriasDB = await Categoria.findOne({ nombre });

    //chequeo que no exista
    if( categoriasDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriasDB.nombre } ya existe `
        })
    }

    //generar datos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    //guardar en DB
    await categoria.save();


    res.status(201).json( categoria );
}


//obtenerCategorias - paginado- total - populate

const Categoria = require('../models/categoria');

const obtenerCategorias = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            // .populate('usuario','nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });
}



//obtenerCategoria -  populate

const obtenerCategoria = async(req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id);

    res.json({
        categoria
    });
}

//actualizar categoria
const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, resto, { new: true });

    res.json(categoria);
}

//borrar categoria -id
const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const catBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json(catBorrada);
}


module.exports = {
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}
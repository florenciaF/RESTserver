const { response } = require('express');
const path = require('path');
const fs = require('fs');

var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivos = async(req, res = response) => {


    try {
        // const nombre = await subirArchivo( req.files,['txt', 'md'], 'textos');  para guardar txt en su carpeta

        //imagenes
        const nombre = await subirArchivo( req.files, undefined, 'imgs');
        console.log('nombre', nombre)
        res.json({
            nombre
        })

       
    } catch( msg ) {
        res.status(400).json({ msg })
    }
 
   
  
}



const actualizarImagen = async( req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:' no existe usuario'
                })
            }

            break;
    
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:' no existe producto'
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se le olvido validar esto'})

    }

    //limpiar imagenes previas
    if(modelo.img){
        //hay que borrar imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img) ;
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }



    //se guarda la imagen con el nombre la coleccion correspondiente
    const nombre = await subirArchivo( req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();


    res.json(modelo);
}


const actualizarImagenCloudinary = async( req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:' no existe usuario'
                })
            }

            break;
    
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:' no existe producto'
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se le olvido validar esto'})

    }

    
     // Limpiar imágenes previas
     if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

    modelo.img = secure_url;
    await modelo.save();


    res.json(modelo);
}

const mostrarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:' no existe usuario'
                })
            }

            break;
    
        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:' no existe producto'
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'se le olvido validar esto'})

    }

    //limpiar imagenes previas
    if(modelo.img){
        //hay que borrar imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img) ;
        if ( fs.existsSync( pathImagen ) ) {
           return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg') ;
    res.sendFile(pathImagen);
  
}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}
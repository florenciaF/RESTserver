const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    precio:{
        type:Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    },
    descripcion: {
        type:String
    },
    dispobible:{
        type:Boolean,
        default:true
    }
});


module.exports = model( 'Producto', ProductoSchema );

const { Schema, model} = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'el nombre es requerido']
    },
    correo:{
        type:String,
        required: [true, 'el correo es requerido'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'el password es requerido'],
    },
    imagen:{
        type:String,
    },
    role:{
        type: String,
        required: true,
        //enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})
//saco de la coleccion la version, el password y todo lo demas si se agrega en "usuario"
usuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);
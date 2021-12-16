const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);


    if( !errors.isEmpty()){
      return res.status(400).json(errors);
    }

    next(); //si todo esta ok segui con el sgte middleware

}

module.exports = {
    validarCampos
};
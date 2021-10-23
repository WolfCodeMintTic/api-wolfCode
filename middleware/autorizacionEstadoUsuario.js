var { getDB } = require('../DB/db.js');
var jwt_decode = require('jwt-decode');
var { ObjectId } = require('mongodb');



const autorizacionEstadoUsuario = async(req, res, next) => {
    // obtener el usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);

    // consultar el usuario en la BD
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, resp) => {
        console.log('response consulta BD', resp)
        if (resp) {
            console.log(resp)
            //verificar el estado del usuario
            if (resp.estado ==='No autorizado') {
                // si el usuario es no autorizado, devolver  un error de autenticacion 
                res.sendStatus(401);
            }else {
                console.log('habilitado');
                
            }
        }
    });
    console.log('hola mundo, soy un middleware')
    // si el usuario esta en pendiente o autorizado ejecutar next
    next();
}

module.exports = autorizacionEstadoUsuario;
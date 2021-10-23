var { getDB } = require('../../DB/db.js');
var { ObjectId } = require('mongodb');
var jwt_decode = require('jwt-decode');

const queryAllUser = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuarios')
        .find()
        .limit(50)
        .toArray(callback);
};

const postUser = async (datosUsuario, callback) => {
    const baseDeDatos = getDB();
    //implementar codigo para crear venta en la BD
    await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
};

const consultarOCrearUsuario = async (req, callback) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    console.log('token', jwt_decode(token));
    const user = jwt_decode(token)['http://localhost/userData'];
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, resp) => {
        console.log('response consulta BD', resp)
        if (resp) {
            callback(err, resp);
        } else {
            user.auth0ID = user._id;
            delete user._id;
            user.rol = 'Pendiente';
            user.estado = 'Pendiente';
            await postUser(user, (err, resp) => callback(err, user));
        }
    });
};

const searchUser = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuarios')
        .find({ _id: new ObjectId(id) }, callback);
}

const patchUser = async (id, editUser, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: editUser,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuarios')
        .findOneAndUpdate(
            filtroUsuario,
            operacion,
            { upsert: true, returnOriginal: true }, callback);
};

const deleteUser = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, callback);
}

module.exports = { queryAllUser, postUser, patchUser, deleteUser, searchUser, consultarOCrearUsuario };
var { getDB } = require('../../DB/db.js');
var { ObjectId } = require('mongodb')


const queryAllUser = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuarios')
        .find()
        .limit(50)
        .toArray(callback);
};

const postUser = async (datosUsuario, callback) => {
    if (
        Object.keys(datosUsuario).includes('usuario') &&
        Object.keys(datosUsuario).includes('correo') &&
        Object.keys(datosUsuario).includes('rol') &&
        Object.keys(datosUsuario).includes('estado')
    ) {
        const baseDeDatos = getDB();
        //implementar codigo para crear venta en la BD
        await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
        
    } else {
        return "error";
    }
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

module.exports = { queryAllUser, postUser, patchUser, deleteUser, searchUser };
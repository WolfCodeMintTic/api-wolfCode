var { getDB } = require('../../DB/db.js');
var {ObjectId} = require('mongodb')


const queryAllProduct = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('productos')
        .find()
        .limit(50)
        .toArray(callback);
};

const postProduct = async (datosProducto,callback) => {
        if (
            Object.keys(datosProducto).includes('producto') &&
            Object.keys(datosProducto).includes('descripcion') &&
            Object.keys(datosProducto).includes('valorUnitario')
        ) {
            const baseDeDatos = getDB();
            //implementar codigo para crear venta en la BD
            await baseDeDatos.collection('productos').insertOne(datosProducto, callback);
            return "bien";
        } else {
          return "error";
        }
};

const searchProduct = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('productos')
        .find({_id: new ObjectId(id)}, callback);
}

const patchProduct = async (id,editProduct, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const operacion = {
        $set: editProduct,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('productos')
        .findOneAndUpdate(
            filtroProducto,
            operacion,
            { upsert: true, returnOriginal: true }, callback);
};

const deleteProduct = async (id, callback) => {
    const filtroProducto = { _id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('productos').deleteOne(filtroProducto, callback);
}

module.exports = { queryAllProduct, postProduct, patchProduct, deleteProduct, searchProduct};
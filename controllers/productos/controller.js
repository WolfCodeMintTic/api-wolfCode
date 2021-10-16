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

const patchProduct = async (editProduct, callback) => {
    const filtroProducto = { _id: new ObjectId(editProduct.id) };
    delete editProduct.id;
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

module.exports = { queryAllProduct, postProduct, patchProduct};
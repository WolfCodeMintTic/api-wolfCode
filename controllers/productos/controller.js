var { getDB } = require('../../DB/db.js');
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
            baseDeDatos.collection('productos').insertOne(datosProducto, callback);
            return "bien";
        } else {
          return "error";
        }
}

module.exports = { queryAllProduct, postProduct };
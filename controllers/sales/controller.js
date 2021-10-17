var { getDB } = require('../../DB/db.js');
var { ObjectId } = require('mongodb')


const queryAllSales = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('venta')
        .find()
        .limit(50)
        .toArray(callback);
};

const postSales = async (datosVenta, callback) => {
    if (
        Object.keys(datosVenta).includes('valorVenta') &&
        Object.keys(datosVenta).includes('cantidad') &&
        Object.keys(datosVenta).includes('precioUnitario') &&
        Object.keys(datosVenta).includes('fechaVenta')&&
        Object.keys(datosVenta).includes('cedulaCliente') &&
        Object.keys(datosVenta).includes('cliente')&&
        Object.keys(datosVenta).includes('vendedor')) {
        const baseDeDatos = getDB();
        //implementar codigo para crear venta en la BD
        await baseDeDatos.collection('venta').insertOne(datosVenta, callback);

    } else {
        return "error";
    }
};

const searchSales = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('venta')
        .find({ _id: new ObjectId(id) }, callback);
}

const patchSales = async (id, editSales, callback) => {
    const filtroVenta = { _id: new ObjectId(id) };
    const operacion = {
        $set: editSales,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('venta')
        .findOneAndUpdate(
            filtroVenta,
            operacion,
            { upsert: true, returnOriginal: true }, callback);
};

const deleteSales = async (id, callback) => {
    const filtroVenta = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').deleteOne(filtroVenta, callback);
}

module.exports = { queryAllSales, postSales, patchSales, deleteSales, searchSales };
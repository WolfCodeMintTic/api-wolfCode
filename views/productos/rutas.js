var Express = require('express')
var { getDB } = require('../../DB/db.js');
var {queryAllProduct, postProduct} = require('../../controllers/productos/controller.js');

const rutasProductos = Express.Router();
const genericCallback =(res) => (err, result) => {
        if (err) {
            res.status(500).send('Error consultando los productos');
        } else {
            res.json(result);
        }
    };

rutasProductos.route('/productos').get((req, res) => {
    console.log('alguien hizo un get a la ruta /productos');
      queryAllProduct(genericCallback(res));
    
});

rutasProductos.route("/productos/registrar").post((req, res) => {
    postProduct(req.body, genericCallback(res));
});

rutasProductos.route("/productos/editar").patch((req, res) => {
    const edicion = req.body;
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    baseDeDatos
        .collection('productos')
        .findOneAndUpdate(
            filtroProducto,
            operacion,
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if (err) {
                    console.error("error al actualizar producto", err);
                    res.sendStatus(500);
                } else {
                    console.log("prodcto actualizado");
                    res.sendStatus(200);
                }
            }
        );
});

rutasProductos.route("/productos/eliminar").delete((req, res) => {
    console.log('alguien hizo un delete a la ruta /productos/eliminar');
    const filtroProducto = { _id: new ObjectId(req.body.id) };
    const baseDeDatos = getDB();
    baseDeDatos.collection('productos').deleteOne(filtroProducto, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})
module.exports = rutasProductos;
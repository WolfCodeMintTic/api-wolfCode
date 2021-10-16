var Express = require('express')
var { getDB } = require('../../DB/db.js');
var {queryAllProduct, postProduct, patchProduct, deleteProduct} = require('../../controllers/productos/controller.js');

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
    patchProduct(req.body, genericCallback(res));
});

rutasProductos.route("/productos/eliminar").delete((req, res) => {
    console.log('alguien hizo un delete a la ruta /productos/eliminar');
    deleteProduct(req.body.id, genericCallback(res));
})
module.exports = rutasProductos;
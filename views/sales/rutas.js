var Express = require('express')
var { queryAllSales, postSales, patchSales, deleteSales, searchProduct } = require('../../controllers/sales/controller.js');

const rutasSales = Express.Router();
const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error consultando los sales');
    } else {
        res.json(result);
    }
};

rutasSales.route('/sales').get((req, res) => {
    console.log('alguien hizo un get a la ruta /sales');
    queryAllSales(genericCallback(res));

});

rutasSales.route("/sales").post((req, res) => {
    postSales(req.body, genericCallback(res));
});

//route de busqueda
rutasSales.route('/sales/:id').get((req, res) => {
    console.log('alguien hizo un get a la ruta /sales');
    searchSales(req.params.id, genericCallback(res));
});

rutasSales.route("/sales/:id").patch((req, res) => {
    patchSales(req.params.id, req.body, genericCallback(res));
});

rutasSales.route("/sales/:id").delete((req, res) => {
    console.log('alguien hizo un delete a la ruta /sales/eliminar');
    deleteSales(req.params.id, genericCallback(res));
})
module.exports = rutasSales;
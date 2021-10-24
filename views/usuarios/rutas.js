var Express = require('express')
var { queryAllUser, postUser, patchUser, deleteUser, searchProduct, consultarOCrearUsuario } = require('../../controllers/usuarios/controller.js');

const rutasUsuarios = Express.Router();
const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error consultando los usuarios');
    } else {
        res.json(result);
    }
};

rutasUsuarios.route('/usuarios/').get((req, res) => {
    console.log('alguien hizo un get a la ruta /usuarios');
    queryAllUser(genericCallback(res));

});

rutasUsuarios.route("/usuarios").post((req, res) => {
    postUser(req.body, genericCallback(res));
});

//route de busqueda
// rutasUsuarios.route('/usuarios/:id').get((req, res) => {
//     console.log('alguien hizo un get a la ruta /usuarios');
//     searchUser(req.params.id, genericCallback(res));
// });
rutasUsuarios.route('/usuarios/self/').get((req, res) => {
    console.log('alguien hizo un get a la ruta /usuarios/self');
    consultarOCrearUsuario(req, genericCallback(res));
    // searchUser(, genericCallback(res));
});

rutasUsuarios.route("/usuarios/:id/").patch((req, res) => {
    patchUser(req.params.id, req.body, genericCallback(res));
});

rutasUsuarios.route("/usuarios/:id/").delete((req, res) => {
    console.log('alguien hizo un delete a la ruta /usuarios/eliminar');
    deleteUser(req.params.id, genericCallback(res));
})
module.exports = rutasUsuarios;
var Express = require('express');
var Cors = require('cors');
var dotenv = require('dotenv');
var {conectarBD, getDB} = require('./DB/db.js');
var rutasProductos = require('./views/productos/rutas.js');
var rutasUsuarios = require('./views/usuarios/rutas.js');
var rutasVentas = require('./views/ventas/rutas.js');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var autorizacionEstadoUsuario = require('./middleware/autorizacionEstadoUsuario')
//import express from 'express';

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://wolfcode-mintic.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-wolfcode-auth',
    issuer: 'https://wolfcode-mintic.us.auth0.com/',
    algorithms: ['RS256']
});
app.use(jwtCheck);

app.use(autorizacionEstadoUsuario);

app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasVentas)
const main = () => {
    return app.listen(port, () => {
        console.log(`escuchando puerto ${port}`);
    });
};

conectarBD(main);
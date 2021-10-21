var Express = require('express');
var Cors = require('cors');
var dotenv = require('dotenv');
var {conectarBD, getDB} = require('./DB/db.js');
var rutasProductos = require('./views/productos/rutas.js');
var rutasUsuarios = require('./views/usuarios/rutas.js');
var rutasVentas = require('./views/ventas/rutas.js');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
//import express from 'express';

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

const app = Express();

app.use(jwtCheck);
app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasVentas)
const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
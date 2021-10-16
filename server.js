var Express = require('express');
var Cors = require('cors');
var dotenv = require('dotenv');
var {conectarBD, getDB} = require('./DB/db.js');
var rutasProductos = require('./views/productos/rutas.js');
//import express from 'express';


const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos);
const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
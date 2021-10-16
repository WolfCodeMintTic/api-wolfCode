var Express = require('express');
var { MongoClient, ObjectId } = require('mongodb');
var Cors = require('cors');
var dotenv = require('dotenv');
//import express from 'express';

dotenv.config({path:'./.env'});
const stringConexion = process.env.DATABASE_URL;
const client = new MongoClient(stringConexion, { useNewUrlParser: true, useUnifiedTopology: true, });

let baseDeDatos;

const app = Express();

app.use(Express.json());
app.use(Cors())

app.get('/productos', (req, res) => {
    console.log('alguien hizo un get a la ruta /productos');
    baseDeDatos.collection('productos').find({}).limit(50).toArray((err, result) => {
        if (err) {
            res.status(500).send('Error consultando los productos');
        } else {
            res.json(result);
        }
    })
})

app.post("/productos", (req, res) => {
    const datosProducto = req.body;
    console.log("llaves", Object.keys(datosProducto));
    try {
        if (
            Object.keys(datosProducto).includes('producto') &&
            Object.keys(datosProducto).includes('descripcion') &&
            Object.keys(datosProducto).includes('valorUnitario')
        ) {
            //implementar codigo para crear venta en la BD
            baseDeDatos.collection('productos').insertOne(datosProducto, (err, result) => {
                if (err) {
                    console.error('500')
                    res.sendStatus(500)
                } else {
                    console.log('result')
                    res.sendStatus(200)
                }
            })
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    } catch {
        res.sendStatus(500)
    }
})

app.patch("/productos/editar", (req, res) => {
    const edicion = req.body;
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
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

app.delete("/productos/eliminar", (req, res) => {
    console.log('alguien hizo un delete a la ruta /productos/eliminar');
    const filtroProducto = { _id: new ObjectId(req.body.id) };
    baseDeDatos.collection('productos').deleteOne(filtroProducto, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})
const main = () => {
    client.connect((err, db) => {
        if (err) {
            console.error("Error al conectar a la bd");
            return 'error';
        } else {
            baseDeDatos = db.db('wolfcode');
            console.log('baseDeDatos exitosa');
            return app.listen(process.env.PORT, () => {
                console.log(`escuchando puerto ${process.env.PORT}`);
            });
        }
    });
};

main();
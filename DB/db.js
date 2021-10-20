var { MongoClient} = require('mongodb');
var dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, { useNewUrlParser: true, useUnifiedTopology: true, });

let baseDeDatos;

const conectarBD = (callback)=>{
    client.connect((err, db) => {
        if (err) {
            console.error("Error al conectar a la bd");
            return 'error';
        } else {
            baseDeDatos = db.db('wolfcode');
            console.log('baseDeDatos exitosa');
            return callback();
        }
    });
}

const getDB = () =>{
    return baseDeDatos
}

module.exports = {conectarBD, getDB};


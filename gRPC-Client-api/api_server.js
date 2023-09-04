// NOTA: Como se había mencionado en el README que el cliente va a ser una api
//       por lo tanto la codificamos.

// Importamos express
const express = require('express');

// Creamos el servidor express
const app = express();

// Importamos morgan el cual es un es un Middleware de nivel 
// de solicitud HTTP.
var morgan = require('morgan');

// Ahora para los CORS (Cross Domain) es necesario realizar 
// la siguiente importación.
const cors = require('cors');

// Congiguraciónes
const port = 3000;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Rutas
// Primer Endpoint
app.use( '/caso', require( './routes/casos' ) );

// Levantar el servidor
app.listen( port, () =>{
    console.log('Servidor ejecutandose en el puerto: '. port);
});
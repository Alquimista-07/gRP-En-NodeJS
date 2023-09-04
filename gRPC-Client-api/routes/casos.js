// Importaciones
var express = require('express');
var router = express.Router();
const client = require('../gRPC_client');

// Definimos las rutas o endpoints

router.post('/agregarCaso', function (req, res){

    // Objeto para obtener la data del request
    const data_caso = {
        name : req.body.name,
        location: req.body.location,
        age : req.body.age,
        infected_type : req.body.infected_type,
        state : req.body.state
    }

    // Llamamos al procedimiento remoto (gRCP)
    // consumiendo el cliente.

    // En este caso el procedimiento que tenemos en el proto
    // y que llamamos AddCaso y le mandamos la data que recibe
    // el proto (CasoRequest) y que acá definimos como el obejto
    // data_caso.
    client.AddCaso(data_caso, function(err, response) {
        // Como es una api damos la respuesta a quien realizo
        // la petición y como el Reply en el proto nos devuelve 
        // el message ese es el que mostramos
        res.status(200).json({
            ok: true,
            mensaje: response.message
        })
    });

});

// Segundo endpoint
router.get('/listarCasos', function(rq, res) {

    // Arreglo para almacenar los datos debido a que como se mencionó 
    // cuando creamos el proto vamos a ir haciendole push() para alamacenar
    // uno a uno
    const rows = [];

    // Llamada al procedimiento
    const call = client.ListarCasos();

    call.on('data', function(data) {
        rows.push(data);
    });

    // Cuando se termina con el último dato
    // respondemos con el método send() los rows
    call.on('end', function() {
        console.log('Data obtenida con éxito');
        res.status(200).json({
            ok: true,
            data: rows
        });
    });

    // Si hay un error se maneja
    call.on('error', function(e) {
        console.log('Error al obtener la data', e);
    })

});

// Ruta para eliminar un caso
router.delete('/eliminar/:id', function (req, res) {

    const id_caso = {
        id : req.params.id
    }

    client.EliminarCaso(id_caso, function(err, response) {

        res.status(200).json({
            ok: true,
            mensaje: response.message
        });
    });
});

// Exportamos
module.exports = router;
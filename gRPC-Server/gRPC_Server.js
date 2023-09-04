// Ruta del proto
var PROTO_PATH = "./proto/demo.proto";

var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

/* Conexion a la base de datos */
const mysqlConnection = require("./mysql_connection");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// NOTA: Pasamos la definición del paquete y la cual especificamos en el archivo demo.proto
//       y la cual llamamos demo
var demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

// Definición de la funcion AddCaso para el procedimiento remoto
// En este caso el call va a traer cada uno de los parámetros que definimos en el message CasoRequest
// del proto, es decir nos va a traer esa estructura
function AddCaso(call, callback) {

    // Hacemos la operación para insertar los datos, entonces primero preparo el query
    const query = 'INSERT INTO Caso (name,location,age,infected_type,state) VALUES ('+
    '\''+call.request.name+'\','+
    '\''+call.request.location+'\','+
    +call.request.age+','+
    '\''+call.request.infected_type+'\','+
    '\''+call.request.state+'\');';

    // Insertamos los datos en la base de datos.
    mysqlConnection.query(query, function(err, rows, fields) {
        if(err) throw err;
        // Acá le pasamos el message que fue como definimos en el Reply del protobuffer (demo.proto)
        // y esto se le va a devolver al cliente (gRPC-Client-api) en la ruta '/agrearCaso' en el
        // response.message
        callback(null, {message: 'Caso insertado en la base de datos'});
    });
}

// Definición de la función ListarCasos del procedimiento remoto
function ListarCasos(call){
    
    // Preparamos el query
    // Pasamos el query de esta forma ya que al hacer el Select * from Caso; tendríamos
    // que modificar el protobuffer del CasoReply ya que en la definición de su estructura
    // no lo pasamos.
    const query = 'SELECT name,location,age,infected_type,state FROM Caso;';

    mysqlConnection.query(query, function(err, rows, fields) {
        if(err) throw err;

        // Recorremos el arreglo debido al streaming que se esta haciendo
        // para ir escribiendo uno por uno
        for(const data of rows){
            call.write(data);
        }

        call.end();

    });

}

// Inicia un RPC server que recive las peticiones para el servicio Casos
function main(){
    // Instancia del servidor
    var server = new grpc.Server();

    // Llamamos el servicio que creamos en el proto y le pasamos la función
    server.addService(demo_proto.Casos.service, {
        // Definición de los procedimientos remotos definidos en el proto
        AddCaso: AddCaso,
        ListarCasos: ListarCasos
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log('Servidor gRPC ejecutandose en el puerto 50051');
    });
}

main();
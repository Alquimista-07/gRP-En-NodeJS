// NOTA: El cliente solo me va a servir para realizar la conexión porque
//       en realidad lo que necesito es la api y esto solo lo vamos a ocupar
//       para que le diga que la conexión esta en localhost:50051

// Ruta del proto
var PROTO_PATH = "./proto/demo.proto";

var parseArgs = require("minimist");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// NOTA: Pasamos la definición del paquete y la cual especificamos en el archivo demo.proto
//       y la cual llamamos demo
var demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

// Definición de la conexión
var argv = parseArgs(process.argv.slice(2), {
  string: "target",
});

var target;

if (argv.target) {
  target = argv.target;
} else {
  target = "localhost:50051";
}

var client = new demo_proto.Geeter(target, grpc.credentials.createInsecure());

// Exportamos el cliente
module.exports = client;
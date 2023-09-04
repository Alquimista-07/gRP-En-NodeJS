# gRP-En-NodeJS
Video tutorial práctico tomado de Youtube del canal de Carlod David. Enlace: https://www.youtube.com/watch?v=5xlwFWakNvA&amp;ab_channel=CarlosDavid

La documentación oficial de gRPC la podemos encontrar en: https://grpc.io/

# Antes de empezar

Los pasos iniciales a realizar es la inicialización del proyecto en node tanto para el server como el client y tamibién la instalación de dependencias.

Para ello vamos a ejecutar los siguientes
comandos:

### SERVER

```
npm init -y
npm install mysql
npm install @grpc/grpc-js @grpc/proto-loader async google-protobuf lodash minimist
```

### CLIENT
Como esta va a ser una api necesitamos express, cors y todo lo demás.
```
npm init -y
npm install express cors morgan
npm install @grpc/grpc-js @grpc/proto-loader async google-protobuf lodash minimist
```
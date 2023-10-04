# gRP-En-NodeJS
Video tutorial práctico tomado de [Youtube](https://www.youtube.com/watch?v=5xlwFWakNvA&amp;ab_channel=CarlosDavid) del canal de Carlod David.

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

## Ejecución Aplicación

### SERVER

Para ejecutar el servidor gRPC debemos dirigirnos en la consola de comandos a la ruta del servidor y ejecutar el siguiente comando:

```
node gRPC_Server.js 
```

Y esto nos va a mostrar por la consola lo que mensajes que definimos indicando que el servidor se esta ejecutando y el estado de la conexión a la base de datos.

### SERVER

Para ejecutar el cliente gRPC debemos dirigirnos en la consola de comandos a la ruta del servidor y ejecutar el siguiente comando:

```
api_server.js 
```

Y nos va a mostrar por consola que el servidor se esta ejecutando y escuchando en el puerto que definimos.

## Pruebas de la aplicación.

Para probar podemos hacerlo a través de Postman haciendo el llamaddo a los endpoint, o también podemos enviar tráfico con el Locust y el cual esta codificado y configurado dentro de la carpeta `testloader_locust` escrito en Python y para el cual necesitaremos tener obviemente instalado Python y también pip.

Entonces para hacer la prueba con locust necesitamos realizar los siguientes pasos:

1. En la línea de comando en la ruta de la carpeta testloader_locust ejecutamos el siguiente comando que instala las dependencias necesarias:
```
pip install locust
```

2. Luego podemos revisar la versión instalada usando el comando:
```
locust --v
```

3. Para ejecutar Locust ejecutamos el siguiente comando:
```
locust -f Demo.py
```

4. Posteriormente nos dirigimos al navegador web a la dirección `0.0.0.0:8089`

5. Nos va a arrojar un formulario, en el cual en el campo `Number of users` colocamos 1, en el campo `Spawn rate` colocamos 1 y en el campo `Host` indicamos el localhost (http://127.0.0.1:3000).

6. Posteriormente damos click en el botón `Start swarming`.

7. Esto nos va a mostrar un dashborad en el cual si nos dirigimos a la pestaña `Charts` deberíamos ver en el gráfico `Total Requests per Second` una línea verde.

8. Y ya con esto realizado si nos dirigimos a la consola o gestor de base de datos que tengamos y hacemos una consulta sobre la base de datos ya deberíamos observar los datos insertados y los cuales fueron definidos en el archivo lista_casos.json en el Locust.

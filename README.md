copiar el archivo .env en la carpeta root del proyecto

Hacer npm install dentro de la ruta del proyecto para crear la carpeta node_modules con todas las librerias que se necesitan para correr el proyecto.

con el comando npm run dev se corre el proyecto.

utilizando los siguientes comando se corren los test:

npx jest identificationservice.spec.ts // este corre el test del servicio de identificacion de ip npx jest deleteIpFromBanlistservice.spec.ts // este corre el servicio para borrar una ip del archivo donde se guardan npx jest addIpToBanlistservice.spec.ts // este corre el test que agrega una ip al archivo de la banlist

entrando a la url http://localhost:*puerto que va en el .env*/swagger/ se accede a la documentacion de todas las apis

las apis se encuentran protegidas con jwt.

curls de las peticiones:

peticion para logearte: curl --location 'http://localhost:8083/api/login'
--header 'Content-Type: application/json'
--data '{ "username": "Leonardo", "password": "1234" }'

peticion para buscar la informacion requerida segun la ip: curl --location 'http://localhost:8083/api/getIpIdentification'

peticion para agregar una ip de la banlist: curl --location 'http://localhost:8083/api/addIpToBanlist'
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxlb25hcmRvIiwiaWF0IjoxNjk0MjMzMDI1LCJleHAiOjE2OTQyMzY2MjV9.GO8om7-7a1V-9vD5Ary3tFTPXKfdhFOzKEpVb9d2uxI'
--header 'Content-Type: application/json'
--data '{ "ip": "192.0.250.10" }'

peticion para borrar una ip de la banlist: curl --location 'http://localhost:8084/api/deleteIpFromBanlist'
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxlb25hcmRvIiwiaWF0IjoxNjk0MjMzMDI1LCJleHAiOjE2OTQyMzY2MjV9.GO8om7-7a1V-9vD5Ary3tFTPXKfdhFOzKEpVb9d2uxI'
--header 'Content-Type: application/json'
--data '{ "ip": "192.0.250.10" }'

puntualmente la funcion de node estando en un servidor recibiria una ip dinamica de el request de la peticin y haria su proceso completo pero al levantar el proyecto toma la ip del server de node por esa razon dentro de la funcion se encuentra una ip generica para que tome como si fuera una peticion normal.
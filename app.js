import  express from "express";
import cors from "cors"
import mysql  from 'mysql2'
import myconn from 'express-myconnection'
import path from  'path'


//immportamos la conexion a la DB
import db from "./database/db.js";
//importamos nuestro enrutador 
import usuarioRoutes from "./routes/UsuarioRoutes.js";

import proyectosRealizados from "./routes/ProyectosRealizadoRoutes.js";
import serviciosOfrecidos  from "./routes/ServiciosOfrecidosRoutes.js";
import ProyeHasImagenes  from "./routes/ProyeHasImagenRoutes.js";
import Imagenes from './routes/ImagenesRoutes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app = express()

app.use(cors());
app.use(express.json())
app.use('/usuarios', usuarioRoutes)
app.use('/proyectosrealizados', proyectosRealizados)
app.use('/ServiciosOfrecidos', serviciosOfrecidos)
app.use('/proyehasimage',ProyeHasImagenes)
app.use('/imagenes', Imagenes)


app.use(myconn(mysql, {
   host: 'incarranza13.mysql.database.azure.com',
   port: 3306,
   user: 'InCarranza',
   password: 'Sashaloka13',
   database: 'db_incarranza'
 }));

// Crear directorio para imágenes si no existe
// Ruta al directorio "bdimages" en la raíz del proyecto

try {
   await db.authenticate();
   console.log('Conexion exitosa a la DB');
   } catch (error) {
   console.log(`El error de conexion es: ${error}`);
}
//nodemon app, ahora iniciamos aqui la base de datos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
// Type module
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerVeterinarios from './routers/veterinario_routes.js'
import routerPacientes from './routers/paciente_routes.js'
import routerSwagger from './routers/swagger_routes.js'
import {swaggerDocsIN} from './controllers/swagger_controller.js';


// Inicializaciones
// Inicializar express en la variable app
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Variables globales


// Rutas
app.get("/", (req,res)=>{
    res.status(200).json({bienvenida:"Bienvenido a la API de veterinary management",
    documentacion:"Porfavor revisa la documentación en el siguiente link",
    linkDocumentacion:"https://veterinary-managment.onrender.com/api/docs"})
})    
app.use('/api',routerVeterinarios)
app.use('/api',routerPacientes)
app.use('/api',routerSwagger)
swaggerDocsIN(app)
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportación por default de la variable app
export default  app
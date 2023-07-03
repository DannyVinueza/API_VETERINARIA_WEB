// Type module
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerVeterinarios from './routers/veterinario_routes.js'

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
app.use('/api',routerVeterinarios)
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportación por default de la variable app
export default  app
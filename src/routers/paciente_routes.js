import {Router} from 'express'
const router = Router()
import verificarAutenticacion from "../middlewares/autenticacion.js";

import {
    actualizarPaciente,
    detallePaciente,
    eliminarPaciente,
    listarPacientes,
    registrarPaciente,
} from "../controllers/paciente_controller.js";

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Operaciones relacionadas con los pacientes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Obtener todos los pacientes.
 *     description: Obtiene una lista de todos los pacientes registrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schemas:
 *               $ref: '#/components/schemas/Paciente'
 *             example:
 *               {
 *                  "_id": "string",
 *                  "nombre": "string",
 *                  "propietario": "string",
 *                  "email": "string",
 *                  "celular": "string",
 *                  "convencional": "string",
 *                  "ingreso": Date,
 *                  "sintomas": "string",
 *                  "estado": bool,
 *                  "veterinario": {
 *                  "_id": "string",
 *                  "nombre": "string",
 *                  "apellido": "string"
 *                  }
 *                }
 */

router.get("/pacientes", verificarAutenticacion, listarPacientes);

/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     summary: Obtiene el detalle del paciente.
 *     description: Obtiene el detalle solo del paciente que ha sido especificado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente a obtener detalles.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del paciente que se indica.
 *         content:
 *           application/json:
 *             schemas:
 *               $ref: '#/components/schemas/Paciente'
 *             example:
 *               {
 *                  "_id": "string",
 *                  "nombre": "string",
 *                  "propietario": "string",
 *                  "email": "string",
 *                  "celular": "string",
 *                  "convencional": "string",
 *                  "ingreso": Date,
 *                  "sintomas": "string",
 *                  "salida": Date,
 *                  "estado": bool,
 *                  "veterinario": {
 *                  "_id": "string",
 *                  "nombre": "string",
 *                  "apellido": "string"
 *                  }
 *                }
 */

router.get("/paciente/:id",verificarAutenticacion, detallePaciente);

/**
 * @swagger
 * /paciente/registro:
 *   post:
 *     summary: Registra un nuevo paciente
 *     description: Registra un nuevo paciente en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: formData
 *         name: nombre
 *         required: true
 *         description: Nombre del paciente.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: propietario
 *         required: true
 *         description: Nombre del propietario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: email
 *         required: true
 *         description: Email del propietario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: celular
 *         required: true
 *         description: Celular del propietario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: convencional
 *         required: true
 *         description: Convencional del propietario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: sintomas
 *         required: true
 *         description: Sintomas del paciente.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: veterinario
 *         description: ID de un veterinario existente.
 *         schema:
 *           type: string
 *           format: mongodb
 *     responses:
 *       200:
 *         description: Registro exitoso del paciente
 *         content:
 *           application/json:
 *             example:
 *                    {
 *                        "msg": "Registro exitoso del paciente"
 *                     }
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error1:
 *                   type: string
 *                 error2:
 *                   type: string
 *             example:
 *               error1: "Lo sentimos, debes llenar todos los campos"
 *               error2: "El veterinario no existe"
 */
router.post("/paciente/registro", verificarAutenticacion,registrarPaciente);
router.put("/paciente/actualizar/:id", verificarAutenticacion,actualizarPaciente);
router.delete("/paciente/eliminar/:id", verificarAutenticacion,eliminarPaciente);

export default router
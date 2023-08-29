import { Router } from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import {
  actualizarPaciente,
  detallePaciente,
  eliminarPaciente,
  listarPacientes,
  registrarPaciente,
} from "../controllers/paciente_controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Operaciones relacionadas con los pacientes
 */
// Definición de componentes (schemas)

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Obtener lista de pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de pacientes obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nombre: Paciente 1
 *                 propietario: Dueño 1
 *               - id: 2
 *                 nombre: Paciente 2
 *                 propietario: Dueño 2
 */
router.get("/pacientes", verificarAutenticacion, listarPacientes);

/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     summary: Obtener detalles de un paciente por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalles del paciente obtenidos exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nombre: Paciente 1
 *               propietario: Dueño 1
 *               email: paciente1@example.com
 *               celular: 1234567890
 *               convencional: 9876543210
 *               sintomas: Síntomas del paciente 1
 *       '404':
 *         description: Paciente no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente no encontrado
 */
router.get("/paciente/:id", verificarAutenticacion, detallePaciente);

/**
 * @swagger
 * /paciente/actualizar/{id}:
 *   put:
 *     summary: Actualizar perfil de un paciente por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       '200':
 *         description: Perfil del paciente actualizado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Perfil del paciente actualizado exitosamente
 *       '400':
 *         description: Campos incompletos
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos
 *       '404':
 *         description: Paciente no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente no encontrado
 */
router.put("/paciente/actualizar/:id", verificarAutenticacion, actualizarPaciente);

/**
 * @swagger
 * /paciente/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un paciente por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Paciente eliminado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente eliminado exitosamente
 *       '400':
 *         description: Campos incompletos
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos
 *       '404':
 *         description: Paciente no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente no encontrado
 */
router.delete("/paciente/eliminar/:id", verificarAutenticacion, eliminarPaciente);

/**
 * @swagger
 * /paciente/registro:
 *   post:
 *     summary: Registrar nuevo paciente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteInput'
 *     responses:
 *       '200':
 *         description: Paciente registrado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente registrado exitosamente
 *       '400':
 *         description: Campos incompletos
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos
 */
router.post("/paciente/registro", verificarAutenticacion, registrarPaciente);


/**
 * @swagger
 * components:
 *    schemas:
 *     PacienteInput:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         propietario:
 *           type: string
 *         email:
 *           type: string
 *         celular:
 *           type: string
 *         convencional:
 *           type: string
 *         sintomas:
 *           type: string
 *       required:
 *         - nombre
 *         - propietario
 *         - email
 *         - celular
 *         - convencional
 *         - sintomas
 *    securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
// Exportación
export default router;


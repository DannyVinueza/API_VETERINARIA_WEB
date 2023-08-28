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
 * components:
 *   schemas:
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
 */
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
 *   parameters:
 *     - in: header
 *       name: Authorization
 *       schema:
 *         type: string
 *       required: true
 *       description: Token de autenticación JWT
 */
router.get("/pacientes", verificarAutenticacion, listarPacientes);

/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     summary: Obtener detalles de un paciente
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
 *       '404':
 *         description: Paciente no encontrado
 *   put:
 *     summary: Actualizar perfil de un paciente
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
 *       '400':
 *         description: Campos incompletos
 *       '404':
 *         description: Paciente no encontrado
 *   delete:
 *     summary: Eliminar un paciente
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
 *       '400':
 *         description: Campos incompletos
 *       '404':
 *         description: Paciente no encontrado
 */
router.get("/paciente/:id", verificarAutenticacion, detallePaciente);
router.put("/paciente/:id", verificarAutenticacion, actualizarPaciente);
router.delete("/paciente/:id", verificarAutenticacion, eliminarPaciente);

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
 *       '400':
 *         description: Campos incompletos
 */
router.post("/paciente/registro", verificarAutenticacion, registrarPaciente);

export default router;

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
 *     summary: Obtener todos los pacientes
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/pacientes", verificarAutenticacion, listarPacientes);
router.get("/paciente/:id",verificarAutenticacion, detallePaciente);
router.post("/paciente/registro", verificarAutenticacion,registrarPaciente);
router.put("/paciente/actualizar/:id", verificarAutenticacion,actualizarPaciente);
router.delete("/paciente/eliminar/:id", verificarAutenticacion,eliminarPaciente);

export default router
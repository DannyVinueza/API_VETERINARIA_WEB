// Hacer la importación de la función router por parte de express
import { Router } from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import {
    // Importar funciones controladoras
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPassword,
    nuevoPassword,
} from "../controllers/veterinario_controller.js";

// Inicializar la función en la variable router
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Veterinarios
 *   description: Operaciones relacionadas con los veterinarios
 */

/**
 * @swagger
 * /veterinario/login:
 *   post:
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '400':
 *         description: Campos incompletos o credenciales incorrectas
 */
router.post("/login", login);

/**
 * @swagger
 * /veterinario/registro:
 *   post:
 *     summary: Registrar nuevo veterinario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeterinarioInput'
 *     responses:
 *       '200':
 *         description: Veterinario registrado exitosamente
 *       '400':
 *         description: Campos incompletos o email ya registrado
 */
router.post("/registro", registro);

/**
 * @swagger
 * /veterinario/confirmar/{token}:
 *   get:
 *     summary: Confirmar correo electrónico
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Correo electrónico confirmado, ya puedes iniciar sesión
 *       '404':
 *         description: Token inválido
 */
router.get("/confirmar/:token", confirmEmail);

/**
 * @swagger
 * /veterinario/veterinarios:
 *   get:
 *     summary: Obtener lista de veterinarios
 *     responses:
 *       '200':
 *         description: Lista de veterinarios obtenida exitosamente
 */
router.get("/veterinarios", listarVeterinarios);

/**
 * @swagger
 * /veterinario/recuperar-password:
 *   get:
 *     summary: Iniciar proceso de recuperación de contraseña
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Proceso de recuperación de contraseña iniciado
 *       '400':
 *         description: Campos incompletos o email no registrado
 */
router.get("/recuperar-password", recuperarPassword);

/**
 * @swagger
 * /veterinario/recuperar-password/{token}:
 *   get:
 *     summary: Comprobar token de recuperación de contraseña
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Token de recuperación de contraseña confirmado
 *       '404':
 *         description: Token no válido
 */
router.get("/recuperar-password/:token", comprobarTokenPassword);

/**
 * @swagger
 * /veterinario/nuevo-password/{token}:
 *   post:
 *     summary: Establecer nuevo password después de recuperación
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmpassword:
 *                 type: string
 *             required:
 *               - password
 *               - confirmpassword
 *     responses:
 *       '200':
 *         description: Password actualizado exitosamente
 *       '400':
 *         description: Campos incompletos o passwords no coinciden
 *       '404':
 *         description: Token no válido
 */
router.post("/nuevo-password/:token", nuevoPassword);

/**
 * @swagger
 * /veterinario/perfil:
 *   get:
 *     summary: Obtener perfil del veterinario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil del veterinario obtenido exitosamente
 *       '401':
 *         description: No autorizado, se requiere autenticación
 */
router.get('/perfil', verificarAutenticacion, perfil);

/**
 * @swagger
 * /veterinario/actualizarpassword:
 *   put:
 *     summary: Actualizar password del veterinario autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passwordactual:
 *                 type: string
 *               passwordnuevo:
 *                 type: string
 *             required:
 *               - passwordactual
 *               - passwordnuevo
 *     responses:
 *       '200':
 *         description: Password actualizado exitosamente
 *       '400':
 *         description: Campos incompletos o password actual incorrecto
 *       '401':
 *         description: No autorizado, se requiere autenticación
 *       '404':
 *         description: Veterinario no encontrado
 */
router.put('/veterinario/actualizarpassword', verificarAutenticacion, actualizarPassword);

/**
 * @swagger
 * /veterinario/{id}:
 *   get:
 *     summary: Obtener detalles de un veterinario por ID
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
 *         description: Detalles del veterinario obtenidos exitosamente
 *       '401':
 *         description: No autorizado, se requiere autenticación
 *       '404':
 *         description: Veterinario no encontrado
 */
router.get('/veterinario/:id', verificarAutenticacion, detalleVeterinario);

/**
 * @swagger
 * /veterinario/{id}:
 *   put:
 *     summary: Actualizar perfil de un veterinario por ID
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
 *             $ref: '#/components/schemas/VeterinarioInput'
 *     responses:
 *       '200':
 *         description: Perfil del veterinario actualizado exitosamente
 *       '400':
 *         description: Campos incompletos o email ya registrado
 *       '401':
 *         description: No autorizado, se requiere autenticación
 *       '404':
 *         description: Veterinario no encontrado
 */
router.put('/veterinario/:id', verificarAutenticacion, actualizarPerfil);
/**
 * @swagger
 * components:
 *   schemas:
 *     VeterinarioInput:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         direccion:
 *           type: string
 *         telefono:
 *           type: number
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - password
 */
// Exportación
export default router;

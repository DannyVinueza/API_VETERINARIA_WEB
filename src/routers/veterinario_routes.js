
import { Router } from 'express';
import verificarAutenticacion from '../middlewares/autenticacion.js';
import {
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
} from '../controllers/veterinario_controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Veterinarios
 *   description: Operaciones relacionadas con los veterinarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     RegistroInput:
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
 *     RecuperarPasswordInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *       required:
 *         - email
 *     NuevoPasswordInput:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *         confirmpassword:
 *           type: string
 *       required:
 *         - password
 *         - confirmpassword
 *     ActualizarPerfilInput:
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
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Iniciar sesión con credenciales de veterinario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso.
 *       '404':
 *         description: Credenciales inválidas o usuario no encontrado.
 */
router.post('/login', login);

/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Registrar nuevo veterinario
 *     description: Registrar un nuevo veterinario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroInput'
 *     responses:
 *       '200':
 *         description: Veterinario registrado exitosamente.
 *       '400':
 *         description: Datos inválidos o veterinario existente.
 */

router.post('/registro', registro);

/**
 * @swagger
 * /confirmar/{token}:
 *   get:
 *     summary: Confirmar cuenta de correo electrónico
 *     description: Confirmar la cuenta de correo electrónico utilizando un token.
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token de confirmación de cuenta
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cuenta de correo electrónico confirmada exitosamente.
 */
router.get('/confirmar/:token', confirmEmail);

/**
 * @swagger
 * /veterinarios:
 *   get:
 *     summary: Obtener lista de veterinarios
 *     description: Obtener una lista de todos los veterinarios registrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de veterinarios obtenida exitosamente.
 *       '401':
 *         description: Acceso no autorizado.
 */
router.get('/veterinarios', verificarAutenticacion, listarVeterinarios);

/**
 * @swagger
 * /recuperar-password:
 *   post:
 *     summary: Enviar correo electrónico de recuperación de contraseña
 *     description: Enviar un correo electrónico de recuperación de contraseña al veterinario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecuperarPasswordInput'
 *     responses:
 *       '200':
 *         description: Correo electrónico de recuperación de contraseña enviado exitosamente.
 */
router.post('/recuperar-password', recuperarPassword);

/**
 * @swagger
 * /recuperar-password/{token}:
 *   get:
 *     summary: Verificar token de recuperación de contraseña
 *     description: Verificar si el token de recuperación de contraseña es válido.
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token de recuperación de contraseña
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Token de recuperación de contraseña verificado exitosamente.
 *       '400':
 *         description: Token inválido.
 */

router.get('/recuperar-password/:token', comprobarTokenPassword);

/**
 * @swagger
 * /nuevo-password/{token}:
 *   post:
 *     summary: Establecer nueva contraseña
 *     description: Establecer una nueva contraseña para el veterinario.
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token de recuperación de contraseña
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoPasswordInput'
 *     responses:
 *       '200':
 *         description: Nueva contraseña establecida exitosamente.
 *       '400':
 *         description: Datos inválidos o token inválido.
 */
router.post('/nuevo-password/:token', nuevoPassword);

/**
 * @swagger
 * /perfil:
 *   get:
 *     summary: Obtener perfil del veterinario
 *     description: Obtener el perfil del veterinario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil del veterinario obtenido exitosamente.
 *       '401':
 *         description: Acceso no autorizado.
 *   put:
 *     summary: Actualizar perfil del veterinario
 *     description: Actualizar el perfil del veterinario autenticado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarPerfilInput'
 *     responses:
 *       '200':
 *         description: Perfil del veterinario actualizado exitosamente.
 *       '400':
 *         description: Datos inválidos.
 *       '401':
 *         description: Acceso no autorizado.
 */
router.route('/perfil')
    .get(verificarAutenticacion, perfil)
    .put(verificarAutenticacion, actualizarPerfil);

/**
 * @swagger
 * /veterinario/{id}:
 *   get:
 *     summary: Obtener detalles de un veterinario
 *     description: Obtener los detalles de un veterinario por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del veterinario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalles del veterinario obtenidos exitosamente.
 *       '400':
 *         description: ID inválido.
 *       '401':
 *         description: Acceso no autorizado.
 *       '404':
 *         description: Veterinario no encontrado.
 *   put:
 *     summary: Actualizar perfil de un veterinario
 *     description: Actualizar el perfil de un veterinario por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del veterinario
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarPerfilInput'
 *     responses:
 *       '200':
 *         description: Perfil del veterinario actualizado exitosamente.
 *       '400':
 *         description: Datos inválidos o ID inválido.
 *       '401':
 *         description: Acceso no autorizado.
 *       '404':
 *         description: Veterinario no encontrado.
 */
router.route('/veterinario/:id')
    .get(verificarAutenticacion, detalleVeterinario)
    .put(verificarAutenticacion, actualizarPerfil);

// Exportar el enrutador
export default router;
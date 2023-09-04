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
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *      - Veterinarios
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
 *         content:
 *           application/json:
 *             example:
 *               message: Inicio de sesión exitoso
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Campos incompletos o credenciales incorrectas
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o credenciales incorrectas
 */
router.post("/login", login);

/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Registrar nuevo veterinario
 *     tags:
 *      - Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeterinarioInput'
 *     responses:
 *       '200':
 *         description: Veterinario registrado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Veterinario registrado exitosamente
 *       '400':
 *         description: Campos incompletos o email ya registrado
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o email ya registrado
 */
router.post("/registro", registro);

/**
 * @swagger
 * /confirmar/{token}:
 *   get:
 *     summary: Confirmar correo electrónico
 *     tags:
 *      - Veterinarios
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Correo electrónico confirmado, ya puedes iniciar sesión
 *         content:
 *           application/json:
 *             example:
 *               message: Correo electrónico confirmado, ya puedes iniciar sesión
 *       '404':
 *         description: Token inválido
 *         content:
 *           application/json:
 *             example:
 *               message: Token inválido
 */
router.get("/confirmar/:token", confirmEmail);


/**
 * @swagger
 * /veterinarios:
 *   get:
 *     summary: Obtener lista de veterinarios
 *     tags:
 *      - Veterinarios
 *     responses:
 *       '200':
 *         description: Lista de veterinarios obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nombre: Veterinario 1
 *               - id: 2
 *                 nombre: Veterinario 2
 */
router.get("/veterinarios", listarVeterinarios);
/**
 * @swagger
 * /recuperar-password:
 *   post:
 *     summary: Iniciar proceso de recuperación de contraseña
 *     tags:
 *      - Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Proceso de recuperación de contraseña iniciado
 *         content:
 *           application/json:
 *             example:
 *               message: Proceso de recuperación de contraseña iniciado. Por favor, verifica tu correo electrónico para continuar.
 *       '400':
 *         description: Campos incompletos o email no registrado
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o el correo electrónico no está registrado.
 */
router.post("/recuperar-password", recuperarPassword);
/**
 * @swagger
 * /recuperar-password/{token}:
 *   get:
 *     summary: Comprobar token de recuperación de contraseña
 *     tags:
 *      - Veterinarios
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Token de recuperación de contraseña confirmado
 *         content:
 *           application/json:
 *             example:
 *               message: Token de recuperación de contraseña confirmado. Puedes establecer una nueva contraseña.
 *       '404':
 *         description: Token no válido
 *         content:
 *           application/json:
 *             example:
 *               message: Token de recuperación de contraseña no válido o expirado.
 */
router.get("/recuperar-password/:token", comprobarTokenPassword);

/**
 * @swagger
 * /nuevo-password/{token}:
 *   post:
 *     summary: Establecer nuevo password después de recuperación
 *     tags:
 *      - Veterinarios
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
 *         content:
 *           application/json:
 *             example:
 *               message: Contraseña actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.
 *       '400':
 *         description: Campos incompletos o las contraseñas no coinciden
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o las contraseñas no coinciden.
 *       '404':
 *         description: Token no válido
 *         content:
 *           application/json:
 *             example:
 *               message: Token de recuperación de contraseña no válido o expirado.
 */
router.post("/nuevo-password/:token", nuevoPassword);
/**
 * @swagger
 * /perfil:
 *   get:
 *     summary: Obtener perfil del veterinario autenticado
 *     tags:
 *      - Veterinarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil del veterinario obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nombre: Veterinario 1
 *               email: veterinario1@example.com
 *       '401':
 *         description: No autorizado, se requiere autenticación
 *         content:
 *           application/json:
 *             example:
 *               message: No autorizado, se requiere autenticación.
 */
router.get('/perfil', verificarAutenticacion, perfil);

/**
 * @swagger
 * /veterinario/actualizarpassword:
 *   put:
 *     summary: Actualizar password del veterinario autenticado
 *     tags:
 *      - Veterinarios
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
 *         content:
 *           application/json:
 *             example:
 *               message: Password actualizado exitosamente
 *       '400':
 *         description: Campos incompletos o password actual incorrecto
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o password actual incorrecto
 *       '401':
 *         description: No autorizado, se requiere autenticación
 *         content:
 *           application/json:
 *             example:
 *               message: No autorizado, se requiere autenticación
 *       '404':
 *         description: Veterinario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Veterinario no encontrado
 */
router.put('/veterinario/actualizarpassword', verificarAutenticacion, actualizarPassword);
/**
 * @swagger
 * /veterinario/{id}:
 *   get:
 *     summary: Obtener detalles de un veterinario por ID
 *     tags:
 *      - Veterinarios
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
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nombre: Veterinario 1
 *               email: veterinario1@example.com
 *       '401':
 *         description: No autorizado, se requiere autenticación
 *         content:
 *           application/json:
 *             example:
 *               message: No autorizado, se requiere autenticación
 *       '404':
 *         description: Veterinario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Veterinario no encontrado
 */
router.get('/veterinario/:id', verificarAutenticacion, detalleVeterinario);

/**
 * @swagger
 * /veterinario/{id}:
 *   put:
 *     summary: Actualizar perfil de un veterinario por ID
 *     tags:
 *      - Veterinarios
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
 *         content:
 *           application/json:
 *             example:
 *               message: Perfil del veterinario actualizado exitosamente
 *       '400':
 *         description: Campos incompletos o email ya registrado
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o email ya registrado
 *       '401':
 *         description: No autorizado, se requiere autenticación
 *         content:
 *           application/json:
 *             example:
 *               message: No autorizado, se requiere autenticación
 *       '404':
 *         description: Veterinario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               message: Veterinario no encontrado
 */
router.put('/veterinario/:id', verificarAutenticacion, actualizarPerfil);


// Exportación
export default router;

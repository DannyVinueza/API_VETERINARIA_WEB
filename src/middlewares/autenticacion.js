// Importacion de JWT
import jwt from 'jsonwebtoken'
// Importar el modelo
import Veterinario from '../models/Veterinario.js'

// Definir la funcion para validar el JWT
const verificarAutenticacion = async (req, res, next) => {
    // Validacion del JWT Obteniendo infrmacion del req.body, req.params, req.headers.authorization
    if (!req.headers.authorization) return res.status(404).json({ msg: "Lo sentimos, debes proprocionar un token" })
    // Obtener el JWT (bearer )
    const { authorization } = req.headers

    try {
        // Obtener solo el token ()     y verificar solo el token y verificar el mismo
        const { id } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        // Obtener el usuario en base al ID
        req.veterinarioBDD = await Veterinario.findById(id).lean().select("-password")
        // next
        next()
    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({ msg: e.message })
    }
}
// Exportar el modelo
export default verificarAutenticacion



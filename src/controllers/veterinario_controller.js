// Importar el modelo veterinario
import Veterinario from "../models/Veterinario.js"
import sendMailToUser from "../config/nodemailer.js"

const login =(req,res)=>{
    res.status(200).json({res:'Login del veterinario'})
}
const perfil= async (req,res)=>{
    
}

const registro = async(req,res)=>{
    // Capturar los datos del body de la petición
    const {email,password} = req.body
    // Validación de los campos vacíos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    //Verificar la existencia del mail Validacione
    const verificarEmailBDD = await Veterinario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    // Crear la instancia del modelo
    const nuevoVeterinario = new Veterinario(req.body)
    // Encrytar el password del usuario
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)
    // Crear el toke para el usuario
    const token = nuevoVeterinario.crearToken()
    // Envia el email
    await sendMailToUser(email,token)
    // Guardar en BD
    await nuevoVeterinario.save()
    //Enviar la respuesta
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}
const confirmEmail = (req,res)=>{
    res.status(200).json({res:'Confirmar email de registro de veterinario'})
}
const listarVeterinarios = (req,res)=>{
    res.status(200).json({res:'Lista de veterinarios registrados'})
}
const detalleVeterinario = (req,res)=>{
    res.status(200).json({res:'Detalle de un veterinario registrado'})
}
const actualizarPerfil = (req,res)=>{
    res.status(200).json({res:'Actualizar perfil de un veterinario registrado'})
}
const actualizarPassword = (req,res)=>{
    res.status(200).json({res:'Actualizar password de un veterinario registrado'})
}
const recuperarPassword= (req,res)=>{
    res.status(200).json({res:'Enviar mail recuperación'})
}
const comprobarTokenPasword= (req,res)=>{
    res.status(200).json({res:'Verificar token mail'})
}
const nuevoPassword= (req,res)=>{
    res.status(200).json({res:'Crear nuevo password'})
}

// Exportacion nombrada porque tengo varios metodos
export {
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    comprobarTokenPasword,
	nuevoPassword
}
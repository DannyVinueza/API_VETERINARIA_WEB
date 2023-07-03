// Importar el modelo veterinario
import Veterinario from "../models/Veterinario.js"
import sendMailToUser from "../config/nodemailer.js"

const login = async (req,res)=>{
    // Capturar datos del request
    const {email,password} = req.body
    // Validacion de campos vacios
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    // Obtener el usuario en base al email
    const veterinarioBDD = await Veterinario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    console.log(veterinarioBDD)
    // Validacion de la cuenta del email
    if(veterinarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    // Validar si existe el usuario
    if(!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    // Validar si el password del request es el mismo de la BD
    const verificarPassword = await veterinarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    // Desestructurar la info del usuario
    const {nombre,apellido,direccion,telefono,_id} = veterinarioBDD
    // Presentar datos
    res.status(200).json({
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:veterinarioBDD.email
    })
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
const confirmEmail = async (req,res)=>{
    // Validar el token del correo
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    // Verificar di en base al token existe ese usuario
    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})
    //Validar si el token ya fue seteado a null 
    if(!veterinarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    // Setear a null el token
    veterinarioBDD.token = null
    // Cambiar a true la confirmacion de la cuenta
    veterinarioBDD.confirmEmail=true
    // Guardar cambios en BD
    await veterinarioBDD.save()
    // Presentar mensajes al usuario
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
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
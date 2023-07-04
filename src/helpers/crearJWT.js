//Importacion JWT
import jwt from "jsonwebtoken";

// Definir la funcion para generar el token
const generarJWT = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

// Exportacion por default de la funcion
export default  generarJWT
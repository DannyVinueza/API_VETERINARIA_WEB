// Importsr nodmailer 
import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

// Creación del transporter
const transport = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})

// send mail with defined transport object
const sendMailToUser = async(userMail,token)=>{
    let info = await transport.sendMail({
    from: 'admin@vet.com',
    to: userMail,
    subject: "Verifica tu cuenta de correo electrónico",
    html: `
    <h1>Sistema de gestión (VET-ESFOT 🐶 😺)</h1>
    <hr>
    <a href="https://veterinary-managment.onrender.com/api/confirmar/${token}">Clic para confirmar tu cuenta</a>
    <hr>
    <footer>Grandote te da la Bienvenida!</footer>
    `
    });
}

// send mail with defined transport object
const sendMailToRecoveryPassword = async(userMail,token)=>{
    let info = await transport.sendMail({
    from: 'admin@vet.com',
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1>Sistema de gestión (VET-ESFOT 🐶 😺)</h1>
    <hr>
    <a href="https://medpaws-veterinary.netlify.app/#/recuperar-password/${token}">Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Grandote te da la Bienvenida!</footer>
    `
    });
}

//Exportar la función
export {
    sendMailToUser,
    sendMailToRecoveryPassword
}
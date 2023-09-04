import mongoose from 'mongoose';
import Paciente from "../models/Paciente.js"; // Asegúrate de que la ruta sea correcta
import {
    listarPacientes,
} from "../controllers/paciente_controller.js";

// Configuración de Jest
beforeAll(async () => {
    await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Controlador de Pacientes', () => {
    it('Debería listar pacientes correctamente', async () => {
        // Crear un paciente de prueba en la base de datos
        const nuevoPaciente = new Paciente({
            nombre: 'Paciente de prueba',
            propietario: 'Propietario de prueba',
            email: 'correo@example.com',
            celular: '123456789',
            convencional: '987654321',
            ingreso: new Date(),
            sintomas: 'Síntomas de prueba',
            veterinario: new mongoose.Types.ObjectId(),
            estado: true,
        });
        await nuevoPaciente.save();

        const req = {
            veterinarianBDD: nuevoPaciente.veterinario, // Simula la variable de veterinarioBDD en la solicitud
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await listarPacientes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();

        // Limpia la base de datos después de la prueba
        await Paciente.findByIdAndDelete(nuevoPaciente._id);
    });

    it('Debería obtener el detalle de un paciente', async () => {
        // Agregar código de prueba aquí
    });

    it('Debería registrar un nuevo paciente', async () => {
        // Agregar código de prueba aquí
    });

    it('Debería actualizar los datos de un paciente', async () => {
        // Agregar código de prueba aquí
    });

    it('Debería eliminar un paciente', async () => {
        // Agregar código de prueba aquí
    });
});




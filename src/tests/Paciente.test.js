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
        // Datos de paciente de prueba
        const datosPacientePrueba = {
            nombre: "Nombre del Paciente",
            propietario: "Nombre del Propietario",
            email: "correo@ejemplo.com",
            celular: "1234567890",
            convencional: "9876543210",
            ingreso: new Date(),
            sintomas: "Síntomas del paciente de prueba",
            estado: true,
        };

        // Configuración del mock de Paciente para devolver los datos de prueba
        const mockPaciente = {
            find: jest.fn(() => [
                {
                    _id: "ID_GENERADO_POR_MONGODB",
                    nombre: "Nombre del Paciente",
                    propietario: "Nombre del Propietario",
                    email: "correo@ejemplo.com",
                    celular: "1234567890",
                    convencional: "9876543210",
                    ingreso: new Date(),
                    estado: true,
                },
            ]),
        };

        // Sobrescribe la implementación de Paciente con el mock
        jest.spyOn(Paciente, 'find').mockImplementation(mockPaciente.find);

        // Mock de la solicitud y respuesta de Express
        const mockReq = {
            veterinarioBDD: { _id: "64f54d16ae4e67a1924abe87" }, // Reemplaza con el ID correcto
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Llamar a la función listarPacientes
        await listarPacientes(mockReq, mockRes);

        // Verificar que la función de búsqueda se haya llamado con los parámetros correctos
        expect(Paciente.find).toHaveBeenCalledWith({
            estado: true,
            veterinario: mockReq.veterinarioBDD._id,
        });

        // Verificar que se haya respondido con los pacientes
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith([
            {
                _id: "ID_GENERADO_POR_MONGODB",
                nombre: "Nombre del Paciente",
                propietario: "Nombre del Propietario",
                email: "correo@ejemplo.com",
                celular: "1234567890",
                convencional: "9876543210",
                ingreso: expect.any(Date),
                estado: true,
            },
        ]);
    });

    // Resto de las pruebas...


    // Resto de las pruebas...
    // it('Debería obtener el detalle de un paciente', async () => {
//     // Agregar código de prueba aquí
// });

// it('Debería registrar un nuevo paciente', async () => {
//     // Agregar código de prueba aquí
// });

// it('Debería actualizar los datos de un paciente', async () => {
//     // Agregar código de prueba aquí
// });

// it('Debería eliminar un paciente', async () => {
//     // Agregar código de prueba aquí
// });
// });

});



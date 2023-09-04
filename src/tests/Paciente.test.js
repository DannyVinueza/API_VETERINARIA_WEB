import mongoose from 'mongoose';
import Paciente from "../models/Paciente.js"
import Veterinario from "../models/Veterinario.js"
import {
    actualizarPaciente,
    detallePaciente,
    eliminarPaciente,
    listarPacientes,
    registrarPaciente,
  } from "../controllers/paciente_controller.js";
  
// Configuración de Jest
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Controlador de Pacientes', () => {
  it('Debería listar pacientes correctamente', async () => {
    // Agregar código de prueba aquí
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

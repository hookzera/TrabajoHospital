import { Router } from 'express';
import multer from 'multer';

import { getRepository } from 'typeorm';
import PacienteFrontController from '../app/controllers/PacienteFrontController';
import Pacientes from '../app/models/PacientesFront';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const pacienteFrontRouter = Router();

pacienteFrontRouter.post('/', upload.single('foto'), async (request, response) => {
  try {
    const { nome, cidade, cpf, email, telefone } = request.body;
    const foto = request.file.filename;

    const pacienteController = new PacienteFrontController();
    const paciente = await pacienteController.store({
      nome, 
      cidade, 
      cpf, 
      email, 
      telefone,
      foto,
    });

    return response.json(paciente);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

pacienteFrontRouter.get('/', async (request, response) => {
  const pacienteController = getRepository(Pacientes);
  const paciente = await pacienteController.find();
  return response.json(paciente);
});

pacienteFrontRouter.get('/:id', async (request, response) => {
  try {
    const pacienteController = getRepository(Pacientes);
    const { id } = request.params;
    const paciente = await pacienteController.findOne(id);

    return response.json(paciente);
  } catch (erro) {
    return response.json('Paciente não encontrado.');
  }
});

pacienteFrontRouter.delete('/:id', async (request, response) => {
  try {
    const pacienteController = getRepository(Pacientes);
    const { id } = request.params;

    await pacienteController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Paciente não encontrado.');
  }
});

pacienteFrontRouter.patch(
  '/:id',
  upload.single('foto'),
  async (request, response) => {
    try {
      const id = request.params;
      const { nome, email, telefone } = request.body;
      const foto = request.file.filename;

      const pacienteController = new PacienteFrontController();
      const paciente = await pacienteController.update({
        id,
        nome,
        email,
        telefone,
        foto,
      });

      return response.json(paciente);
    } catch (erro) {
      return response.json({ error: erro.message });
    }
  },
);

export default pacienteFrontRouter;

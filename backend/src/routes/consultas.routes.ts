import { Router } from 'express';

import { getRepository } from 'typeorm';
import ConsultasController from '../app/controllers/ConsultasController';
import Agendamentos from '../app/models/Agendamentos';
import Medicos from '../app/models/Medicos';
import Pacientes from '../app/models/Pacientes';

const consultasRouter = Router();

consultasRouter.post('/', async (request, response) => {
  try {
    const { id_medico, id_paciente, data, hora } = request.body;

    const consultasController = new ConsultasController();
    const consultas = await consultasController.store({
      id_medico,
      id_paciente,
      data,
      hora,
    });

    return response.json(consultas);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});


consultasRouter.get('/', async (request, response) => {
  const consultasController = getRepository(Agendamentos);
  const medicosController = getRepository(Medicos);
  const pacientesController = getRepository(Pacientes);

  let ConsultasAll = []
  const consultas = await consultasController.find();
  console.log(consultas)
  if(consultas.length !== 0){
    for (let i in consultas) {
      const medico = await medicosController.findOne({
        where:{id:consultas[i].id_medico}
      });
      const paciente = await pacientesController.findOne({
        where:{id:consultas[i].id_paciente}
      });
   
      if (medico && paciente) {
      let consultasComplete = {
        idConsulta: consultas[i].id,
        nomePaciente: paciente.nome,
        telefonePaciente: paciente.telefone,
        FotoPaciente: paciente.foto,
        NomeDoMedico: medico.nome,
        Especialidade: medico.especialidade,
        Data: consultas[i].data,
        Hora: consultas[i].hora,
        } 
  
        ConsultasAll.push(consultasComplete)
      }
  
      
     
    }
    return response.json(ConsultasAll);
  }
  return response.json([]);
}); 
consultasRouter.get('/:id', async (request, response) => {
  try {
    const consultasController = getRepository(Agendamentos);
    const medicoController = getRepository(Medicos);
    const pacienteController = getRepository(Pacientes);
    const { id } = request.params;
    const consultas = await consultasController.findOne(id);

    let detalhes = {}

    if (consultas === undefined) {
      return response.json('Agendamentos não encontrado.');
    }

      const medico = await medicoController.findOne({where: {id: consultas.id_medico}});

      const pacientes = await pacienteController.findOne({where: {id: consultas.id_paciente}});
    

    if (consultas && medico && pacientes) {
      detalhes = {
        idConsulta: consultas.id,
        nomePaciente: pacientes.nome,
        telefonePaciente: pacientes.telefone,
        FotoPaciente: pacientes.foto,
        NomeDoMedico: medico.nome,
        especialidade: medico.especialidade,
        Data: consultas.data,
        Hora: consultas.hora,
      };
  }

    return response.json(detalhes);
  } catch (erro) {
    return response.json('Agendamentos não encontrado.');
  }
});

consultasRouter.delete('/:id', async (request, response) => {
  try {
    const consultasController = getRepository(Agendamentos);
    const { id } = request.params;

    await consultasController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Agendamento não encontrado.');
  }
});

consultasRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params;
    const { id_medico, id_paciente, data, hora } = request.body;

    const consultasController = new ConsultasController();
    const medicos = await consultasController.update({
      id,
      id_medico,
      id_paciente,
      data,
      hora,
    });

    return response.json(medicos);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

export default consultasRouter;

import { getRepository } from 'typeorm';

import Agendamentos from '../models/Agendamentos';
import Medicos from '../models/Medicos';
import Pacientes from '../models/Pacientes';

interface Alterar {
  id: string;
  id_medico?: string;
  id_paciente?: string;
  data?: string;
  hora?: string;
}

interface Request {
  id_medico: string;
  id_paciente: string;
  data: string;
  hora: string;
}

class ConsultasController {
  public async store({
    id_medico,
    id_paciente,
    data,
    hora,
  }: Request): Promise<Agendamentos> {
    const ConsultasController = getRepository(Agendamentos);
    const MedicosRepository = getRepository(Medicos);
    const PacienteRepository = getRepository(Pacientes);

    const checkMedico = await MedicosRepository.findOne(id_medico);
    const checkPaciente = await PacienteRepository.findOne(id_paciente);

    if (!checkMedico) {
      throw new Error('Medico Invalido');
    }

    if (!checkPaciente) {
      throw new Error('Paciente Invalido');
    }

    const agendamentos = ConsultasController.create({
      id_medico,
      id_paciente,
      data,
      hora,
    });

    await ConsultasController.save(agendamentos);
    return agendamentos;
  }

  public async update({
    id,
    id_medico,
    id_paciente,
    data,
    hora,
  }: Alterar): Promise<Agendamentos> {
    const ConsultasController = getRepository(Agendamentos);

    const agendamentos = await ConsultasController.findOne(id);

    if (!agendamentos) {
      throw new Error('Agendamento não encontrado');
    }

    if (id_medico) {
      agendamentos.id_medico = id_medico;
    }

    if (id_paciente) {
      agendamentos.id_paciente = id_paciente;
    }

    if (data) {
      agendamentos.data = data;
    }

    if (hora) {
      agendamentos.hora = hora;
    }

    await ConsultasController.save(agendamentos);
    return agendamentos;
  }
}

export default ConsultasController;

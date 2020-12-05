import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Medicos from './Medicos';
import Pacientes from './Pacientes';

@Entity('agendamentos')
class Agendamentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_medico: string;

  @ManyToOne(() => Medicos)
  @JoinColumn({ name: 'id_medico' })
  medico_id: Medicos;

  @Column()
  id_paciente: string;

  @ManyToOne(() => Pacientes)
  @JoinColumn({ name: 'id_paciente' })
  paciente_id: Pacientes;

  @Column()
  data: string;

  @Column()
  hora: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Agendamentos;

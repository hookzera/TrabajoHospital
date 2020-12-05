import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { Menu, Pacientes, Proxima } from './styles';

interface Paciente {
  id: string;
  nome: string;
  telefone: string;
  foto: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  const [ pacientes, setPacientes] = useState<Paciente[]>()

  useEffect(() => {
    api.get('/paciente-front').then(response => {
      setPacientes(response.data);
    });
  })

  return (
    <>
      <h1>Todos os pacientes</h1>
      <Menu>
        <Pacientes>
          {
            pacientes !== undefined ? (
              pacientes.map(paciente => {
                return (
                  <article key={paciente.id}>
                    <span>{paciente.nome}</span>
                    <span>{paciente.telefone}</span>
                    <div>
                      <button type="button" onClick={() => {
                        api.delete(`/paciente-front/${paciente.id}`);
                      }}>Deletar</button>
                      <button type="button" onClick={() => {
                        history.push(`/pacientes/${paciente.id}`)
                      }}>Detalhes</button>
                    </div>
                  </article>
                );
              })
            ) : (
              'Aguardando o cadastro de um paciente.'
            )
          }
        </Pacientes>
      </Menu>

      <Proxima>
        <Link to="/criar">Cadastrar paciente</Link>
      </Proxima>
    </>
  );
};

export default Home;

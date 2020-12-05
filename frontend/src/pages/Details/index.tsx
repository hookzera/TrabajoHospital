import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../services/api';

import { DetailsContainer } from './styles';

interface Params {
  id: string;
}

interface Paciente {
  id: string;
  nome: string;
  cidade: string;
  cpf: string;
  telefone: string;
  foto: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<Params>();
  const [paciente, setPaciente] = useState<Paciente>();

  useEffect(() => {
    api.get(`/paciente-front/${params.id}`).then((response) => {
      setPaciente(response.data);
    });
  }, [params.id]);


  return (
    <DetailsContainer>
      <h1>Nome: {paciente?.nome}</h1>
      <img
        src={`http://localhost:3333/uploads/${paciente?.foto}`}
        alt="Foto de Rick Sanchez"
      />

      <section>
        <p>Cidade: {paciente?.cidade}</p>
        <p>CPF: {paciente?.cpf}</p>
        <p>Telefone: {paciente?.telefone}</p>
      </section>

      <Link to="/"></Link>
    </DetailsContainer>
  );
};

export default Details;

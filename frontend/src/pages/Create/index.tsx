import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import { DetailsContainer } from './styles';

const Create: React.FC = () => {
  const history = useHistory();

  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState<File>();

  const enviarFoto = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];

      setFoto(selectedImage);
    }
  }, []);

  async function enviarForm(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('nome', nome);
    data.append('cidade', cidade);
    data.append('cpf', cpf);
    data.append('email', email);
    data.append('telefone', telefone);

    if (foto) {
      data.append('foto', foto);
    }

    await api.post('paciente-front', data);

    history.push('/');
  }

  return (
    <DetailsContainer>
      <section>
        <form onSubmit={enviarForm}>
                <fieldset>
                  <div>
                    <label htmlFor="Nome">Nome:</label>
                    <input
                      id="nome"
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="cidade">Cidade:</label>
                    <input
                      id="cidade"
                      value={cidade}
                      onChange={(event) => setCidade(event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone">
                      <label htmlFor="telefone">Telefone:</label>
                    </label>
                    <input
                      id="telefone"
                      value={telefone}
                      onChange={(event) => setTelefone(event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="cpf">CPF:</label>
                    <input
                      id="cpf"
                      value={cpf}
                      onChange={(event) => setCPF(event.target.value)}
                    />
                  </div>

                  <label htmlFor="foto">Foto:</label>
                    <input
                      type="file"
                      id="foto"
                      name="foto"
                      onChange={enviarFoto}
                    />

                  <button type="submit">Realizar cadastrar</button>
                </fieldset>
              </form>
      </section>
    </DetailsContainer>
  );
};

export default Create;

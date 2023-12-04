import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buscarMensagens } from '../redux/MensagemReducer.js';

const MensagemLista = () => {
  const dispatch = useDispatch();
  const { mensagens } = useSelector((state) => state.mensagem);

  useEffect(() => {
    // Buscar mensagens ao montar o componente
    dispatch(buscarMensagens());
  }, [dispatch]);

  return (
    <div>
      <h2>Lista de Mensagens</h2>
      <ul>
        {mensagens.map((mensagem) => (
          <li key={mensagem.id}>{mensagem.texto}</li>
        ))}
      </ul>
    </div>
  );
};

export default MensagemLista;
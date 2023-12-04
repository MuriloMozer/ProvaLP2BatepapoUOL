import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { enviarMensagem } from '../redux/MensagemReducer.js';

const MensagemEnvio = () => {
  const dispatch = useDispatch();
  const [novaMensagem, setNovaMensagem] = useState('');

  const handleEnvio = () => {
    // Enviar mensagem ao Redux
    dispatch(enviarMensagem({ texto: novaMensagem }));
    setNovaMensagem(''); // Limpar o campo após o envio
  };

  return (
    <div>
      <h2>Envio de Mensagens</h2>
      <textarea
        value={novaMensagem}
        onChange={(e) => setNovaMensagem(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={handleEnvio}>Enviar</button>
    </div>
  );
};

export default MensagemEnvio;
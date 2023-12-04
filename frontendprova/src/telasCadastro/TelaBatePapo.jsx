import React from 'react';
import MensagemLista from '../componentes/MensagemLista';
import MensagemEnvio from '../componentes/MensagemEnvio';

export default function TelaBatePapo(props) {
  return (
    <div>
      <MensagemLista />
      <MensagemEnvio />
    </div>
  );
};
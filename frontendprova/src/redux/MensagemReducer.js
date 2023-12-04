import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ESTADO from '../recursos/estado';

const urlBase = 'http://localhost:4000/mensagens';

export const buscarMensagens = createAsyncThunk('mensagem/buscarMensagens', async () => {
  try {
    const resposta = await fetch(urlBase, { method: 'GET' });
    const dados = await resposta.json();
    if (dados.status) {
      return {
        status: true,
        mensagens: dados.mensagens,
        mensagem: '',
      };
    } else {
      return {
        status: false,
        mensagens: [],
        mensagem: 'Ocorreu um erro ao recuperar as mensagens da base de dados.',
      };
    }
  } catch (erro) {
    return {
      status: false,
      mensagens: [],
      mensagem: 'Ocorreu um erro ao recuperar as mensagens da base de dados:' + erro.message,
    };
  }
});

export const enviarMensagem = createAsyncThunk('mensagem/enviarMensagem', async (mensagem) => {
  const resposta = await fetch(urlBase, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mensagem),
  }).catch((erro) => {
    return {
      status: false,
      mensagem: 'Ocorreu um erro ao enviar a mensagem:' + erro.message,
    };
  });

  if (resposta.ok) {
    const dados = await resposta.json();
    return {
      status: dados.status,
      mensagem: dados.mensagem,
      novaMensagem: mensagem,
    };
  } else {
    return {
      status: false,
      mensagem: 'Ocorreu um erro ao enviar a mensagem.',
      novaMensagem: mensagem,
    };
  }
});

export const marcarMensagemComoLida = createAsyncThunk('mensagens/marcarComoLida', async (mensagemId) => {
    const resposta = await fetch(`http://localhost:4000/mensagens/${mensagemId}/marcarComoLida`, {
        method: 'PUT',
    });

    const dados = await resposta.json();

    if (dados.status) {
        return mensagemId;
    } else {
        throw new Error('Erro ao marcar a mensagem como lida.');
    }
});

const initialState = {
  estado: ESTADO.OCIOSO,
  mensagem: '',
  mensagens: [],
};

const mensagemSlice = createSlice({
  name: 'mensagem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buscarMensagens.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = 'Buscando mensagens...';
      })
      .addCase(buscarMensagens.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.estado = ESTADO.OCIOSO;
          state.mensagem = action.payload.mensagem;
          state.mensagens = action.payload.mensagens;
        } else {
          state.estado = ESTADO.ERRO;
          state.mensagem = action.payload.mensagem;
        }
      })
      .addCase(buscarMensagens.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.error.message;
      })
      .addCase(enviarMensagem.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.mensagem = action.payload.mensagem;
        state.mensagens.push(action.payload.novaMensagem);
      })
      .addCase(enviarMensagem.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = 'Enviando mensagem...';
      })
      .addCase(enviarMensagem.rejected, (state, action) => {
        state.mensagem = 'Erro ao enviar a mensagem: ' + action.error.message;
        state.estado = ESTADO.ERRO;
      })
      .addCase(marcarMensagemComoLida.fulfilled, (state, action) => {
        const mensagemId = action.payload;
        const mensagem = state.mensagens.find(mensagem => mensagem.id === mensagemId);
        if (mensagem) {
            mensagem.lida = true;
        }
    });
  },
});

export default mensagemSlice.reducer;
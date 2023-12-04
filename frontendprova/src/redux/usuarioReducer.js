import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ESTADO from '../recursos/estado';
const urlBase = 'http://localhost:4000/usuario';
export const buscarUsuarios = createAsyncThunk('usuario/buscarUsuarios', async () => {
  try { 
      const resposta = await fetch(urlBase, { method: 'GET' });
      const dados = await resposta.json();
      if (dados.status) {
          return {
              status: true,
              listaUsuarios: dados.listaUsuarios,
              mensagem: ''
          }
      }
      else {
          return {
              status: false,
              listaUsuarios: [],
              mensagem: 'Ocorreu um erro ao recuperar os usuários da base de dados.'
          }
      }
  } catch (erro) {
      return {
          status: false,
          listaUsuarios: [],
          mensagem: 'Ocorreu um erro ao recuperar os usuários da base de dados:' + erro.message
      }
  }
});

export const adicionarUsuario = createAsyncThunk('usuario/adicionar', async (usuario) => {
  const resposta = await fetch(urlBase, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  }).catch((erro) => {
    return {
      status: false,
      mensagem: 'Ocorreu um erro ao adicionar o usuário:' + erro.message,
    };
  });

  if (resposta.ok) {
    const dados = await resposta.json();
    return {
      status: dados.status,
      mensagem: dados.mensagem,
      usuario,
    };
  } else {
    return {
      status: false,
      mensagem: 'Ocorreu um erro ao adicionar o usuário.',
      usuario,
    };
  }
});

export const atualizarUsuario = createAsyncThunk('usuario/atualizar', async (usuario) => {
  try {
    const resposta = await fetch(urlBase, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      return {
        status: dados.status,
        mensagem: dados.mensagem,
        usuario
      };
    } else {
      return {
        status: false,
        mensagem: 'Ocorreu um erro ao atualizar o usuário.'
      };
    }
  } catch (erro) {
    return {
      status: false,
      mensagem: 'Ocorreu um erro ao atualizar o usuário: ' + erro.message
    };
  }
});

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState:{
    estado: ESTADO.OCIOSO,
    mensagem: '',
    listaUsuarios: [],
  },
  reducers: {
    adicionar:(state, action)=>{
      state.listaUsuarios.push(action.payload);
  },
  atualizar:(state,action)=>{
      const listaTemporariaUsuarios = state.listaUsuarios.filter(usuario => usuario.nome !== action.payload.nome);
      state.listaUsuarios = [...listaTemporariaUsuarios, action.payload.usuario];
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adicionarUsuario.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.mensagem = action.payload.mensagem;
        state.usuarios.push(action.payload.usuario);
      })
      .addCase(adicionarUsuario.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = 'Adicionando usuário...';
      })
      .addCase(adicionarUsuario.rejected, (state, action) => {
        state.mensagem = 'Erro ao adicionar o usuário: ' + action.error.message;
        state.estado = ESTADO.ERRO;
      })
      .addCase(buscarUsuarios.pending, (state, action) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = "Buscando usuários...";
    })
    .addCase(buscarUsuarios.fulfilled, (state, action) => {
        if (action.payload.status) {
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.usuarios = action.payload.listaUsuarios;
        } else {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
        }
    })
    .addCase(buscarUsuarios.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.error.message;
    });
}
});

export default usuarioSlice.reducer;
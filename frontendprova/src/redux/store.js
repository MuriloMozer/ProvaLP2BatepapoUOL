import {configureStore} from '@reduxjs/toolkit';
import usuarioSlice from './usuarioReducer';
import mensagemSlice from './MensagemReducer';

const store = configureStore({
    reducer:{
        usuario: usuarioSlice,
        mensagem: mensagemSlice
    }
});

export default store;
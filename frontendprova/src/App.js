import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Menu from './componentes/Menu.jsx';
import TelaCadastroUsuario from './telasCadastro/TelaCadastroUsuario.jsx';
import TelaBatePapo from './telasCadastro/TelaBatePapo.jsx';
import store from "./redux/store";
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Menu />
        <Routes>
              <Route path="/cadastro-usuarios" element={<TelaCadastroUsuario/>} />
              <Route path="/bate-papo" element={<TelaBatePapo/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
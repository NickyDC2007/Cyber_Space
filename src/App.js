import './App.css';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MenuInicial from './components/pages/MenuInicial/MenuInicial';
import AreaTrabalho from './components/pages/AreaTrabalho/AreaTrabalho';
import CenaFinal from './components/pages/CenaFinal/CenaFinal';

function App() {
  return (
    <Router>
      <Routes>

        {/* Menu Inicial */}
        <Route path='/' element={<MenuInicial></MenuInicial>}></Route>

        {/* Area Inicial */}
        <Route path='/jogar' element={<AreaTrabalho></AreaTrabalho>}></Route>

        {/* Cena Final */}
        <Route path='/final' element={<CenaFinal></CenaFinal>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
import './App.css';

import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";

import MenuInicial from './components/pages/MenuInicial/MenuInicial';
import AreaTrabalho from './components/pages/AreaTrabalho/AreaTrabalho';
import CenaFinal from './components/pages/CenaFinal/CenaFinal';

import Navbar from './components/layout/navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
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
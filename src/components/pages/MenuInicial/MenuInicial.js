/* 
  ================
  MENU INICIAL (Tela de Entrada)
  ================
*/

import { Link } from 'react-router-dom';
import styles from '../../../styles/MenuInicial.module.css';
import MatrixBackground from './MatrixBackground';

function MenuInicial() {
  return (
    <div className={styles['menu-inicial']}>
      {/* Fundo da Matrix */}
      <MatrixBackground />

      {/* Camada de scanline */}
      <div className={styles.scanline}></div>

      {/* Quadro principal do menu */}
      <div className={styles.menu}>
        <div className={styles.logo}>
          <h1>CYBER SPACE</h1>
        </div>

        <div className={styles['menu-btns']}>
          <Link to="/jogar" className={styles.btn}>
            JOGAR
          </Link>
          <Link to="/sair" className={`${styles.btn} ${styles.btnSair}`}>
            SAIR
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuInicial;
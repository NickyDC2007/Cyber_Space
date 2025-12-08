/* 
  ================
  Cena Final
  ================
*/

import { Link } from 'react-router-dom';
import styles from '../../../styles/MenuInicial.module.css';
import MatrixBackground from '../MenuInicial/MatrixBackground.jsx';

function CenaFinal() {
  return (
    <div className={styles['menu-inicial']}>
      {/* Fundo da Matrix */}
      <MatrixBackground />

      {/* Camada de scanline */}
      <div className={styles.scanline}></div>

      {/* Quadro principal do menu */}
      <div className={styles.menu}>
        <div className={styles.logo}>
          <h1>OBRIGADO POR JOGAR!</h1>
        </div>
      </div>
    </div>
  );
}

export default CenaFinal;
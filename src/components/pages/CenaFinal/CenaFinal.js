/* 
  ================
  Cena Final
  ================
*/

import styles from '../../../styles/CenaFinal.module.css';
import MatrixBackground from '../MenuInicial/MatrixBackground.jsx';

import qrcode from '../../../assets/QrCode.png';

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

        <div className={styles.qr}>
          <img src={qrcode} alt="Qr Code" className={styles.img}/>
        </div>
      </div>
    </div>
  );
}

export default CenaFinal;
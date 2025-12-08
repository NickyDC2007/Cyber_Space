import React from 'react';
import { Link } from 'react-router-dom'; // Assumindo o uso de react-router-dom
import styles from '../layout/Navbar.module.css'; // Ajuste o caminho conforme o seu arquivo
import logoutImg from '../../assets/Logout.png'; // Ajuste o caminho da imagem

const NavBar = () => {
  return (
    <div className={styles.footerBar}>

      {/* 2. BOTÃO LOGOUT */}
      <div className={styles.logoutmenu}>
        <Link to="/" className={styles.logout}>
          <img src={logoutImg} alt="Icone Logout" />
          Logout
        </Link>
      </div>

    </div>
  );
};

export default NavBar;
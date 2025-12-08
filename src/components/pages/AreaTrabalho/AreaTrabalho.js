/* 
  =================================================================
  ÁREA DE TRABALHO (Tela Principal) 
  ================================================================
*/

import { Link } from 'react-router-dom';
import React, { useState, useRef, useMemo } from 'react';
import styles from '../../../styles/AreaTrabalho.module.css';

import MiniJanela from './MiniJanela';

import ConteudoBiblioteca from '../ConteudoBiblioteca/ConteudoBiblioteca';
import ConteudoMissoes from '../ConteudoMissoes/ConteudoMissoes';

// Imports de imagens

import missoesFechadaImg from '../../../assets/Missoes-Fechada.png';
import missoesAbertaImg from '../../../assets/Missoes-Aberta.png';

import bibliotecaFechadaImg from '../../../assets/Biblioteca-Fechada.png';
import bibliotecaAbertaImg from '../../../assets/Biblioteca-Aberta.png';

import logoutImg from '../../../assets/Logout.png';

import wallpaperImg from '../../../assets/Wallpaper.png';

// --- Configuração das Janelas ---

const JANELAS = {
  missoes: {
    titulo: 'Console de Missões',
    posicaoInicial: { x: 90, y: 40 },
    iconeSrcFechado: missoesFechadaImg,
    iconeSrcAberto: missoesAbertaImg,
  },
  biblioteca: {
    titulo: 'Biblioteca Proibida',
    posicaoInicial: { x: 810, y: 40 },
    iconeSrcFechado: bibliotecaFechadaImg,
    iconeSrcAberto: bibliotecaAbertaImg,
  },
};

const AreaDeTrabalho = () => {
  // Gerencia o estado de todas as janelas (aberta/minimizada)
  const [estadoJanelas, setEstadoJanelas] = useState(
    Object.keys(JANELAS).reduce((acc, chave) => {
      acc[chave] = { estaAberta: false, estaMinimizada: false };
      return acc;
    }, {})
  );

  // Cria uma coleção de refs para os botões da TaskBar
  const taskBarRefs = useRef(
        Object.keys(JANELAS).reduce((acc, chave) => {
            // Cria uma ref para cada janela
            acc[chave] = React.createRef(); 
            return acc;
        }, {})
  ).current;

  // Muda o icone ao ficar sob o mouse 
  const [iconeHover, setIconeHover] = useState(null);

  // Muda a tela ativa da biblioteca 
  const [telaMissoesAtiva, setTelaMissoesAtiva] = useState('Introducao');

  // Muda a tela ativa da biblioteca 
  const [telaBibliotecaAtiva, setTelaBibliotecaAtiva] = useState('Introducao');

  // --- Funções de Controle ---

  /* Abre a janela e garante que não esteja minimizada. */
  const abrirJanela = (chaveJanela) => {
    setEstadoJanelas(prev => ({
      ...prev,
      [chaveJanela]: { estaAberta: true, estaMinimizada: false },
    }));
  };

  /* Fecha a janela. */
  const fecharJanela = (chaveJanela) => {
    setEstadoJanelas(prev => ({
      ...prev,
      [chaveJanela]: { estaAberta: false, estaMinimizada: false },
    }));
  };

  /* Alterna entre minimizado e restaurado. */
  const alternarMinimizar = (chaveJanela) => {
    setEstadoJanelas(prev => ({
      ...prev,
      [chaveJanela]: {
        ...prev[chaveJanela],
        estaMinimizada: !prev[chaveJanela].estaMinimizada,
      },
    }));
  };

  /* Define a chave do ícone que está sob o mouse */
  const sobMouse = (chave) => {
    setIconeHover(chave);
  };

  /* Limpa o estado de hover. */
  const sairMouse = () => {
    setIconeHover(null);
  };

  /* Calcula as chaves das janelas que estão abertas para renderização e barra de tarefas (TaskBar). */
  const chavesJanelasAbertas = useMemo(() => {
    return Object.keys(estadoJanelas).filter(chave => estadoJanelas[chave].estaAberta);
  }, [estadoJanelas]);

  // Função para obter as coordenadas do botão de destino
  const obterPosicaoBotao = (chave) => {
    const ref = taskBarRefs[chave].current;
    if (ref) {
      const rect = ref.getBoundingClientRect();
      // Retorna a posição do centro do botão
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    return null;
  };

  // --- Renderização de Janelas  ---

  const renderizarJanelas = () => {
    return chavesJanelasAbertas.map(chave => {
      const config = JANELAS[chave];
      const estado = estadoJanelas[chave];

      let posicaoDestino = null;
      if (estado.estaMinimizada) {
         
      }

      // Conteúdo específico da janela
      let conteudoJanela;
      if (chave === 'missoes') {
        conteudoJanela = (
          <>
            <ConteudoMissoes
              telaAtiva={telaMissoesAtiva}
              setTelaAtiva={setTelaMissoesAtiva}
            ></ConteudoMissoes>
          </>
        );
      } else if (chave === 'biblioteca') {
        conteudoJanela = (
          <ConteudoBiblioteca
            telaAtiva={telaBibliotecaAtiva}
            setTelaAtiva={setTelaBibliotecaAtiva}
          ></ConteudoBiblioteca>
        );
      }

      return (
        <MiniJanela
          key={chave}
          titulo={config.titulo}
          aoFechar={() => fecharJanela(chave)}
          aoAlternarMinimizar={() => alternarMinimizar(chave)}
          estaMinimizada={estado.estaMinimizada}
          posicaoInicial={config.posicaoInicial}

          // Adiciona a classe de minimização CSS quando a janela está minimizada
          classNameJanela={estado.estaMinimizada ? styles.miniJanelaMinimized : ''}

          // Passa a função para o componente calcular o destino no momento certo
          obterPosicaoDestino={() => obterPosicaoBotao(chave)}
        >
          {conteudoJanela}
        </MiniJanela>
      );
    });
  };

  // --- Renderização de Ícones  ---

  const renderizarIcones = () => {
    return Object.keys(JANELAS).map(chave => {
      const config = JANELAS[chave];
      const estaAberta = estadoJanelas[chave].estaAberta;

      const imagemAtual = (estaAberta || iconeHover === chave)
        ? config.iconeSrcAberto
        : config.iconeSrcFechado;

      return (
        <div
          key={chave}
          className={styles[`app${chave.charAt(0).toUpperCase() + chave.slice(1)}`]} // Ex: styles.appMissoes
          onClick={() => abrirJanela(chave)}

          onMouseEnter={() => sobMouse(chave)} 
          onMouseLeave={sairMouse}

          role="button"
          tabIndex={0}
          aria-label={`Abrir ${config.titulo}`}
        >
          <img src={imagemAtual} alt={config.titulo} />
        </div>
      );
    });
  };

  return (
    <div className={styles.areaDeTrabalho}>

      {/* ================================================================= */}
      {/* RENDERIZAÇÃO DAS JANELAS MÓVEIS */}
      {/* ================================================================= */}

      {renderizarJanelas()}

      {/* ================================================================= */}
      {/* ELEMENTO DE FUNDO (WALLPAPER) */}
      {/* ================================================================= */}

      <img
        src={wallpaperImg}
        alt="Fundo do Sistema Operacional"
        className={styles.fundoWallpaper}
      />

      {/* ================================================================= */}
      {/* ÍCONES NA DIREITA SUPERIOR */}
      {/* ================================================================= */}

      <div className={styles.app}>
        {renderizarIcones()}
      </div>

      {/* ================================================================= */}
      {/* BARRA INFERIOR (FOOTER BAR) */}
      {/* ================================================================= */}

      <div className={styles.footerBar}>
        <div className={styles.logoutmenu}>
          <Link to="/" className={styles.logout}>
            <img src={logoutImg} alt="Icone Logout"></img>
            Logout
          </Link>
        </div>

        <div className={styles.taskBar}>
          {chavesJanelasAbertas.map((chave) => (
            <div
              key={chave}
              ref={taskBarRefs[chave]} 
              onClick={() => alternarMinimizar(chave)}
              className={`${styles.taskBarItem} ${estadoJanelas[chave].estaMinimizada ? styles.minimized : ''}`}
              role="button"
            >
              {JANELAS[chave].titulo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreaDeTrabalho;
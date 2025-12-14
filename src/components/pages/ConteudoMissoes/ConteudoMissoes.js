/* 
  ================================================================
  CONTEUDO DAS MISSÕES
  ================================================================
*/

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/ConteudoMissoes.module.css';

import espelhoImg from '../../../assets/Espelho.png';
import retornoImg from '../../../assets/Return.png';
import A1Z26Img from '../../../assets/A1Z26.png';
import IBM3Img from '../../../assets/3IBM.png';
import SamuelImg from '../../../assets/Samuel-Morse.jpg'
import luaImg from '../../../assets/Lua.png';
import pilastraImg from '../../../assets/Pilastra.png';
import chaveImg from '../../../assets/Chave.png';
import Img303 from '../../../assets/303.jpg';

// Senhas definidas para as missões 
const MISSAO_SENHAS = {
    'missao1': 'GIRL', 
    'missao2': 'N', 
    'missao3': 'COMPUTADOR', 
    'missao4': 'SAMUEL', 
    'missao5': 'DCI', 
    'missao6': 'MICROCOMPUTADORIZAÇÃO', 
    'missao7': 'BYTE', 
    'missao8': 'REACT',     
};

const ConteudoMissoes = ({ telaAtiva, setTelaAtiva }) => {
    // ESTADOS
    const [senhaInput, setSenhaInput] = useState('');
    const [feedback, setFeedback] = useState('');

    const [missoesConcluidas, setMissoesConcluidas] = useState({
        missao1: false,
        missao2: false,
        missao3: false,
        missao4: false,
        missao5: false,
        missao6: false,
        missao7: false,
        missao8: false, 
    });

    // HOOKS
    useEffect(() => {
        setSenhaInput('');
        setFeedback('');
    }, [telaAtiva]);


    // FUNÇÕES DE CONTROLE
    const handleSenhaChange = (event) => {
        setSenhaInput(event.target.value.toUpperCase());
        setFeedback(''); 
    };

    const handleTentativaSenha = (missaoId) => {
        // Se a missão já foi concluída, evita processamento.
        if (missoesConcluidas[missaoId]) {
            setFeedback('Missão já concluída.');
            return;
        }
        
        if (senhaInput === MISSAO_SENHAS[missaoId]) {
            setFeedback('ACESSO CONCEDIDO');

            const novasConclusoes = { ...missoesConcluidas, [missaoId]: true };
            setMissoesConcluidas(novasConclusoes);
            
            // Se for a missao8, navega para a tela final após a conclusão.
            if (missaoId === 'missao8') {
                setTimeout(() => {
                    setTelaAtiva('Final');
                }, 1000);
            }
            
        } else {
            setFeedback('ACESSO NEGADO');
        }
    };

    // Função auxiliar para navegação
    const handleMissionClick = (missaoId) => {
        const missaoKey = missaoId.toLowerCase();
        const isConcluida = missoesConcluidas[missaoKey];

        // Só permite a navegação se a missão não estiver concluída
        if (!isConcluida) {
            setTelaAtiva(missaoId);
        } else {
            setFeedback(`A Operação ${missaoId.slice(-1)} já foi finalizada.`);
            setTimeout(() => setFeedback(''), 1000); // Limpa o feedback após um tempo
        }
    };
    
    // Função para verificar se as missões iniciais estão concluídas
    const todasMissoesCompletas = missoesConcluidas.missao1 && missoesConcluidas.missao2 && missoesConcluidas.missao3 && missoesConcluidas.missao4 && missoesConcluidas.missao5 && missoesConcluidas.missao6 && missoesConcluidas.missao7;

    // Função para renderizar um item de missão
    const exemploMissao = (id, nome, tela) => {
        const completada = missoesConcluidas[`missao${id}`];
        const clicavel = !completada;
        
        // Estilo condicional
        const itemClass = completada 
            ? `${styles.missionItem} ${styles.completed}` 
            : `${styles.missionItem} ${clicavel ? styles.active : ''}`;

        return (
            <li 
                key={id} 
                className={itemClass}
                onClick={clicavel ? () => handleMissionClick(tela) : undefined}
            >
                [{id}00] {nome}
                {completada && <span className={styles.completedTag}> ✅ </span>}
            </li>
        );
    };

    // Função para renderizar o item da Missão 4 (Desbloqueável)
    const exemploMissaoFinal = () => {
        const completada = missoesConcluidas.missao8;
        const clicavel = todasMissoesCompletas && !completada;
        
        // Estilo condicional
        const itemClass = clicavel 
            ? `${styles.missionItem} ${styles.active} ${styles.mission4}` 
            : `${styles.missionItem} ${styles.locked}`;
            
        const text = todasMissoesCompletas 
            ? (completada ? '[800] Acesso ao Núcleo ✅' : '[800] Acesso ao Núcleo')
            : '[800] ??? ';

        return (
            <li 
                key="9" 
                className={itemClass}
                onClick={clicavel ? () => setTelaAtiva('missao8') : undefined}
            >
                {text}
            </li>
        );
    };


    const telas = {
        'Introducao': (
                    <>
                        <h3 className={styles.cabecario}>Códigos e Cifras Históricas</h3>
                        <p className={styles.texto}>Nesta seção, você encontrará todas as informações necessárias para iniciar suas primeiras missões, desde os objetivos mais simples até os mais desafiadores.</p>                        
                        <button className={styles.button} onClick={() => setTelaAtiva('Menu')}>Começar</button>
                    </>
        ),
        'Menu': (
            <>
                <p>Selecione sua próxima Operação:</p>

                {/* Feedback para o caso de tentar entrar em missão concluída */}
                {feedback && <p className={styles.feedbackText}>{feedback}</p>} 
                <ul className={styles.listMissoes}>
                    {exemploMissao(1, 'Rastreamento Neural', 'Missao1')}
                    {exemploMissao(2, 'Servidores Centrais', 'Missao2')}
                    {exemploMissao(3, 'Câmeras de Vigilância', 'Missao3')}
                    {exemploMissao(4, 'Varredura Digital', 'Missao4')}
                    {exemploMissao(5, 'Escudos de Firewall', 'Missao5')}
                    {exemploMissao(6, 'Sensores Fantasma', 'Missao6')}
                    {exemploMissao(7, 'Malha de Drones', 'Missao7')}

                    {/* Item da Missão Final */}
                    {exemploMissaoFinal()}
                </ul>
            </>
        ),
        'Missao1': (
            // Layout da Missão 1 (Rastreamento Neural - GIRL)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[102] </h2>
                </div>
                
                <div className={styles.missao1Container}>
                    <img src={espelhoImg} alt="Espelho" className={styles.img} />
                </div>

                <div className={styles.desafioText}>
                    <p>
                        TRIO
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="INSERIR CÓDIGO"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao1} // Desabilita input após conclusão
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao1')}
                        disabled={missoesConcluidas.missao1} // Desabilita botão após conclusão
                    >
                        TENTAR ACESSO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'Missao2': (
            // Layout da Missão 2 (Servidores Centrais - N)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[203]</h2>
                </div>

                <div className={styles.missao1Container}>
                    <img src={A1Z26Img} alt="A1Z26" className={styles.img} />
                </div>
                
                <div className={styles.desafioText}>
                    <p>
                        14
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="INSERIR CÓDIGO"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao2}
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao2')}
                        disabled={missoesConcluidas.missao2}
                    >
                        TENTAR ACESSO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'Missao3': (
            // Layout da Missão 3 (Câmeras de Vigilância - COMPUTADOR)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[305]</h2>
                </div>

                <div className={styles.missao1Container}>
                    <img src={IBM3Img} alt="3IBM" className={styles.img} />
                </div>
                
                <div className={styles.desafioText}>
                    <p>
                        FRPSXWDGRU
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="INSERIR CÓDIGO"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao3}
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao3')}
                        disabled={missoesConcluidas.missao3}
                    >
                        TENTAR ACESSO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'Missao4': (
            // Layout da Missão 4 (Varredura Digital - SAMUEL)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[407]</h2>
                </div>
                
                <div className={styles.missao1Container}>
                    <img src={SamuelImg} alt="Morse" className={styles.img} />
                </div>

                <div className={styles.desafioText}>
                    <p>
                        −· −−− −− ·
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="CÓDIGO FINAL"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao4}
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao4')}
                        disabled={missoesConcluidas.missao4}
                    >
                        ACESSAR NÚCLEO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'Missao5': (
            // Layout da Missão 5 (Escudos de Firewall - DCI)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[SII]</h2>
                </div>

                <div className={styles.missao1Container}>
                    <img src={luaImg} alt="Lua" className={styles.img} />
                </div>
                
                <div className={styles.desafioText}>
                    <p>
                        “la chiffre indéchiffrable”
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="INSERIR CÓDIGO"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao5}
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao5')}
                        disabled={missoesConcluidas.missao5}
                    >
                        TENTAR ACESSO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'Missao6': (
            // Layout da Missão 6 (Sensores Fantasma - MICROCOMPUTADORIZAÇÃO)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[6??]</h2>
                </div>

                <div className={styles.missao1Container}>
                    <img src={pilastraImg} alt="Coluna" className={styles.img} />
                </div>
                
                <div className={styles.desafioText}>
                    <p>
                        moircirzoacçoãmoputad
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="INSERIR CÓDIGO"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao6}
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao6')}
                        disabled={missoesConcluidas.missao6}
                    >
                        TENTAR ACESSO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'Missao7': (
            // Layout da Missão 7 (Malha de Drones - BYTE)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[717]</h2>
                </div>

                <div className={styles.missao1Container}>
                    <img src={chaveImg} alt="chave" className={styles.img} />
                </div>
                
                <div className={styles.desafioText}>
                    <p>
                        N + OZRX
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="INSERIR CÓDIGO"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao7}
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao7')}
                        disabled={missoesConcluidas.missao7}
                    >
                        TENTAR ACESSO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'missao8': (
            // Layout da Missão 8 (Acesso ao Núcleo - REACT)

            <div className={styles.missaoContainer}>
                <div className={styles.headingContainer}>
                    <img src={retornoImg} alt="Retorno" className={styles.img} onClick={() => setTelaAtiva('Menu')}/>
                    <h2 className={styles.heading}>[821]</h2>
                </div>
                
                <div className={styles.missao1Container}>
                    <img src={Img303} alt="303" className={styles.img} />
                </div>

                <div className={styles.desafioText}>
                    <p>
                        ·· ···– ·–· – –·–
                    </p>
                </div>
                
                <div className={styles.senhaBlock}>
                    <input
                        type="text"
                        placeholder="CÓDIGO FINAL"
                        className={styles.senhaInput}
                        value={senhaInput}
                        onChange={handleSenhaChange}
                        maxLength={30}
                        disabled={missoesConcluidas.missao8}
                    />
                    <button
                        className={styles.senhaButton}
                        onClick={() => handleTentativaSenha('missao8')}
                        disabled={missoesConcluidas.missao8}
                    >
                        ACESSAR NÚCLEO
                    </button>
                    <p className={styles.feedbackText}>{feedback}</p>
                </div>

            </div>
        ),
        'Final': (
             <div className={styles.telaFinal}>
                <h2>PARABÉNS!</h2>
                <p>Você concluiu todas as missões e acessou o Núcleo Central. Missão completa!</p>
                {/* Você pode adicionar um link para o início ou outra parte da aplicação aqui */}
                <Link to="/final" className={styles.button} >Fim do Jogo</Link>
            </div>
        )
    };

    // RENDERIZAÇÃO
    const conteudoTela = telas[telaAtiva];

    if (conteudoTela) {
        return (
            <div className={styles.container}>
                {conteudoTela}
            </div>
        );
    }

    return <p className={styles.error}>Erro: Tela "{telaAtiva}" não encontrada.</p>;
};

export default ConteudoMissoes;
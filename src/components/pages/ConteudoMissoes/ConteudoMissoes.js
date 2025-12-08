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

// Senhas definidas para as missões
const MISSAO_SENHAS = {
    'missao1': 'GIRL', 
    'missao2': 'N', 
    'missao3': 'COMPUTADOR', 
    'missao4': 'SAMUEL', 
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
            
            // Verifica se TODAS as missões (1, 2 e 3) foram concluídas
            const missoesIniciaisConcluidas = novasConclusoes.missao1 && novasConclusoes.missao2 && novasConclusoes.missao3;

            // Se for a Missao4, navega para a tela final após a conclusão.
            if (missaoId === 'missao4') {
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
    const allInitialMissoesCompleted = missoesConcluidas.missao1 && missoesConcluidas.missao2 && missoesConcluidas.missao3;

    // Função para renderizar um item de missão
    const renderMissionItem = (id, nome, tela) => {
        const isCompleted = missoesConcluidas[`missao${id}`];
        const isClickable = !isCompleted;
        
        // Estilo condicional
        const itemClass = isCompleted 
            ? `${styles.missionItem} ${styles.completed}` 
            : `${styles.missionItem} ${isClickable ? styles.active : ''}`;

        return (
            <li 
                key={id} 
                className={itemClass}
                onClick={isClickable ? () => handleMissionClick(tela) : undefined}
            >
                [{id}00] {nome}
                {isCompleted && <span className={styles.completedTag}> ✅ </span>}
            </li>
        );
    };

    // Função para renderizar o item da Missão 4 (Desbloqueável)
    const renderMission4Item = () => {
        const isCompleted = missoesConcluidas.missao4;
        const isClickable = allInitialMissoesCompleted && !isCompleted;
        
        // Estilo condicional
        const itemClass = isClickable 
            ? `${styles.missionItem} ${styles.active} ${styles.mission4}` 
            : `${styles.missionItem} ${styles.locked}`;
            
        const text = allInitialMissoesCompleted 
            ? (isCompleted ? '[400] Acesso ao Núcleo ✅' : '[400] Acesso ao Núcleo')
            : '[400] ??? ';

        return (
            <li 
                key="4" 
                className={itemClass}
                onClick={isClickable ? () => setTelaAtiva('Missao4') : undefined}
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
                    {renderMissionItem(1, 'Rastreamento Neural', 'Missao1')}
                    {renderMissionItem(2, 'Servidores Centrais', 'Missao2')}
                    {renderMissionItem(3, 'Câmeras de Vigilância', 'Missao3')}

                    {/* Item da Missão 4 (Desbloqueada) */}
                    {renderMission4Item()}
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
                        maxLength={20}
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
                        maxLength={20}
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
                        maxLength={20}
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
            // Layout da Missão 4 (Acesso ao Núcleo - SAMUEL)

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
                        maxLength={20}
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
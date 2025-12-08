/* 
  =================================================================
  Mini Janela
  ================================================================
*/

import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from '../../../styles/AreaTrabalho.module.css'; 

const JanelaArrastavel = ({ 
    titulo, 
    aoFechar, 
    children, 
    posicaoInicial = { x: 50, y: 50 }, 
    estaMinimizada,
    aoAlternarMinimizar,
    obterPosicaoDestino 
}) => {
    
    const refJanela = useRef(null); 
    const [posicao, setPosicao] = useState(posicaoInicial);
    const [estaArrastando, setEstaArrastando] = useState(false);
    
    // Estado para armazenar a transformação dinâmica (minimizar/restaurar)
    const [transformMinimizar, setTransformMinimizar] = useState(null); 
    
    // Refs para o arrasto de alta performance
    const deslocamentoArrasto = useRef({ x: 0, y: 0 }); 
    const posicaoAtual = useRef(posicaoInicial); 


    // --- Lógica de Arrasto ---

    // Inicia o arrasto
    const lidarComPressionarMouse = (e) => {
        if (e.button !== 0 || estaMinimizada) return; 
        
        setEstaArrastando(true);
        
        deslocamentoArrasto.current = {
            x: e.clientX - posicaoAtual.current.x,
            y: e.clientY - posicaoAtual.current.y,
        };
        
        document.body.style.cursor = 'grabbing';
        e.preventDefault();
    };

    // Move o elemento (DOM Direto)
    const lidarComMoverMouse = useCallback((e) => {
        if (!estaArrastando || !refJanela.current) return;

        const novaX = e.clientX - deslocamentoArrasto.current.x;
        const novaY = e.clientY - deslocamentoArrasto.current.y;
        
        refJanela.current.style.transform = `translate(${novaX}px, ${novaY}px)`;
        
        posicaoAtual.current = { x: novaX, y: novaY };

    }, [estaArrastando]);

    // Finaliza o arrasto
    const lidarComSoltarMouse = useCallback(() => {
        if (!estaArrastando) return;
        
        setEstaArrastando(false);
        setPosicao(posicaoAtual.current); // SINCRONIZAÇÃO CRUCIAL
        document.body.style.cursor = 'auto'; 
    }, [estaArrastando]);

    // Anexa e remove os event listeners globais
    useEffect(() => {
        if (estaArrastando) {
            document.addEventListener('mousemove', lidarComMoverMouse);
            document.addEventListener('mouseup', lidarComSoltarMouse);
        }
        
        return () => {
            document.removeEventListener('mousemove', lidarComMoverMouse);
            document.removeEventListener('mouseup', lidarComSoltarMouse);
        };
    }, [estaArrastando, lidarComMoverMouse, lidarComSoltarMouse]);
    
    
    // --- Lógica de Minimização Dinâmica ---

    useEffect(() => {
        if (estaMinimizada) {
            const destino = obterPosicaoDestino();
            const elementoAtual = refJanela.current;

            if (destino && elementoAtual) {
                const rect = elementoAtual.getBoundingClientRect();
                const centroX = rect.left + rect.width / 2;
                const centroY = rect.top + rect.height / 2;

                const deltaX = destino.x - centroX;
                const deltaY = destino.y - centroY;
                
                // Define a transformação para voar para o botão
                setTransformMinimizar(`translate(${deltaX}px, ${deltaY}px) scale(0.1)`);
            }
        } else {
            // Ao restaurar, limpa o transformMinimizar.
            setTransformMinimizar(null);
            
            // Ao restaurar, a transformação final da janela DEVE ser resetada 
            // para a última posição sincronizada (posicao).
            // Isso evita que a janela restaure na posição (0, 0) antes de voar de volta.
            if (refJanela.current) {
                refJanela.current.style.transform = `translate(${posicao.x}px, ${posicao.y}px)`;
            }
        }
    }, [estaMinimizada, obterPosicaoDestino, posicao]); 
    
    
    // === Renderização ===
    
    // Determina a transformação CSS a ser aplicada
    const transformStyle = transformMinimizar
        ? transformMinimizar // Usa o transform calculado (voo para o botão)
        : `translate(${posicao.x}px, ${posicao.y}px)`; // Usa a posição normal
        
    // Aplica as classes CSS
    const classesJanela = `${styles.miniJanela} ${estaMinimizada ? styles.miniJanelaMinimized : ''}`;


    return (
        <div 
            ref={refJanela}
            className={classesJanela} 
            // Estilos inline aplicados diretamente
            style={{
                transform: transformStyle,
                position: 'absolute', 
                transition: 'transform 0.6s ease-out', 
                cursor: estaArrastando ? 'grabbing' : 'grab',
            }}
        >
            <div 
                className={styles.miniJanelaHeader} 
                onMouseDown={lidarComPressionarMouse} 
                style={{ cursor: estaArrastando ? 'grabbing' : 'grab' }}
            >
                <p>{titulo}</p>
                
                {/* CONTROLES DA JANELA: MINIMIZAR e FECHAR */}
                <div className={styles.miniJanelaControls}> 
                    <button onClick={aoAlternarMinimizar} className={styles.miniJanelaMinimizada} tabIndex={0} aria-label={`Minimizar ${titulo}`}>
                        _
                    </button>

                    <button onClick={aoFechar} className={styles.miniJanelaFechada} tabIndex={0} aria-label={`Fechar ${titulo}`}>
                        x
                    </button>
                </div>
            </div>
            
            {/* CONTEÚDO SÓ APARECE SE NÃO ESTIVER MINIMIZADO */}
            
            {!estaMinimizada && ( 
                <div className={styles.miniJanelaContent}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default JanelaArrastavel;
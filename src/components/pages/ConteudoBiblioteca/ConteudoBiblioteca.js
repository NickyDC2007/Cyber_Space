/* 
  ================================================================
  CONTEUDO BIBLIOTECA 
  ================================================================
*/

import React from 'react';
import styles from '../../../styles/ConteudoBiblioteca.module.css';

// --- GLITCHTEXT ---
const GlitchText = ({ children }) => (
    // Passa o texto como data-attribute para o CSS usar nos pseudo-elementos
    <span className={styles.glitch} data-text={children}>{children}</span>
);

// --- NOVA FUNÇÃO UTILITÁRIA PARA RENDERIZAR TEXTO COM GLITCH ---
const renderTextWithGlitch = (text) => {
    if (!text || typeof text !== 'string') return text;

    // Regex para encontrar **palavras**
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // Remove os ** e renderiza com o componente GlitchText
            const content = part.slice(2, -2);
            return <GlitchText key={index}>{content}</GlitchText>;
        }
        return part;
    });
};
// -----------------------------------------------------------------


const morseData = [
    { char: 'A', code: '·−' },
    { char: 'B', code: '−···' },
    { char: 'C', code: '−·−·' },
    { char: 'D', code: '−··' },
    { char: 'E', code: '·' },
    { char: 'F', code: '··−·' },
    { char: 'G', code: '−−·' },
    { char: 'H', code: '····' },
    { char: 'I', code: '··' },
    { char: 'J', code: '·−−−' },
    { char: 'K', code: '−·−' },
    { char: 'L', code: '·−··' },
    { char: 'M', code: '−−' },
    { char: 'N', code: '−·' },
    { char: 'O', code: '−−−' },
    { char: 'P', code: '·−−·' },
    { char: 'Q', code: '−−·−' },
    { char: 'R', code: '·−·' },
    { char: 'S', code: '···' },
    { char: 'T', code: '−' },
    { char: 'U', code: '··−' },
    { char: 'V', code: '···−' },
    { char: 'W', code: '·−−' },
    { char: 'X', code: '−··−' },
    { char: 'Y', code: '−·−−' },
    { char: 'Z', code: '−−··' },
];

const ConteudoBiblioteca = ({ telaAtiva, setTelaAtiva }) => {

    // Componente auxiliar para a Tabela Morse
    const MorseTable = () => (
        <div className={styles.morseTabela}>
            {morseData.map(item => (
                <div key={item.char} className={styles.morseItem}>
                    <strong>{item.char}</strong> {item.code}
                </div>
            ))}
        </div>
    );

    // Componente auxiliar para o bloco de Exemplo
    const BlocoExemplo = ({ titulo, linhas, resultado, preContent }) => (
        <div className={styles.exemplo}>
            <p className={styles.exTitulo}>
                {titulo}
            </p>
            {linhas.map((linha, index) => (
                <p key={index} className={styles.exLinha}>
                    <b>{linha.label}:</b> {
                        linha.label === 'Curva' 
                            ? <span>$y^2 = x^3 + x + 6 mod{11}$</span>
                            : linha.value
                    }
                </p>
            ))}
            {preContent && (
                <pre className={styles.preResultado}>
                    {preContent}
                </pre>
            )}
            <p className={styles.exLinha}>
                <b>Resultado:</b>
                <span className={styles.exResultado}>
                    {resultado}
                </span>
            </p>
        </div>
    );
    
    // Mapeamento de conteúdo para cada tela
    const telas = {
        'Introducao': (
            <>
                <h3 className={styles.cabecario}>Introdução à Criptografia</h3>
                <p>{renderTextWithGlitch("Nesta seção, você encontrará informações essenciais sobre os principais métodos de criptografia e códigos da história, desde os mais **antigos** até os mais **modernos**.")}</p>
                <button className={styles.button} onClick={() => setTelaAtiva('Morse')}>Começar</button>
            </>
        ),
        'Morse': (
            <>
                <h2 className={styles.cabecario}>Código Morse</h2>
                <p>{renderTextWithGlitch("O **Código Morse** é um sistema de comunicação criado em **1837** por Samuel Morse. Ele representa letras, números e símbolos por meio de sinais curtos e longos: **pontos (·)** e **traços (−)**. Inicialmente usado em telégrafos, ele também funciona com luzes, rádio e sons.")}</p>

                <h2 className={styles.cabecario}>Tabela do Código Morse</h2>
                <MorseTable />
                
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('ECC')}>Anterior: ECC</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Cesar')}>Próxima: Cifra de César</button>
            </>
        ),
        'Cesar': (
            <>
                <h2 className={styles.cabecario}>Cifra de César</h2>
                <p>{renderTextWithGlitch("A **Cifra de César** é um método de **substituição** onde cada letra é deslocada um número fixo de posições. Foi usada pelo imperador romano Júlio César para se comunicar com seus generais.")}</p>
                <p>{renderTextWithGlitch("A força dela é justamente a simplicidade: fácil de usar e de entender. A fraqueza também nasce disso. Testando todos os 25 deslocamentos possíveis, qualquer pessoa consegue recuperar a mensagem. Hoje ela é mais uma peça histórica divertida do que um **método seguro**, mas serve bem para aprender como funciona a ideia de uma **chave** e de **substituição** em criptografia.")}</p>

                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'SISTEMA CORROMPIDO' },
                        { label: 'Deslocamento', value: '12' },
                    ]}
                    resultado="EUEFQYM OADDAYBUPA"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Morse')}>Anterior: Código Morse</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Atbash')}>Próxima: Cifra de Atbash</button>
            </>
        ),
        'Atbash': (
            <>
                <h2 className={styles.cabecario}>Cifra de Atbash </h2>
                <p>{renderTextWithGlitch("A **Cifra de Atbash** é um método de **substituição** de origem hebraica antiga. Ela funciona **“espelhando” o alfabeto**: a primeira letra (A) é trocada pela última (Z), a segunda (B) pela penúltima (Y), e assim sucessivamente.")}</p>
                <p>{renderTextWithGlitch("Sua força é ser ainda mais simples que a de César, já que não existe **chave**; a regra é fixa. Essa é também sua fraqueza fatal. Como só existe uma única substituição possível (A=Z, B=Y...), se alguém suspeitar do método, a mensagem é decifrada instantaneamente. Ela é uma **cifra recíproca**: o mesmo processo usado para cifrar é usado para decifrar.")}</p>

                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'SEGREDO' },
                    ]}
                    resultado="HVTIVWL"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Cesar')}>Anterior: Cifra de César</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Vigenere')}>Próxima: Cifra de Vigenère</button>
            </>
        ),
        'Vigenere': (
            <>
                <h2 className={styles.cabecario}>Cifra de Vigenère</h2>
                <p>{renderTextWithGlitch("Durante séculos, a **Cifra de Vigenère** foi apelidada de **“la chiffre indéchiffrable”** (a cifra indecifrável). Ela é uma evolução da Cifra de César, mas usa **múltiplos alfabetos de deslocamento** em vez de apenas um, sendo classificada como **polialfabética**.")}</p>
                <p>{renderTextWithGlitch("Ela funciona usando uma **palavra-chave** (ex: “ROMA”). A chave é repetida sobre a mensagem, e cada letra da chave determina um deslocamento diferente (A=0, B=1... R=17, O=14, M=12, A=0). Sua grande força é que letras iguais no texto original (ex: “ATAQUE”) viram letras diferentes no texto cifrado, frustrando a **análise de frequência** simples que quebra a Cifra de César.")}</p>
                
                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'GATO' },
                        { label: 'Chave', value: 'NEVE' },
                    ]}
                    resultado="TEOS"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Atbash')}>Anterior: Cifra de Atbash</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Transposicao')}>Próxima: Cifra de Transposição</button>
            </>
        ),
        'Transposicao': (
            <>
                <h2 className={styles.cabecario}>Cifra de Transposição</h2>
                <p>{renderTextWithGlitch("A **Cifra de Transposição** não troca letras por outras; ela muda apenas sua **ordem**. É como pegar uma frase e embaralhar a disposição dos caracteres seguindo uma regra específica. Varia muito conforme o método usado, mas a ideia central é sempre a mesma: o **conteúdo** continua igual, mas sua **ordem** não.")}</p>
                <p>{renderTextWithGlitch("Esse tipo de cifra apareceu em vários exércitos **antigos**, porque pode ser rápida de fazer com papel e caneta. A **segurança** depende da complexidade do padrão escolhido para a troca de posições.")}</p>

                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'ATAQUE' },
                        { label: 'Método', value: 'Ler as letras de 2 em 2, alternando a ordem' },
                    ]}
                    resultado="TAQAEU"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Vigenere')}>Anterior: Cifra de Vigenère</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Coluna')}>Próxima: Código da Coluna</button>
            </>
        ),
        'Coluna': (
            <>
                <h2 className={styles.cabecario}>Código da Coluna</h2>
                <p>{renderTextWithGlitch("O **Código da Coluna** é um tipo de **transposição** onde o texto é escrito em uma **grade** com um número definido de colunas. Depois, a leitura é feita seguindo a ordem das colunas, criando um embaralhamento previsível. É **simples**, **versátil** e permite vários formatos diferentes.")}</p>
                <p>{renderTextWithGlitch("A **chave** normalmente é o número de colunas ou a ordem em que cada coluna deve ser lida. Mudou a ordem das colunas, mudou o resultado.")}</p>
                
                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'ATAQUEAOAMANHECER' },
                        { label: 'Colunas', value: '4' },
                        { label: 'Grade formada', value: '' }, 
                    ]}
                    preContent={`A T A Q
U E A O
A M A N
H E C E
R _ _ _`}
                    resultado="AUAHRTEMEAAACQONE"
                />
                
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Transposicao')}>Anterior: Cifra de Transposição</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Playfair')}>Próxima: Cifra de Playfair</button>
            </>
        ),
        'Playfair': (
            <>
                <h2 className={styles.cabecario}>Cifra de Playfair</h2>
                <p>{renderTextWithGlitch("A **Cifra de Playfair** foi criada no século XIX e ficou famosa por ser usada em operações militares. Ela não cifra letras isoladas, e sim **pares de letras**. Para isso, usa uma **matriz 5x5** feita a partir de uma **palavra-chave**, removendo letras repetidas e juntando I e J em uma única posição.")}</p>
                <p>{renderTextWithGlitch("Seu ponto **forte** é quebrar padrões simples, pois cada par de letras segue regras diferentes dependendo de como aparecem na **matriz**. Isso torna a cifra bem mais resistente do que substituições tradicionais.")}</p>
                

                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'ATAQUE' },
                        { label: 'Chave', value: 'SEGURANÇA' },
                        { label: 'Parização', value: 'AT AQ UE' },
                    ]}
                    resultado="RMBMRG"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Coluna')}>Anterior: Código da Coluna</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Autokey')}>Próxima: Autokey</button>
            </>
        ),
        'Autokey': (
            <>
                <h2 className={styles.cabecario}>Autokey</h2>
                <p>{renderTextWithGlitch("O **Autokey** é uma variação da Cifra de Vigenère que tenta resolver o maior ponto fraco dela: a **repetição da chave**. Aqui, a **palavra-chave inicia** o processo, mas depois o **próprio texto original** é usado para continuar a chave. Isso gera um **padrão bem mais longo** e menos previsível.")}</p>
                <p>{renderTextWithGlitch("Por depender do **próprio texto** para estender a chave, ele dificulta muito métodos de quebra baseados em **repetição** e **análise de frequência**.")}</p>

                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'GATO' },
                        { label: 'Chave inicial', value: 'N' },
                        { label: 'Chave estendida', value: 'N G A T' },
                    ]}
                    resultado="TGTH"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Playfair')}>Anterior: Cifra de Playfair</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Porta')}>Próxima: Cifra de Porta</button>
            </>
        ),
        'Porta': (
            <>
                <h2 className={styles.cabecario}>Cifra de Porta</h2>
                <p>{renderTextWithGlitch("A **Cifra de Porta** é uma cifra de substituição **polialfabética** e **recíproca** (o mesmo processo cifra e decifra). Ela usa uma tabela onde cada letra da chave seleciona um de 13 alfabetos específicos. Dentro desse alfabeto, as letras são trocadas em pares (ex: A é trocado por N, e N é trocado por A).")}</p>
                <p>{renderTextWithGlitch("Ela ficou conhecida por ser **simples**, **resistente** o bastante para uso pessoal e **fácil** de aplicar sem equipamento especial. Cada letra da **chave** determina uma coluna da tabela usada na substituição.")}</p>

                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'MAR' },
                        { label: 'Chave', value: 'SOL' },
                    ]}
                    resultado="ZUC"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Autokey')}>Anterior: Autokey</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Enigma')}>Próxima: Enigma</button>
            </>
        ),
        'Enigma': (
            <>
                <h2 className={styles.cabecario}>Enigma </h2>
                <p>{renderTextWithGlitch("A máquina **Enigma** foi usada pela Alemanha na Segunda Guerra Mundial e ficou famosa por combinar **mecânica** e **eletricidade**. Ela usava **rotores** que giravam a cada letra digitada, criando camadas sucessivas de substituição. Cada toque mudava a **configuração** interna, fazendo com que a mesma letra nunca virasse o mesmo símbolo duas vezes.")}</p>
                <p>{renderTextWithGlitch("O operador escolhia três coisas: a ordem dos **rotores**, a **posição inicial** de cada rotor e as conexões do **plugboard** (um painel que trocava pares de letras antes e depois do processo). Pequenas mudanças nesses ajustes geravam combinações **astronômicas**.")}</p>
                

                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Texto', value: 'SOL' },
                        { label: 'Configuração', value: 'Rotores I-II-III | Posições: A-B-C | Plugboard: S↔T' },
                    ]}
                    resultado="LDU"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Porta')}>Anterior: Cifra de Porta</button>
                <button className={styles.button} onClick={() => setTelaAtiva('ECC')}>Próxima: ECC</button>
            </>
        ),
        'ECC': (
            <>
                <h2 className={styles.cabecario}>ECC - Criptografia de Curvas Elípticas </h2>
                <p>{renderTextWithGlitch("A **ECC** (Elliptic Curve Cryptography) usa propriedades matemáticas de **curvas elípticas** para criar chaves públicas e privadas **extremamente seguras** com tamanhos muito menores do que outras criptografias clássicas. Em vez de trabalhar com fatoração de números gigantes, ela usa **pontos sobre uma curva** e operações de **soma** entre esses pontos.")}</p>
                <p>{renderTextWithGlitch("A grande força da **ECC** vem da dificuldade do **Problema do Logaritmo Elíptico**: dado um ponto inicial e um ponto final na curva, é **praticamente impossível** descobrir quantas “somadas” de ponto foram feitas para chegar lá. Isso permite **segurança alta** mesmo com chaves pequenas.")}</p>
                
                <BlocoExemplo 
                    titulo="Exemplo"
                    linhas={[
                        { label: 'Curva', value: '$y^2 = x^3 + x + 6 mod{11}$' },
                        { label: 'Chave privada', value: '5' },
                        { label: 'Ponto base (G)', value: '(2, 7)' },
                    ]}
                    resultado="(x, y) = 5 * G = (8, 3)"
                />
                <hr className={styles.linha} />
                <button className={styles.button} onClick={() => setTelaAtiva('Enigma')}>Anterior: Enigma</button>
                <button className={styles.button} onClick={() => setTelaAtiva('Morse')}>Próximo: Código Morse</button>
            </>
        ),
    };

    const conteudoTela = telas[telaAtiva];

    if (conteudoTela) {
        return <div className={styles.container}>{conteudoTela}</div>;
    }

    return <p>Erro: Tela não encontrada.</p>;
};

export default ConteudoBiblioteca;
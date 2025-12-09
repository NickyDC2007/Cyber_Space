# 🌌 CYBER SPACE: O Jogo Interativo de Criptografia em React

## 🚀 Visão Geral do Projeto

**Cyber Space** é um jogo interativo desenvolvido em **React** para ensinar conceitos de **criptografia** de forma prática e divertida. O jogador é imerso em um ambiente digital futurista, onde enfrenta desafios baseados em cifras reais e deve resolver enigmas que representam técnicas usadas no mundo da segurança da informação.

O jogo utiliza um design de interface de sistema operacional (Desktop Environment) com janelas e aplicativos arrastáveis para criar uma experiência imersiva de quebra de códigos.

### 📚 Funcionalidades Principais

* **Ambiente de Desktop Imersivo**: Interface simulando um sistema operacional (`AreaDeTrabalho`) com ícones, barra de tarefas e wallpapers.
* **Janelas Arrastáveis e Animadas**: Componente `MiniJanela` que permite arrastar, fechar e minimizar janelas com uma animação de "voo" para a barra de tarefas.
* **Módulos Educacionais**: O componente `ConteudoBiblioteca` oferece material de estudo detalhado sobre cifras históricas (Cifra de César, Vigenère, Enigma) e modernas (ECC).
* **Missões Interativas**: O componente `ConteudoMissoes` apresenta enigmas que exigem a aplicação dos conhecimentos de criptografia para decifrar a senha de acesso.

---

## 💻 Tecnologias Envolvidas

Este projeto foi inicializado com **Create React App** e utiliza:

* **React** (com Hooks como `useState`, `useRef`, `useEffect`, `useMemo` para gerenciamento de estado e interatividade).
* **React Router DOM** (para navegação entre o Menu e a Área de Trabalho).
* **CSS Modules** (para modularização de estilos).
* **Animações CSS**: Implementação de transformações (`translate`, `scale`) para animações de arrasto e minimização de janelas.

---

## 🛠️ Instalação e Execução

Para rodar o projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (ou yarn) instalados.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [LINK DO SEU REPOSITÓRIO]
    cd cyber_space
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Execute o aplicativo:**
    ```bash
    npm start
    # ou
    yarn start
    ```

O aplicativo será aberto automaticamente no seu navegador em [http://localhost:3000](http://localhost:3000). A página recarrega automaticamente quando você faz alterações nos arquivos.

---

## ⚙️ Scripts Disponíveis

Na pasta do projeto, você pode executar os seguintes comandos:

### `npm start`

Inicia o aplicativo em modo de desenvolvimento.
Abre [http://localhost:3000](http://localhost:3000) no seu navegador.

### `npm test`

Inicia o *test runner* em modo de observação interativo.
Para mais informações, veja a documentação do [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Compila o aplicativo para produção na pasta `build`.

### `npm run eject`

> **Aviso: Esta é uma operação irreversível.**

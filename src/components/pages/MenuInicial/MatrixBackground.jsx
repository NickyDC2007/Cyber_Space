/* 
  ================
  MENU INICIAL (Tela de Entrada) - Efeito da Matrix
  ================
*/

import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres Matrix (Katakana + alfanuméricos)
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array para guardar posição "y" de cada coluna
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100); // começar acima da tela
    }

    const draw = () => {
      // Escurecer levemente para deixar rastro
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        // Destacar o primeiro caractere (cabeça da coluna)
        if (Math.random() > 0.975) {
          ctx.fillStyle = '#fff'; // branco brilhante
        } else {
          ctx.fillStyle = '#0f0';
        }
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Resetar se passar do fim da tela
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Descer
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default MatrixBackground;
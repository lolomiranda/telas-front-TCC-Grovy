'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'var(--toggle-bg)',
        border: '1px solid var(--border)',
        padding: '10px',
        borderRadius: '50%', // Deixa redondinho
        cursor: 'pointer',
        width: '45px',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem', // Tamanho do ícone
        transition: 'transform 0.2s',
      }}
      title="Mudar Tema"
    >
      {/* Se o tema for claro, mostra a LUA. Se for escuro, mostra o SOL */}
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
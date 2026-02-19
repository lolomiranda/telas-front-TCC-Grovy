"use client";

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  // Garante que o componente só renderiza no cliente para evitar erros de hidratação
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Recupera o tema guardado ou assume 'dark' como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Previne renderização antes de montar no cliente
  if (!mounted) return null;

  return (
    <button 
      onClick={toggleTheme} 
      style={{
        background: 'var(--toggle-bg)',
        color: 'var(--foreground)',
        border: '1px solid var(--border)',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
      title={theme === 'dark' ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
    >
      {theme === 'dark' ? (
        <>
          {/* Ícone formal de Lua (Modo Escuro) */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span>Escuro</span>
        </>
      ) : (
        <>
          {/* Ícone formal de Sol (Modo Claro) */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span>Claro</span>
        </>
      )}
    </button>
  );
}
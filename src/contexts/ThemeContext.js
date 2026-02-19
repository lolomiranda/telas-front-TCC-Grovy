'use client'; // Importante: indica que isso roda no navegador

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Começa com 'dark' por padrão
  const [theme, setTheme] = useState('dark');

  // Ao carregar a página, verifica se já existe uma preferência salva
  useEffect(() => {
    const savedTheme = localStorage.getItem('grovy-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Salva no navegador e aplica no HTML
    localStorage.setItem('grovy-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Atalho para usar o tema em qualquer lugar
export const useTheme = () => useContext(ThemeContext);
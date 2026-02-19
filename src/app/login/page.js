"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../../components/ThemeToggle'; // Importando o toggle igual na tela de cadastro

export default function Login() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    senha: '' 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('E-mail ou senha incorretos.');
      }

      const data = await response.json();
      // Lógica de sucesso (salvar token, redirecionar)
      console.log('Login realizado:', data);
      router.push('/'); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="center-screen">
      
      {/* Botão de Tema no topo direito, igual ao cadastro */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>

      <h1>Acessar Conta</h1>
      <p style={{ marginBottom: '20px' }}>Bem-vindo de volta!</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          
          {error && (
            <div style={{ color: '#ef4444', marginBottom: '15px', fontWeight: 'bold' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input" 
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="form-input"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="********"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn"
            style={{ 
              width: '100%', 
              marginTop: '20px',
              backgroundColor: 'var(--primary-prof)' // Usando o azul padrão do seu tema
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
            Ainda não tem conta?{' '}
            <a href="/cadastro" style={{ color: 'var(--primary-prof)', fontWeight: 'bold', textDecoration: 'none' }}>
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
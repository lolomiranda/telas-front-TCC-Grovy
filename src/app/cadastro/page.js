'use client';
import ThemeToggle from '../../components/ThemeToggle';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'cliente' // 'cliente' ou 'profissional'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando para /api/register:", formData);
    
    // Simula o sucesso e vai para o Passo 2
    alert("Conta criada com sucesso! Redirecionando...");
    router.push(`/completar-perfil?role=${formData.role}`);
  };

  return (
    <main className="center-screen">
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>
      <h1>Crie sua conta</h1>
      <p style={{ marginBottom: '20px' }}>Passo 1 de 2: Dados de acesso</p>

      <div className="form-container">
        
        {/* --- SELETOR PRINCIPAL (Abas com seu design original) --- */}
        <div className="user-type-selector">
          <button 
            type="button"
            className={`type-btn ${formData.role === 'cliente' ? 'active-aluno' : ''}`}
            onClick={() => setFormData({ ...formData, role: 'cliente' })}
          >
            Sou Cliente
          </button>
          <button 
            type="button"
            className={`type-btn ${formData.role === 'profissional' ? 'active-prof' : ''}`}
            onClick={() => setFormData({ ...formData, role: 'profissional' })}
          >
            Sou Profissional
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Nome Completo</label>
            <input type="text" name="name" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input type="email" name="email" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <input type="password" name="password" className="form-input" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Senha</label>
            <input type="password" name="password_confirmation" className="form-input" onChange={handleChange} required />
          </div>

          <button 
            type="submit" 
            className="btn"
            style={{ 
              width: '100%', 
              margin: '20px 0 0 0',
              backgroundColor: formData.role === 'cliente' ? 'var(--primary-aluno)' : 'var(--primary-prof)'
            }}
          >
            Continuar para o Perfil
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Já possui acesso? <span style={{ color: 'var(--primary-aluno)', fontWeight: 'bold' }}>Fazer Login</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
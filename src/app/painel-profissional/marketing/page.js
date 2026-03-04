'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle'; 

export default function CriarDica() {
  const [dicaData, setDicaData] = useState({
    title: '',
    category: 'Saúde',
    body: ''
  });

  const handleChange = (e) => {
    setDicaData({ ...dicaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando POST /api/contents:", dicaData);
    alert("Conteúdo publicado com sucesso no seu perfil!");
    // Aqui você pode limpar o form ou redirecionar
  };

  return (
    <div style={{ minHeight: '100vh', padding: '30px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px' }}>
        <ThemeToggle />
        <Link href="/painel-profissional">
          <button className="btn" style={{ backgroundColor: 'var(--toggle-bg)', margin: 0, padding: '8px 16px' }}>Voltar</button>
        </Link>
      </div>

      <header style={{ marginTop: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--primary-prof)' }}>Publicar Conteúdo 📢</h1>
        <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Compartilhe conhecimento para atrair mais pacientes.</p>
      </header>

      <div className="form-container" style={{ margin: '0 auto', maxWidth: '100%' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Título da Dica</label>
            <input type="text" name="title" className="form-input" placeholder="Ex: A importância da hidratação" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Categoria</label>
            <select name="category" className="form-select" value={dicaData.category} onChange={handleChange}>
              <option value="Saúde">Saúde e Bem-estar</option>
              <option value="Nutrição">Nutrição</option>
              <option value="Treinamento">Treinamento e Fitness</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Conteúdo (Texto)</label>
            <textarea 
              name="body" 
              className="form-input" 
              rows="6" 
              placeholder="Escreva sua dica aqui..." 
              onChange={handleChange} 
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn" style={{ backgroundColor: 'var(--primary-prof)', width: '100%', marginTop: '10px' }}>
            Publicar Dica
          </button>
        </form>
      </div>
    </div>
  );
}
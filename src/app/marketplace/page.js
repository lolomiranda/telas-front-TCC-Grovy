'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle'; 

export default function Marketplace() {
  const [profissionais, setProfissionais] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    // Simulando o retorno do backend (GET /api/profissionais)
    setProfissionais([
      { id: 1, nome: 'Dr. Carlos Silva', especialidade: 'Nutricionista Esportivo', avaliacao: '⭐ 4.9', preco: 'R$ 150/mês' },
      { id: 2, nome: 'Ana Souza', especialidade: 'Personal Trainer', avaliacao: '⭐ 5.0', preco: 'R$ 200/mês' },
      { id: 3, nome: 'Dra. Fernanda Lima', especialidade: 'Nutricionista Clínica', avaliacao: '⭐ 4.8', preco: 'R$ 120/mês' },
    ]);
  }, []);

  const profissionaisFiltrados = profissionais.filter(prof => 
    prof.nome.toLowerCase().includes(busca.toLowerCase()) || 
    prof.especialidade.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', padding: '30px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px' }}>
        <ThemeToggle />
        <Link href="/painel-aluno">
          <button className="btn" style={{ backgroundColor: 'var(--toggle-bg)', margin: 0, padding: '8px 16px' }}>Voltar ao Painel</button>
        </Link>
      </div>

      <header style={{ marginTop: '20px', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary-aluno)', fontSize: '2.5rem' }}>Encontre seu Profissional</h1>
        <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Busque por nutricionistas e personal trainers parceiros.</p>
      </header>

      {/* Barra de Busca */}
      <div className="form-group" style={{ maxWidth: '600px', marginBottom: '40px' }}>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Buscar por nome ou especialidade..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ padding: '15px', fontSize: '1.1rem', borderRadius: '30px' }}
        />
      </div>

      {/* Grid de Profissionais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
        {profissionaisFiltrados.map(prof => (
          <div key={prof.id} className="form-container" style={{ margin: 0, padding: '25px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{prof.nome}</h3>
                <span style={{ color: 'var(--primary-prof)', fontWeight: 'bold', fontSize: '0.9rem' }}>{prof.especialidade}</span>
              </div>
              <span style={{ backgroundColor: 'var(--toggle-bg)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.9rem' }}>{prof.avaliacao}</span>
            </div>
            
            <p style={{ color: 'var(--foreground)', opacity: 0.8, marginBottom: '20px' }}>Investimento: <strong>{prof.preco}</strong></p>
            
            <Link href={`/marketplace/profissional/${prof.id}`} style={{ marginTop: 'auto' }}>
              <button className="btn" style={{ backgroundColor: 'var(--primary-aluno)', width: '100%', margin: 0 }}>
                Ver Perfil e Contratar
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
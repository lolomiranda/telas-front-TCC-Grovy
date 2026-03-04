'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle'; 

export default function PainelProfissional() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Simulando a chamada GET /api/contracts/requests
    setSolicitacoes([
      { id: 1, nome: 'João Aluno', objetivo: 'Hipertrofia e Definição', data: 'Hoje' },
      { id: 2, nome: 'Mariana Costa', objetivo: 'Emagrecimento', data: 'Ontem' }
    ]);

    // Simulando a chamada GET /api/pacientes
    setAlunos([
      { id: 101, nome: 'Pedro Henrique', foco: 'Ganho de Massa', ultimoAcesso: 'Há 2 dias' },
      { id: 102, nome: 'Ana Souza', foco: 'Qualidade de Vida', ultimoAcesso: 'Hoje' }
    ]);
  }, []);

  const handleAceitarAluno = (id, nome) => {
    // Aqui vai entrar o seu PATCH /api/contracts/{id}/accept
    console.log(`Enviando PATCH para /api/contracts/${id}/accept`);
    alert(`Você aceitou a solicitação de ${nome}! Ele(a) agora é seu paciente.`);
    
    // Atualização visual rápida (tirando da lista de solicitações)
    setSolicitacoes(solicitacoes.filter(s => s.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', padding: '30px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      
      {/* Botões do Topo */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <ThemeToggle />
        <Link href="/">
          <button className="btn" style={{ backgroundColor: '#ef4444', margin: 0, padding: '8px 16px', fontSize: '0.9rem' }}>Sair</button>
        </Link>
      </div>

      <header style={{ marginTop: '20px', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary-prof)', fontSize: '2.5rem' }}>Painel do Profissional 🩺</h1>
        <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Gerencie seus pacientes, planos e solicitações.</p>
      </header>

      {/* Menu Rápido */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
        <Link href="/painel-profissional/marketing" style={{ textDecoration: 'none' }}>
          <button className="btn" style={{ backgroundColor: 'var(--toggle-bg)', color: 'var(--foreground)', margin: 0 }}>
            📢 Publicar Dica (Marketing)
          </button>
        </Link>
      </div>

      {/* --- SEÇÃO 1: SOLICITAÇÕES PENDENTES --- */}
      <h2 style={{ marginBottom: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>
        Novas Solicitações <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '2px 10px', borderRadius: '15px', fontSize: '1rem', verticalAlign: 'middle' }}>{solicitacoes.length}</span>
      </h2>
      
      {solicitacoes.length === 0 ? (
        <p style={{ marginBottom: '40px', opacity: 0.7 }}>Nenhuma nova solicitação no momento.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {solicitacoes.map(solic => (
            <div key={solic.id} className="form-container" style={{ margin: 0, borderLeft: '4px solid #f59e0b' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{solic.nome}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '5px' }}>Objetivo: <strong>{solic.objetivo}</strong></p>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px' }}>Solicitado: {solic.data}</p>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn" 
                  onClick={() => handleAceitarAluno(solic.id, solic.nome)}
                  style={{ backgroundColor: 'var(--primary-prof)', flex: 1, margin: 0, padding: '10px' }}
                >
                  Aceitar Aluno
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- SEÇÃO 2: MEUS ALUNOS --- */}
      <h2 style={{ marginBottom: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>
        Meus Alunos
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {alunos.map(aluno => (
          <div key={aluno.id} className="form-container" style={{ margin: 0, borderLeft: '4px solid var(--primary-prof)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{aluno.nome}</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '5px' }}>Foco Atual: <strong>{aluno.foco}</strong></p>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px' }}>Último acesso: {aluno.ultimoAcesso}</p>
            
            {/* O Link para a tela de Detalhes / Criar Dieta */}
            <Link href={`/painel-profissional/aluno/${aluno.id}`}>
              <button className="btn" style={{ backgroundColor: 'transparent', border: '1px solid var(--primary-prof)', color: 'var(--primary-prof)', width: '100%', margin: 0, padding: '10px' }}>
                Abrir Prontuário
              </button>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}